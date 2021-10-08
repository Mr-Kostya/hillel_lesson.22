const SELECTOR = Object.freeze({
    LIST: ".todo-list",
    INPUT: ".message-input",
    ADD_BTN: ".add-button",
    TODO_ITEM: ".todo-item",
    TODO_ITEM_TEMPLATE: "#newTaskTemplate"
});
const CLASS = Object.freeze({
    REMOVE_BTN: "remove-button",
    DONE_BTN: "done-button",
    DONE: "done"
});
const list = document.querySelector(SELECTOR.LIST);
const input = document.querySelector(SELECTOR.INPUT);
const button = document.querySelector(SELECTOR.ADD_BTN);
const todoHTML = document.querySelector(SELECTOR.TODO_ITEM_TEMPLATE).innerHTML;

button.addEventListener("click", onAddTodoButtonClick);
list.addEventListener("click", onTodoListClick);

function init() {
    TodoAPI.getList()
        .then((todoList) => {
            addTodoList(todoList);
        })
        .catch((error) => alert(error.message));
}

init();

function onAddTodoButtonClick() {
    if (!isValid(input.value)) {
        alert("Field must be filled");
        return;
    }

    addTodo(input.value);
    cleanOut();
}

function onTodoListClick(e) {
    const todoEl = getTodoElement(e.target);
    const classList = e.target.classList;

    if (e.target.classList.contains(CLASS.REMOVE_BTN)) {
        deleteTodo(todoEl).then(() => {
            TodoAPI.getList()
                .then((todoList) => addTodoList(todoList))
                .catch((error) => alert(error.message));
        });
        return;
    }
    if (classList.contains(CLASS.DONE_BTN)) {
        return toggleDone(todoEl);
    }
}

function getTodoElement(target) {
    return target.closest(SELECTOR.TODO_ITEM);
}

function isValid(message) {
    return message !== "";
}

function addTodoList(todoList) {
    const html = todoList.map((todo) => getTodoHTML(todo)).join("");

    list.innerHTML = html;
}

function getTodoHTML(todo) {
    return todoHTML
        .replace("((message))", todo.title)
        .replace("((todoId))", todo.id);
}

function addTodo(message) {
    list.insertAdjacentHTML(
        "beforeend",
        todoHTML.replace("((message))", message)
    );
}

function deleteTodo(el) {
    console.log(el);
    return TodoAPI.delete(el.id);
}

function toggleDone(el) {
    el.classList.toggle(CLASS.DONE);
}

function cleanOut() {
    input.value = "";
}
