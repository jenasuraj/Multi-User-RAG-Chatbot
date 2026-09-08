import os
from dotenv import load_dotenv
from langchain.agents import AgentState, create_agent
from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from graph.tools.memory_tool import fetch_user_memory, persist_user_memory
from graph.tools.rag_tool import rag_retrieval
from schema.Agent import AgentStateWithAuth, State
load_dotenv()



llm = ChatOpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url=os.getenv("OPENROUTER_BASE_URL"),
    model="mistralai/mistral-small-2603",
    streaming=True)



rag_agent = create_agent(
    model=llm,
    tools=[rag_retrieval, persist_user_memory, fetch_user_memory],
    system_prompt=(
        "You are a polite RAG chatbot. First use fetch_user_memory so you know "
        "the logged-in user. Use rag_retrieval when the user asks about "
        "uploaded PDFs or document context. Use persist_user_memory when the "
        "user shares stable, useful personal details like their name, hobbies, "
        "preferences, goals, or ongoing projects."
    ),
    state_schema=AgentStateWithAuth,
)




async def executer(state: State, config: RunnableConfig):
    response = await rag_agent.ainvoke(
        {
            "messages": state["messages"],
            "auth_token": state["auth_token"],
        },
        config=config,
    )
    return {"messages": [HumanMessage(content=response["messages"][-1].content)]}




builder = StateGraph(State)
builder.add_node("executer", executer)
builder.add_edge(START, "executer")
builder.add_edge("executer", END)
graph = builder.compile()