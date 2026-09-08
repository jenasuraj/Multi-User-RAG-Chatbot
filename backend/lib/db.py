import os
from contextlib import contextmanager
from typing import Any
import psycopg
from dotenv import load_dotenv
load_dotenv()




DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is missing from the .env file")

PGVECTOR_DATABASE_URL = DATABASE_URL
if PGVECTOR_DATABASE_URL.startswith("postgresql://"):
    PGVECTOR_DATABASE_URL = PGVECTOR_DATABASE_URL.replace(
        "postgresql://",
        "postgresql+psycopg://",
        1,
    )
elif PGVECTOR_DATABASE_URL.startswith("postgres://"):
    PGVECTOR_DATABASE_URL = PGVECTOR_DATABASE_URL.replace(
        "postgres://",
        "postgresql+psycopg://",
        1,
    )


class Database:
    def __init__(self, conn: psycopg.Connection):
        self.conn = conn

    def query(self, sql: str, params: tuple[Any, ...] = ()):
        with self.conn.cursor() as cursor:
            cursor.execute(sql, params)

            if cursor.description:
                rows = cursor.fetchall()
            else:
                rows = []

        self.conn.commit()
        return rows


@contextmanager
def db_session():
    conn = psycopg.connect(DATABASE_URL)
    try:
        yield Database(conn)
    finally:
        conn.close()


def get_db():
    with db_session() as db:
        yield db