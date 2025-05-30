const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

document.addEventListener("DOMContentLoaded",function(){
const dropzone = document.getElementById("delete");

dropzone.addEventListener('drop',(e) =>{
    e.preventDefault();
        const curTask = document.querySelector(".is-dragging");

        if(curTask){
            curTask.remove();
        }
});

});


draggables.forEach((task)=>{
    task.addEventListener("dragstart", ()=>{
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend",()=>{
        task.classList.remove("is-dragging");
    });
});



droppables.forEach((zone)=>{
    zone.addEventListener("dragover",(e)=>{
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");

        console.log(zone.id);

        if(!bottomTask) {
            zone.appendChild(curTask);
        }
        else {
            zone.insertBefore(curTask, bottomTask);
        }
    });
});


const insertAboveTask = (zone,mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task)=>{
        const{ top } = task.getBoundingClientRect();
        const offset = mouseY - top;

        if(offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;

        }
    });

    return closestTask;
};



/* dropzone.forEach((zone)=>{
    zone.addEventListener("drop",(e)=>{
        e.preventDefault();
        const itemId = e.dataTransfer.getData('text/plain');
        console.log(itemId);
        const item = document.getElementById(itemId);
        if(item){
            item.remove();
        }
})
}); */


