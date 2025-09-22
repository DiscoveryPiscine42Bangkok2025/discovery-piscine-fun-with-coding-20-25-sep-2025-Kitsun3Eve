// Use jQuery's ready function to ensure the DOM is fully loaded before running the code.
$(document).ready(function() {
    const todoList = $('#ft_list');
    const newBtn = $('.new-btn');

    // Function to save the list to a cookie
    function saveCookie() {
        const todos = [];
        // Use jQuery's selector and .each() to iterate through each to-do item
        todoList.find('.to-do-item').each(function() {
            todos.push($(this).text());
        });
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))};path=/`;
    }

    // Function to create and add a new to-do item
    function createTodo(text) {
        // Create a new div using jQuery
        const newTodo = $('<div></div>')
            .addClass('to-do-item')
            .text(text);
        
        // Add a click event listener for removal using .on()
        newTodo.on('click', function() {
            if (confirm(`Do you want to remove this TO DO: "${text}"?`)) {
                // Remove the clicked element and save the cookie
                $(this).remove();
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
            todos.reverse().forEach(text => {
                createTodo(text);
            });
        }
    })();

    // Add a click event listener to the "New" button
    newBtn.on('click', function() {
        const task = prompt("Please enter a new TO DO:");
        if (task && task.trim() !== "") {
            createTodo(task.trim());
        }
    });
});