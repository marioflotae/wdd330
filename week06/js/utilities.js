import * as tasks from "./ls.js";

const toDoList = tasks.getTasks();
let show = [];

export function render(filter) {

    let completedTask = toDoList.filter(item => item.completed == false);
    let ListItem = document.querySelector("#list_item");
    let numOfTask = document.querySelector('.number_task');
    numOfTask.innerText = completedTask.length + " tasks left";
    ListItem.innerHTML = "";

    switch (filter) {
        case "active":
            show = toDoList.filter(item => item.completed == false);
            break;

        case "completed":
            show = toDoList.filter(item => item.completed == true);
            break;
        default:
            show = toDoList;
            break;
    }

    for (let item of show) {

        var checkBox = document.createElement("INPUT");
        let li = document.createElement('li');
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", item.id);

        if (item.completed) {
            checkBox.checked = true;
            li.setAttribute("class", "task_completed");
        }


        checkBox.addEventListener('click', () => {
            item.completed = !item.completed;
            if (item.completed) {
                li.setAttribute("class", "task_completed");
            } else {
                li.setAttribute("class", "task_pending");
            }

            let left = toDoList.filter(i => i.completed == false);
            numOfTask.innerText = left.length + " tasks left";

            render(filter);

        });

        li.appendChild(checkBox);
        let span_content = document.createElement('span');
        let delete_img = document.createElement('img');
        span_content.innerText = item.content;
        li.appendChild(span_content);
        delete_img.setAttribute("src", "images/delete.png");
        delete_img.setAttribute("id", "b" + item.id);
        li.appendChild(delete_img);
        ListItem.appendChild(li);

        delete_img.addEventListener('click', () => {
            toDoList.forEach(arrayDelete => {
                let newDeleteId = delete_img.id.substring(1);
                let toDoIndexDelete = toDoList.indexOf(arrayDelete);
                if (arrayDelete.id === newDeleteId) {
                    toDoList.splice(toDoIndexDelete, 1);
                }
            });
            render(filter);
        });

    }

}

const filterTask = document.querySelector('.filter');
filterTask.addEventListener('click', (e) => {
    filter = e.target.value;
    render(filter);
});

let content = "";
const userInput = document.querySelector('#user_input');
userInput.addEventListener('input', (e) => {
    content = e.target.value;
})

export function addTask() {
    const myid = String(Date.now());
    const task = { id: myid, content: content, completed: false }
    toDoList.push(task);
    userInput.value = "";
    render(filter);
}

const clickButton = document.querySelector('.addTask');
clickButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

let filter;
render(filter = "all");