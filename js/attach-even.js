function createTodoElement(todo) {
    const todoTemplate = document.getElementById('todoTemplate');
    if (!todoTemplate) return;
    // clone the li element
    const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
    todoElement.dataset.id = todo.id;
    todoElement.dataset.status = todo.status;

    // render todo status
    const divElement = todoElement.querySelector('div.todo');
    if (!divElement) return null;
    const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
    divElement.classList.add(alertClass);

    //render todo buttons
    const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
    const contentBtn = todo.status === 'completed' ? 'Reset' : 'Finish';
    markAsDoneButton.textContent = contentBtn;
    const styleMarkAsDoneButton = todo.status === 'completed' ? 'btn-success' : 'btn-dark';
    markAsDoneButton.classList.remove('btn-success');
    markAsDoneButton.classList.add(styleMarkAsDoneButton);

    // find and update title
    const todoTitleElement = todoElement.querySelector('.todo__title');
    if (todoTitleElement) todoTitleElement.textContent = todo.title;

    // TODO: attach events to buttons
    //add click event for mark-as-done button

    if (markAsDoneButton) {
        markAsDoneButton.addEventListener('click', () => {
            const currentStatus = todoElement.dataset.status;
            const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

            //get current todo list
            //update status of current todo
            // save to localStorage
            const todoList = getTodoList();
            const index = todoList.findIndex((x) => x.id === todo.id);
            if (index >= 0) {
                todoList[index].status = newStatus;
                localStorage.setItem('todo_list', JSON.stringify(todoList));
            }

            // update data-status on li element
            todoElement.dataset.status = newStatus;

            //update alert class accordingly
            const newAlertClass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
            divElement.classList.remove('alert-success', 'alert-secondary');
            divElement.classList.add(newAlertClass);

            const newStyleMarkAsDoneButton =
                currentStatus === 'pending' ? 'btn-success' : 'btn-dark';
            markAsDoneButton.classList.remove('btn-success', 'btn-dark');
            markAsDoneButton.classList.add(newStyleMarkAsDoneButton);

            const newContentBtn = currentStatus === 'pending' ? 'Reset' : 'Finish';
            markAsDoneButton.textContent = '';
            markAsDoneButton.textContent = newContentBtn;
        });
    }

    // add click event for remove button
    const removeButton = todoElement.querySelector('button.remove');
    if (removeButton) {
        removeButton.addEventListener('click', () => {
            // console.log('remove clicked');
            //save to localStorage
            const todoList = getTodoList();
            const newTodoList = todoList.filter((x) => x.id !== todo.id);
            localStorage.setItem('todo_list', JSON.stringify(newTodoList));

            todoElement.remove();
        });
    }

    // add click event for edit button
    const editButton = todoElement.querySelector('button.edit');
    if (editButton) {
        editButton.addEventListener('click', () => {
            //TODO: latest todo data - get from localStorage
            const todoList = getTodoList();
            const latestTodo = todoList.find((x) => x.id === todo.id);
            if (!latestTodo) return;

            //populate data to todo form
            populateTodoForm(latestTodo);
        });
    }
    return todoElement;
}

function populateTodoForm(todo) {
    //query todoForm
    //dataset.id = todo.id
    const todoForm = document.getElementById('todoFormId');
    if (!todoForm) return;
    todoForm.dataset.id = todo.id;

    //set value for form control
    //set value for input
    const todoInput = document.getElementById('todoText');
    todoInput.value = todo.title;
}

function renderTodoList(todoList, ulElementId) {
    if (!Array.isArray(todoList) || todoList.length === 0) return;
    //find ul element
    //loop through todoList
    //each todoList --> create li element --> append to ul
    const ulElement = document.getElementById(ulElementId);

    if (!ulElement) return;

    for (const todo of todoList) {
        const liElement = createTodoElement(todo);

        ulElement.appendChild(liElement);
    }
}

function getTodoList() {
    try {
        return JSON.parse(localStorage.getItem('todo_list'));
    } catch {
        return [];
    }
}

function handleTodoFormSubmit(event) {
    event.preventDefault();
    const todoForm = document.getElementById('todoFormId');
    if (!todoForm) return;

    //get value
    //validate input value
    const todoInput = document.getElementById('todoText');
    if (!todoInput || todoInput.value === '') {
        alert('input not found');
        return;
    }

    //determine add or edit mode
    const isEdit = Boolean(todoForm.dataset.id);

    if (isEdit) {
        // find current todo
        const todoList = getTodoList();
        const index = todoList.findIndex((x) => x.id.toString() === todoForm.dataset.id);
        if (index < 0) return;

        // update content
        todoList[index].title = todoInput.value;
        // save to
        localStorage.setItem('todo_list', JSON.stringify(todoList));

        // apply DOM changes
        // find li element having id = todoForm.dataset.id
        const liElement = document.querySelector(
            `ul#todoList > li[data-id="${todoForm.dataset.id}"]`
        );
        if (liElement) {
            const titleElement = liElement.querySelector('.todo__title');
            if (titleElement) titleElement.textContent = todoInput.value;
        }
    } else {
        //add mode
        const newTodo = {
            id: Date.now(),
            title: todoInput.value,
            status: 'pending',
        };

        //save
        const todoList = getTodoList();
        todoList.push(newTodo);
        localStorage.setItem('todo_list', JSON.stringify(todoList));

        //apply Dom changes
        const newLiElement = createTodoElement(newTodo);
        const ulElement = document.getElementById('todoList');
        if (!ulElement) return;
        ulElement.appendChild(newLiElement);
    }

    //reset form
    delete todoForm.dataset.id;
    todoForm.reset();
}

// main
(() => {
    // const todoList = [
    //     { id: 1, title: 'Learn JS', status: 'complete' },
    //     { id: 2, title: 'Learn ReactJS', status: 'pending' },
    //     { id: 3, title: 'Learn NextJS', status: 'pending' },
    // ];
    const todoList = getTodoList();
    renderTodoList(todoList, 'todoList');

    //register submit event for todo from
    const todoForm = document.getElementById('todoFormId');
    if (todoForm) {
        todoForm.addEventListener('submit', handleTodoFormSubmit);
    }
})();
