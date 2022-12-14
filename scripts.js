let items = [];

if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items"))
}

const renderItems = (obj, hideCompleted = false) => {

    const noteList = document.querySelector(".notesList");
    const todoList = document.querySelector(".toDoList");
    const viewerTitle = document.querySelector(".viewerTitle");
    const viewerDate = document.querySelector(".created");
    const viewerContents = document.querySelector(".viewerContents");

    obj[0].type === "note" ? noteList.innerHTML = "" : todoList.innerHTML = ""

    if (hideCompleted) {
        obj = obj.filter((item) => {
            return !item.completed;
        })
    }

    obj.forEach(item => {
        const li = document.createElement("li");

        if (item.type === "todo") {
            const check = document.createElement("input");
            check.type = "checkbox";
            check.checked = item.completed;
            check.addEventListener("change", () => {
                item.completed = !item.completed;
                localStorage.setItem("items", JSON.stringify(items));
            })
            li.appendChild(check);
        }

        const button = document.createElement("button")
        const a = document.createElement("a");

        button.textContent = item.title;
        button.classList.add("itemButton");
        li.appendChild(button);
    
        a.href = `/edit.html#${item.created}`;
        a.classList.add("edit");
        a.textContent = "edit";
        li.appendChild(a);
    
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const created = `Created on ${new Date(item.created).toDateString()}`;
            const edited = ` | Last edited on ${new Date(item.edited).toDateString()}`
            viewerTitle.textContent = item.title;
            viewerDate.textContent = item.edited !== item.created ? created + edited : created
            viewerContents.textContent = item.text;
        })

        if (item.type === "note") {
            noteList.appendChild(li);
        } else if (item.type === "todo") {
            todoList.appendChild(li);
        }

    });
}

const setTime = () => {
    const now = new Date();
    document.querySelector(".headerDate").textContent = now.toDateString();
}

setTime();

// STRETCH: Show time? Format date appropriately?