const form = document.getElementById("input-form");
const input = document.getElementById("cardinput");
const inLane = document.getElementById("cardin");

for (i = 0; i < 5; i++) {
    d = new Date();
    d.setDate(d.getDate() + i);
    day = d.getDate();
    month = d.getMonth() + 1;
    year = d.getYear();
    variable = "day" + i;
    console.log(variable);
    shipDate[i] = day + '/' + month;
    console.log(shipDate[i]);
}

for(i=0;i<5;i++){
conn.query('SELECT * FROM asmjob WHERE SHIPDATE = ?', [shipdate[i]],
    function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            foreach=>{
            const newTask = document.createElement("p");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", "true");
            newTask.innerText = shipDate[i];

            newTask.addEventListener("dragstart", () => {
                newTask.classList.add("is-dragging");
            });

            newTask.addEventListener("dragend", () => {
                newTask.classList.remove("is-dragging");
            });

            inLane.appendChild(newTask);
        }
        }
        else {
            res.send('Incorrect Username or password');
        }
        res.end();
    }
)
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    if (!value) return;

    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;

    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

    inLane.appendChild(newTask);

    input.value = "";
});