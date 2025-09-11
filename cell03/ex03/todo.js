document.addEventListener('DOMContentLoaded', () => {
    
    const todoListContainer = document.getElementById('ft_list');
    const newButton = document.getElementById('new-todo-btn');
    const cookieName = 'todoList';

    // --- COOKIE HELPER FUNCTIONS ---

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const value = c.substring(nameEQ.length, c.length);
                // Try to parse the cookie value as JSON
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return [];
                }
            }
        }
        return []; // Return an empty array if cookie not found
    }
    
    // A function to set a cookie. The value will be an array of strings.
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Convert the array to a JSON string before storing
        document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/; SameSite=Lax";
    }

    // --- CORE TODO FUNCTIONS ---
    
    // Reads all to-do items from the DOM and saves them to the cookie
    function saveListToCookie() {
        const todos = [];
        const todoItems = todoListContainer.querySelectorAll('.todo-item');
        // Iterate backwards to preserve the original order when re-loading
        for (let i = todoItems.length - 1; i >= 0; i--) {
            todos.push(todoItems[i].textContent);
        }
        setCookie(cookieName, todos, 365); // Save for one year
    }

    // Creates and adds a new to-do item to the top of the list
    function addTodo(todoText) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';
        todoDiv.textContent = todoText;

        // Add a click listener to handle removal
        todoDiv.addEventListener('click', () => {
            // Ask for confirmation before removing
            if (confirm(`Do you really want to remove this TO DO: "${todoText}"?`)) {
                todoDiv.remove(); // Removes the element from the DOM
                saveListToCookie(); // Update the cookie after removing an item
            }
        });

        // Add the new to-do item to the top of the list container
        todoListContainer.prepend(todoDiv);
    }
    
    // Loads the list from the cookie when the page first opens
    function loadListFromCookie() {
        const savedTodos = getCookie(cookieName);
        if (savedTodos) {
            savedTodos.forEach(todoText => addTodo(todoText));
        }
    }

    // --- EVENT LISTENERS ---

    // Handle clicks on the "New" button
    newButton.addEventListener('click', () => {
        const newTodoText = prompt("Please enter your new TO DO:");
        
        // Validate the input: it must not be null or just empty spaces
        if (newTodoText && newTodoText.trim() !== "") {
            addTodo(newTodoText.trim());
        }
        // Save the entire list to the cookie after adding a new item
        saveListToCookie();
    });

    loadListFromCookie();
});