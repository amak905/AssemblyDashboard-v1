
const form = document.getElementById("input-form");
const input = document.getElementById("cardinput");
const inLane = document.getElementById("cardin");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const value = input.value;
    if(!value) return;

    const newTask=document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable","true");
    newTask.innerText = value; 

    newTask.addEventListener("dragstart", ()=>{
        newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend",()=>{
        newTask.classList.remove("is-dragging");
    });

    inLane.appendChild(newTask);

    input.value="";
});