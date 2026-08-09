# Task Manager

A vanilla JavaScript Task Manager application built for the DOM manipulation project.

## Features
- Add tasks with a title
- Delete tasks
- Edit existing task titles
- Mark tasks as completed
- Search tasks by title
- Filter tasks: All / Pending / Completed
- Display total and completed task counts
- Persist tasks using `localStorage`

## Files
- `index.html` — page structure and application markup
- `index.css` — responsive styles and layout
- `App.js` — JavaScript logic for tasks, filters, and persistence

## How to run
1. Open `TaskManager/index.html` directly in a browser.
2. Add a task using the input field and "Add Task" button.
3. Use the search bar to filter task titles.
4. Use the filter buttons to show all, pending, or completed tasks.
5. Click the checkbox to mark a task complete.
6. Click "Edit" to change a task title or "Delete" to remove a task.

## Notes
- The app uses `localStorage`, so tasks remain after refreshing the page.
- Designed with clean spacing, readable typography, and responsive mobile layout.

## Recommended commits
- `git commit -m "initial project setup"`
- `git commit -m "implement add task feature"`
- `git commit -m "implement delete task feature"`
- `git commit -m "implement task completion and counters"`
- `git commit -m "implement localStorage persistence"`
- `git commit -m "add search, filters, and edit task support"`