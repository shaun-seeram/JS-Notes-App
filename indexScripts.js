const addNote = document.querySelector("#addNote");
const completed = document.querySelector("#completed");

completed.addEventListener("click", (e) => {
    e.preventDefault();
    renderItems(todos, !hideCompleted)
    hideCompleted = !hideCompleted
    completed.textContent = hideCompleted ? "Show Completed" : "Hide Completed"
})

addNote.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign("/edit.html");
}) 

const todos = items.filter((item) => {
    return item.type === "todo"
});

const notes = items.filter((item) => {
    return item.type === "note"
});

renderItems(todos);
renderItems(notes);