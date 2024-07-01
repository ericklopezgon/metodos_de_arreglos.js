// Declaracion de array
let to_do_list = [
    {
        id: "001",
        description: "barrer el piso",
        completed: false,
    },
    {
        id: "002",
        description: "repaso de material estudio",
        completed: false,
    },
    {
        id: "003",
        description: "Entrenar",
        completed: false,
    },
];

// Declaracion de variables
const list = document.querySelector("#render_list");
const btn_add = document.querySelector("#add");
const total_tasks = document.querySelector("#total_tasks");
const completed_tasks = document.querySelector("#completed_tasks");

// contador simple de id
let next_id = to_do_list.length + 1;

const current_list = () => {
    let htmlList = ``;
    to_do_list.forEach((task) => {
        htmlList += `
        <div class="row mb-2" id="new_item_list">
            <div class="col-2">${task.id}</div>
            <div class="col-6">${task.description}</div>  
            <div class="col-2">
                <input type='checkbox' onclick='checked_complete("${task.id}")' ${task.completed ? "checked" : ""}>
            </div>
            <div class="col-2">
                <button class="mb-1 btn btn-danger" onclick='delete_item("${task.id}")'><i class="fa-solid fa-x" style="color: #fa0000;"></i></button>
            </div> 
        </div>`;
    });
    list.innerHTML = htmlList;
    update_counts();
};

// Checkbox
const checked_complete = (id) => {
    to_do_list = to_do_list.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    
    update_counts(); 
};

// Button delete
const delete_item = (id) => {
    to_do_list = to_do_list.filter(task => task.id !== id);
    current_list();
};

// Button add
btn_add.addEventListener("click", () => {
    let item_input = document.querySelector("#items_input").value;
    if (item_input === "") {
        alert("Debe agregar un objeto a la lista");
        return;
    }

    let new_item = {
        id: (next_id++).toString().padStart(3, '0'),
        description: item_input,
        completed: false
    };

    to_do_list.push(new_item);
    document.querySelector("#items_input").value = '';
    current_list();
});

// total de tareas realizadas y total de tareas
const update_counts = () => {
    total_tasks.textContent = to_do_list.length;
    completed_tasks.textContent = to_do_list.filter(task => task.completed).length;
};

current_list();
