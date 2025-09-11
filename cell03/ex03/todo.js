document.addEventListener('DOMContentLoaded', () => {
    
    const todoListContainer = document.getElementById('ft_list');
    const newButton = document.getElementById('new-todo-btn');
    const cookieName = 'todoList';

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const value = c.substring(nameEQ.length, c.length);
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return [];
                }
            }
        }
        return []; 
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/; SameSite=Lax";
    }

    function saveListToCookie() {
        const todos = [];
        const todoItems = todoListContainer.querySelectorAll('.todo-item');
        for (let i = todoItems.length - 1; i >= 0; i--) {
            todos.push(todoItems[i].textContent);
        }
        setCookie(cookieName, todos, 365); 
    }

    function addTodo(todoText) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';
        todoDiv.textContent = todoText;

        todoDiv.addEventListener('click', () => {
            if (confirm(`Do you really want to remove this TO DO: "${todoText}"?`)) {
                todoDiv.remove(); 
                saveListToCookie(); 
            }
        });

        todoListContainer.prepend(todoDiv);
    }
  
    function loadListFromCookie() {
        const savedTodos = getCookie(cookieName);
        if (savedTodos) {
            savedTodos.forEach(todoText => addTodo(todoText));
        }
    }

    newButton.addEventListener('click', () => {
        const newTodoText = prompt("Please enter your new TO DO:");
 
        if (newTodoText && newTodoText.trim() !== "") {
            addTodo(newTodoText.trim());
        }
        saveListToCookie();
    });

    loadListFromCookie();
});