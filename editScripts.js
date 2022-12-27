let hash;
let index;

const form = document.getElementById("form");
const create = document.getElementById("create");
const remove = document.getElementById("delete");

const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const typeInput = document.getElementById("type");

if (window.location.hash) {

    hash = window.location.hash.slice(1);
    index = items.findIndex((item) => {
        return item.created === +hash;
    });

    if (index === -1) {
        window.location.replace("/")
    }

    titleInput.value = items[index].title;
    textInput.value = items[index].text;
    typeInput.value = items[index].type;

}

create.addEventListener("click", (e) => {
    e.preventDefault();

    if (window.location.hash) {

        items[index].title = form.elements.title.value;
        items[index].text = form.elements.text.value;
        items[index].type = form.elements.type.value;
        items[index].edited = new Date().getTime();

        localStorage.setItem("items", JSON.stringify(items));
        
    } else {

        items.push({
            title: form.elements.title.value ? form.elements.title.value : `Untitled ${form.elements.type.value === "note" ? "Note" : "To Do"}`,
            text: form.elements.text.value,
            type: form.elements.type.value,
            created: new Date().getTime(),
            edited: new Date().getTime(),
            completed: false
        });

        localStorage.setItem("items", JSON.stringify(items));
    }

    window.location.replace("/")

})

remove.addEventListener("click", (e) => {
    e.preventDefault();

    if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.replace("/");
    } else {
        window.location.replace("/");
    }

})