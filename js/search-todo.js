function getAllTodoElement() {
    return document.querySelectorAll('#todoList > li');
}
function isMatch(liElement, searchTerm) {
    if (!liElement) return false;
    if (searchTerm === '') return true;

    const titleElement = liElement.querySelector('p.todo__title');
    if (!titleElement) return false;

    return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}
function searchTodo(searchTerm) {
    // search === empty --> show all
    // search !== empty -->filter todo

    const todoElementList = getAllTodoElement();

    for (const todoElement of todoElementList) {
        const needToShow = isMatch(todoElement, searchTerm);

        todoElement.hidden = !needToShow;
    }
}

function initSearchInput() {
    // find search term input
    const searchTermInput = document.getElementById('searchTerm');
    if (!searchTermInput) return;
    // attach change event to search

    searchTermInput.addEventListener('input', () => {
        console.log('search', searchTermInput.value);
        searchTodo(searchTermInput.value);
    });
}
//main
(() => {
    initSearchInput();
})();
