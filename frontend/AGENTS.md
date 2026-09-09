# RAG CHATBOT FRONTEND

This repository contains ui of rag chatbot application. Before making changes, inspect the existing codebase and follow the instructions in this file.

## Project Requirements

- Use TypeScript for all application code.
- Use Next.js as the framework.
- Use the Next.js App Router.
- Use Tailwind CSS for styling.
- Follow the existing project architecture where possible instead of unnecessarily rebuilding working code.

## Project Structure

- Keep all routes and pages inside `/app`.
- The `/app` directory should mainly deal with routing, layouts, loading states, error states, and page composition.
- Create a root-level `/components` folder for reusable components when needed.
- Organize `/components` into meaningful folders such as `/ui`, `/layout`, `/custom`, etc. depending on the project.
- Create and maintain a root-level `/lib` folder when shared utilities or infrastructure code are required.
- `/lib` can contain database connections, helper functions, API utilities, configuration, validation utilities, and similar shared logic.
- Additional folders can be created at the root level when they improve project organization.
- Do not force unrelated application logic into `/app` just because it belongs to a page.
- Keep `/app` route files as thin as possible and prefer them to remain Server Components; do not add `"use client"` to page or route files unless client-side behavior is genuinely required.
- Put most page-specific and feature-specific implementation inside `/features`.
- For example, if the home page contains multiple sections, prefer a structure such as `/features/home/HeroSection.tsx`, `/features/home/AboutSection.tsx`, and `/features/home/ContactSection.tsx`, then compose those sections from `/app/page.tsx`.
- For domain features such as todos, keep the implementation inside `/features/todos/TodoList.tsx` or `/features/todos/TodoEdit.tsx`.
- Components inside `/features` should remain specific to that feature. If a component becomes reusable across multiple features or pages, move it to the root-level `/components` directory.
- Do not create excessive component files inside `/features`. Keep small, tightly related UI or logic together when splitting it into another file would only increase indirection without providing meaningful reuse, readability, or separation of concerns.
- Do not create a separate component for every small JSX block. Extract a component only when it is substantial, reused, independently understandable, or makes the parent file significantly cleaner.





## Development Guidelines

- Keep implementations simple, readable, and focused.
- Do not introduce unnecessary abstractions, helper functions, wrappers, files, or complexity when a straightforward implementation is enough.
- Avoid excessive comments.
- Add comments only for non-obvious logic, important architectural decisions, edge cases, or behavior that cannot be understood easily from the code.
- When you needed to work in a page start from <main> tag i.e the app/page.tsx must have main tag and within it so many <section> can be present defining each portion of that page for example :  app/page.tsx can have multiple section like hero, testimonial etc and they all can be present in features/home/section_names and they all can be called from main tag presnt in page.tsx
- Use clear and descriptive names for components, functions, variables, types, and features.
- Prefer names that clearly explain responsibility For example, prefer: const calculateAge = () => {} instead of const calculatorMine = () => {} .




## Code Formatting Style

* Use a compact, low-vertical-density coding style.
* Keep function parameters, prop destructuring, simple object literals, and short expressions on one line when readable.
* Avoid unnecessary line breaks.
* Avoid deep nesting.
* Prefer early returns.
* Use blank lines only to separate logical blocks.
* Keep simple functions simple.
* Do not spread small pieces of code across many lines unless readability genuinely improves.

Prefer:

```ts
const TodoCard = ({todo, onDelete, onUpdate}: TodoCardProps) => {
```

instead of:

```ts
const TodoCard = ({
  todo,
  onDelete,
  onUpdate
}: TodoCardProps) => {
```



## TypeScript Guidelines

* Use proper TypeScript types and interfaces but dont dump with tsx files, implement interafces in types folder and import from it.
* Avoid `any` unless there is a strong reason for using it.
* Define shared types in appropriate feature or shared type files when reuse is required.
* Do not create unnecessary types when TypeScript can infer the value clearly.
* Prefer readable types over overly complex generic abstractions.

## Styling Guidelines

* Use Tailwind CSS for styling.
* Keep Tailwind classes readable and consistent with the existing UI.
* Avoid unnecessary custom CSS when Tailwind can handle the requirement cleanly.
* Maintain responsive behavior across mobile, tablet, and desktop when applicable.

## Reusability

* Reuse existing components, utilities, hooks, types, and patterns before creating new ones.
* Do not duplicate logic that already exists in the repository.
* Do not create abstractions only for the sake of abstraction.
* Prefer simple reuse over overly generic systems.