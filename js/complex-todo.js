function createTodoElement(todo) {
    const todoTemplate = document.getElementById('todoTemplate');
    if (!todoTemplate) return;
    // clone the li element
    const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
    // find and update title
    const todoTitleElement = todoElement.querySelector('.todo__title');
    if (todoTitleElement) todoTitleElement.textContent = todo.title;
    // TODO: attach events to buttons
    return todoElement;
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
// main
(() => {
    const todoList = [
        { id: 1, title: 'Learn JS' },
        { id: 2, title: 'Learn ReactJS' },
        { id: 3, title: 'Learn NextJS' },
    ];

    renderTodoList(todoList, 'todoList');
})();
