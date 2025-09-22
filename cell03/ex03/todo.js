const todoList = document.getElementById('ft_list');
const newBtn = document.querySelector('.new-btn');

// Function to save the list to a cookie
function saveCookie() {
    const todos = [];
    document.querySelectorAll('.to-do-item').forEach(item => {
        todos.push(item.textContent);
    });
    document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))};path=/`;
}

// Function to create and add a new to-do item
function createTodo(text) {
    const newTodo = document.createElement('div');
    newTodo.className = 'to-do-item';
    newTodo.textContent = text;
    
    // Add click event for removal
    newTodo.addEventListener('click', () => {
        if (confirm(`Do you want to remove this TO DO: "${text}"?`)) {
            newTodo.remove();
            saveCookie();
        }
    });
    
    // Add the new item to the top of the list
    todoList.prepend(newTodo);
    saveCookie();
}

// Load existing tasks from the cookie on page load
(function loadCookie() {
    const cookies = document.cookie.split(';');
    let todoData = '';
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith('todos=')) {
            todoData = decodeURIComponent(cookie.substring('todos='.length, cookie.length));
            break;
        }
    }

    if (todoData) {
        const todos = JSON.parse(todoData);
        todos.reverse().forEach(text => { // Reverse to add in correct order
            createTodo(text);
        });
    }
})();

// Event listener for the "New" button
newBtn.addEventListener('click', () => {
    const task = prompt("Please enter a new TO DO:");
    if (task && task.trim() !== "") {
        createTodo(task.trim());
    }
});