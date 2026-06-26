// =======================================================
// DEMO 1: COUNTER (Hoisting, Scope, and Closures)
// =======================================================

// HOISTING IN ACTION: Calling the function before it's written below.
initializeCounter(); 

function initializeCounter() {
    // SCOPE: 'count' is protected inside this block.
    let count = 0; 
    const display = document.getElementById('count-display');

    // CLOSURE: These inner functions remember the 'count' variable.
    document.getElementById('btn-increase').addEventListener('click', function() {
        count++;
        display.textContent = count;
    });

    document.getElementById('btn-decrease').addEventListener('click', function() {
        count--;
        display.textContent = count;
    });
}

// =======================================================
// DEMO 2: TO-DO LIST (Arrays, Objects, DOM Manipulation)
// =======================================================

let todos = []; 

const todoInput = document.getElementById('todo-input');
const btnAddTodo = document.getElementById('btn-add-todo');
const todoList = document.getElementById('todo-list');

// Event Listener
btnAddTodo.addEventListener('click', addTodo);

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    // Creating a task object
    const newTask = {
        id: Date.now(),
        text: text
    };

    todos.push(newTask);
    todoInput.value = '';
    renderTodos();
}

function renderTodos() {
    // DOM Manipulation
    todoList.innerHTML = ''; 

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;'; // Clean "X" symbol
        
        // Handling events for dynamically created elements
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// =======================================================
// DEMO 3: ASYNC QUIZ (Promises)
// =======================================================

// PROMISE: Mocking a secure API fetch
function fetchQuizData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; 
            if (success) {
                resolve({
                    question: "What does DOM stand for?",
                    answer: "Document Object Model"
                });
            } else {
                reject("Connection Error: Data fetch failed.");
            }
        }, 1500); // 1.5 second delay
    });
}

const btnLoadQuiz = document.getElementById('btn-load-quiz');
const quizStatus = document.getElementById('quiz-status');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerText = document.getElementById('answer-text');
const btnShowAnswer = document.getElementById('btn-show-answer');

btnLoadQuiz.addEventListener('click', () => {
    quizStatus.textContent = "Establishing connection... fetching data.";
    quizContainer.classList.add('hidden');
    answerText.classList.add('hidden');

    // Resolving the Promise
    fetchQuizData()
        .then(data => {
            quizStatus.textContent = "Data successfully retrieved.";
            questionText.textContent = data.question;
            answerText.textContent = data.answer;
            quizContainer.classList.remove('hidden');
        })
        .catch(error => {
            quizStatus.textContent = error;
        });
});

btnShowAnswer.addEventListener('click', () => {
    answerText.classList.remove('hidden');
    btnShowAnswer.classList.add('hidden'); // Hide button after clicking
});
