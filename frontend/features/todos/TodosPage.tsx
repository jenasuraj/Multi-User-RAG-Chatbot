"use client";

import { FormEvent, useMemo, useState } from "react";
import { FiCheck, FiCircle, FiPlus, FiTrash2 } from "react-icons/fi";

const initialTodos = [
  { id: 1, title: "Upload onboarding handbook PDF", category: "Document prep", done: true },
  { id: 2, title: "Ask the assistant for renewal deadlines", category: "Research", done: false },
  { id: 3, title: "Summarize action items for the team", category: "Follow-up", done: false },
];

export const TodosPage = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Follow-up");
  const completedCount = useMemo(() => todos.filter((todo) => todo.done).length, [todos]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    setTodos((prev) => [{ id: Date.now(), title: trimmedTitle, category, done: false }, ...prev]);
    setTitle("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <section className="w-full bg-[#f7fbf5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-emerald-700">Todo workspace</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">Track the actions your documents create.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">Use this frontend-only todo board to organize document prep, research questions, and follow-up items while the backend is still being connected.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Total tasks</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{todos.length}</p>
              </article>
              <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Completed</p>
                <p className="mt-2 text-3xl font-bold text-emerald-800">{completedCount}</p>
              </article>
              <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Open</p>
                <p className="mt-2 text-3xl font-bold text-amber-600">{todos.length - completedCount}</p>
              </article>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-lg sm:p-6">
            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
              <label htmlFor="todo-title" className="sr-only">Task title</label>
              <input id="todo-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a task from your document session" className="min-w-0 rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />

              <label htmlFor="todo-category" className="sr-only">Category</label>
              <select id="todo-category" value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:bg-white">
                <option>Document prep</option>
                <option>Research</option>
                <option>Follow-up</option>
                <option>Review</option>
              </select>

              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800">
                <FiPlus aria-hidden="true" />
                Add
              </button>
            </form>

            <div className="mt-6 grid gap-3">
              {todos.map((todo) => (
                <article key={todo.id} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-[#f7fbf5] p-4 transition hover:border-emerald-200">
                  <button type="button" onClick={() => toggleTodo(todo.id)} className="grid size-10 shrink-0 place-items-center rounded-lg border border-emerald-200 bg-white text-emerald-800 transition hover:bg-emerald-50" aria-label={todo.done ? "Mark task as open" : "Mark task complete"}>
                    {todo.done ? <FiCheck aria-hidden="true" /> : <FiCircle aria-hidden="true" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <h2 className={`font-semibold ${todo.done ? "text-slate-400 line-through" : "text-slate-950"}`}>{todo.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{todo.category}</p>
                  </div>

                  <button type="button" onClick={() => deleteTodo(todo.id)} className="grid size-10 shrink-0 place-items-center rounded-lg border border-red-100 bg-white text-red-600 transition hover:bg-red-50" aria-label="Delete task">
                    <FiTrash2 aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
