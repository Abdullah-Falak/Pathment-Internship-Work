# JavaScript Fundamentals: Core Concepts Demos

This folder contains the deliverable for the JavaScript Fundamentals task. It includes an interactive, single-page web application featuring three distinct demos that fulfill all acceptance criteria.

## 🚀 Running the Project
Simply open the `index.html` file in any modern web browser. No local server or build tools are required. 

---

## 🎯 Acceptance Criteria Breakdown

To demonstrate a clear understanding of the core JavaScript concepts outlined in the task requirements, the code has been structured to explicitly showcase the following:

### 1. Scope, Closures, and Hoisting (Demo 1: Counter)
* **Hoisting:** In `app.js`, the `initializeCounter()` function is invoked at the top of the script before it is actually defined further down. This demonstrates an understanding of how the JavaScript engine hoists function declarations to the top of their execution context during the creation phase.
* **Scope:** The `count` variable is declared using `let` inside the `initializeCounter` function, making it block-scoped. It cannot be accessed or modified directly from the global window object, protecting the state.
* **Closures:** The `addEventListener` callbacks for the increase and decrease buttons are defined inside `initializeCounter()`. Even after `initializeCounter()` finishes execution, these callback functions form a **closure**, retaining access to the lexical scope where they were defined, allowing them to continually update the `count` variable.

### 2. DOM Manipulation and Event Handling (Demo 2: To-Do List)
* **Event Handling:** Standard event listeners (`click`) are attached to static UI elements (like the "Add Task" button).
* **Dynamic DOM Manipulation:** When a new task is added, the script prevents page reloads, creates a new object, and updates a data array. The `renderTodos()` function dynamically builds new DOM elements using `document.createElement()`, updates their content, and injects them into the `ul` using `appendChild()`.
* **Dynamic Events:** Delete buttons are generated on the fly. Event listeners are successfully attached to these dynamically created elements before they are appended to the DOM, allowing users to remove specific nodes based on their unique IDs.

### 3. Understanding Promises (Demo 3: Async Quiz)
* **Promise Creation:** A custom `fetchQuizData()` function was built to return a `new Promise()`. It uses `setTimeout()` to simulate a 1.5-second asynchronous network request (like querying an API).
* **Promise States:** The promise demonstrates handling successful execution by calling `resolve()` with a data object, and includes a fallback for `reject()` if the operation were to fail.
* **Consuming Promises:** The simulated API call is consumed using `.then()` to handle the resolved data (updating the DOM with the question and answer) and `.catch()` to handle potential errors gracefully in the UI.

