/*
The function of this .js is to get information from the asmjobs table and create elements from the retrieved data. 
This is where the cards are filled with data. 
There is almost certainly a better way to do this, but for now, it works. 

This also encodes the information from the card into the URL when you click the edit button. 
The loctite checkbox is irrelevant and can be considered a placeholder at this stage.
*/

fetch('/asmjob')
    .then(response => response.json())
    .then(data => {
        var today = new Date();
        var inLane = document.getElementById("complete");
        
        data.forEach(item => {
            if (!data) return;
            
            var date = new Date(item.SHIPDATE);
            
            var pool = new Date();
            pool.setDate(pool.getDate()+6); 
            var datestring = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear().toString().substr(-2);
            console.log(inLane);
            
            
            if(date < (today)){
                inLane = document.getElementById("late");
            }

            if(date > (pool)){
                inLane = document.getElementById("delete");
            } 
            
            const filter = !!(document.getElementById(datestring));
            if (filter) {
                console.log("testing+"+datestring);
                
                inLane = document.getElementById(datestring);
                }



            const newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", "true");
            newTask.addEventListener("dragstart", () => {
                newTask.classList.add("is-dragging");
            });
            newTask.addEventListener("dragend", () => {
                newTask.classList.remove("is-dragging");
            });

            inLane.appendChild(newTask);
            newTask.id=item.AO;
            const grid = document.createElement("div");
                grid.classList.add("grid");
                newTask.appendChild(grid);

                    const ao = document.createElement("div");
                    ao.classList.add("ao");
                    grid.appendChild(ao);
                    
                        const aoh1 = document.createElement("h1");
                        aoh1.classList.add("task__ao");
                        ao.appendChild(aoh1);
                        aoh1.textContent = "AO " + item.AO;

                    const shipdate = document.createElement("div");
                    shipdate.classList.add("shipdate");
                    grid.appendChild(shipdate);
                        const due = document.createElement("h1");
                        due.classList.add("task__ao");
                        const duedate = document.createElement("h1");
                        duedate.classList.add("task__ao");
                        shipdate.appendChild(due);
                        shipdate.appendChild(duedate);
                        due.textContent = "DUE";
                        var date = new Date(item.SHIPDATE);
                             
                        duedate.textContent = datestring;

                    const pnum = document.createElement("div");
                    pnum.classList.add("item");
                    grid.appendChild(pnum);
                        const itemh1 = document.createElement("h1");
                        itemh1.classList.add("task__ao");
                        pnum.appendChild(itemh1);
                        itemh1.textContent = item.PARTNUM;


                    const qty = document.createElement("div");
                    qty.classList.add("qty");
                    grid.appendChild(qty);
                        const qtyh1 = document.createElement("h1");
                        qtyh1.classList.add("task__ao");
                        qty.appendChild(qtyh1);
                        qtyh1.textContent = "QTY " + item.QTY;
                 
                    const asmtime = document.createElement("div");
                    asmtime.classList.add("asmtime");
                    grid.appendChild(asmtime);
                        const asmtimeh1 = document.createElement("h1");
                        asmtimeh1.classList.add("task__ao");
                        asmtime.appendChild(asmtimeh1);
                        asmtimeh1.textContent = item.ASMTIME + " hrs";
                        
/* 
                    const _bench = document.createElement("div");
                    _bench.classList.add("benchlist");
                    grid.appendChild(_bench);
                    const bench = document.createElement("select");
                    bench.id = "benchDropdown";
                    _option("Red Bench", bench);
                    _bench.appendChild("bench"); */


                        
                    const loctite = document.createElement("div");
                    loctite.classList.add("task__ao");
                    grid.appendChild(loctite);
                        const loctitecheckbox = document.createElement("input");
                        loctitecheckbox.type = "checkbox";
                        loctitecheckbox.id = "myloctite";
                        loctitecheckbox.classList.add("task__type");

                        let label = document.createElement("label");
                        label.classList.add("task__type");
                        label.htmlFor="myloctite";
                        label.innerText="Loctite";

                        loctite.appendChild(loctitecheckbox);
                        loctite.appendChild(label);

                        const edit = document.createElement("div");
                        edit.classList.add("edit-button");
                        edit.classList.add("task__ao");
                        grid.appendChild(edit);
                            const editbutton = document.createElement("button");
                            editbutton.id = "edit";
                            editbutton.classList.add("task__ao");
                            editbutton.classList.add("edit-button");
                            editbutton.innerText="EDIT";
                            edit.appendChild(editbutton);
                            edit.addEventListener("click",function(e){
                                                        const parentId = e.target.parentElement.parentElement.parentElement.id;
                                                        console.log("Closest div id:", parentId);
                                                        
                                                        setTimeout(()=>{
                                                            window.location.href = `http://localhost:3000/jobloading?assemblyOrder=${encodeURIComponent(item.AO)}&shipDate=${encodeURIComponent(item.SHIPDATE)}&partNumber=${encodeURIComponent(item.PARTNUM)}&qty=${encodeURIComponent(item.QTY)}&asmtime=${encodeURIComponent(item.ASMTIME)}`;
                                                        }, 2000);
                                                        
                                                    });
                            
        });
    })
    .catch(error => console.error('Error fetching data:', error));


function _option(benches,colours) {
    let option1 = document.createElement("option");
    option1.value = benches;
    option1.text= benches;
    colours.appendChild(benches);
}