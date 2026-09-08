import hashlib
from io import BytesIO
from pathlib import Path
from fastapi import Depends, File, HTTPException, Request, UploadFile
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_postgres import PGVector
from langchain_text_splitters import RecursiveCharacterTextSplitter
from lib.auth import get_user_id_from_request
from lib.db import Database, PGVECTOR_DATABASE_URL, get_db
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")





def read_pdf(contents: bytes):
    try:
        from pypdf import PdfReader
        reader = PdfReader(BytesIO(contents))
        total_pages = len(reader.pages)
        documents = []

        for page_index, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            if page_text.strip():
                documents.append(
                    Document(
                        page_content=page_text,
                        metadata={
                            "page": page_index,
                            "total_pages": total_pages,
                        },
                    )
                )

        return documents, total_pages
    except Exception as error:
        raise HTTPException(status_code=400, detail="Could not read PDF") from error





async def upload_pdf(request: Request,pdf: UploadFile = File(...),db: Database = Depends(get_db)):
    user_id = get_user_id_from_request(request)
    user = db.query("SELECT id FROM users WHERE id = %s", (user_id))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    filename = Path(pdf.filename or "").name
    if Path(filename).suffix.lower() != ".pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    contents = await pdf.read()
    if not contents:
        raise HTTPException(status_code=400, detail="PDF is empty")

    file_hash = hashlib.sha256(contents).hexdigest()[:16]
    documents, total_pages = read_pdf(contents)

    if not documents:
        raise HTTPException(status_code=400, detail="Could not read any text from PDF")

    splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
    chunks = splitter.split_documents(documents)

    for index, document in enumerate(chunks, start=1):
        document.metadata["user_id"] = user_id
        document.metadata["source"] = filename
        document.metadata["chunk_id"] = f"{file_hash}-{index}"

    vector_store = PGVector(
        embeddings=embeddings,
        collection_name=f"user_{user_id}",
        connection=PGVECTOR_DATABASE_URL,
        use_jsonb=True)

    vector_store.add_documents(documents=chunks)

    return {
        "message": "PDF uploaded and indexed successfully",
        "user_id": user_id,
        "source": filename,
        "pages": total_pages,
        "chunks": len(chunks),
    }