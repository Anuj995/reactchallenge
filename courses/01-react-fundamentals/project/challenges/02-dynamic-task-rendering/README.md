# Challenge 02: Dynamic Task Rendering

**Work on this challenge only.** You've completed Challenge 01 (TaskCard, TaskList, placeholders for TaskForm and TaskApp). Now read this README and implement this step.

## Goal

Make the list dynamic: state with at least 5 tasks, render with `map()`, unique `key`, and a task count (e.g. "5 Tasks").

**In practice.** `useState` is the default way to hold UI state in React. You use it when the component (or a parent) "owns" the data and needs to update the UI when that data changes. In aproduction, keeping state close to where it's used and passing it down via props keeps components predictable and testable.

## What to do

1. **State**  
   In the component that renders this challenge’s view, use the task array App already holds in state (App passes `tasks` and `setTasks` to TaskApp). Each task: `id` (string or number), `title`, `description`, `priority`, `completed` (boolean). Minimum 5 tasks. E2E expects at least 5 tasks and count text **5 Tasks**; use titles like **First Task**, **Second Task** so tests can find them.

2. **TaskList**  
   Accept a `tasks` prop. Use `map()` to render a TaskCard per task with `key={task.id}`. Pass `title`, `description`, `priority` (and later for Ch4: `completed`, `onToggle`).

3. **Task count**  
   Show count above the list (e.g. "5 Tasks"). Use an element with `id="task-count"`.

4. **Route and wiring**  
   You don’t change `App.tsx`. It already imports `TaskApp` from `./components` and renders `<TaskApp tasks={tasks} setTasks={setTasks} showForm={false} countFormat="tasks" />` at `/challenge/02-dynamic-task-rendering`. (In Challenge 18, App may pass `dispatch` instead of `setTasks`; TaskApp can accept either.) Replace your **TaskApp** placeholder with a real component: it receives `tasks`, `setTasks`, `showForm`, `countFormat` from App; it imports `TaskList` and passes `tasks` and `countText` (e.g. "5 Tasks") to it, and renders the count in an element with `id="task-count"`. Update your **TaskList** to accept a `tasks` prop (and optional `countText`, `onToggle` for later) and use `map()` to render TaskCards with `key={task.id}`. **Important:** When `tasks` is not passed (e.g. on route 01), keep showing your 3 hardcoded tasks so Challenge 01 still works (e.g. `const list = tasks ?? HARDCODED_TASKS`). When `tasks` is passed but empty, render nothing or an empty list. Keep exporting TaskList and the `Task` type from `src/components/index.ts`.

5. **Code**  
   TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: tasks from state; ≥5 tasks; each TaskCard has `key`; task count with `id="task-count"`; E2E on the route. Pass threshold: **≥ 80%**. (State may be held with `useState` or later with `useReducer` in Challenge 18; tests accept either.)

## Verify

- `npm run dev` → open `/challenge/02-dynamic-task-rendering` → see 5+ tasks and count.
- `npm run review -- --challenge=02-dynamic-task-rendering`
