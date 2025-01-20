let call = false;

if (call == false) {
    document.addEventListener('DOMContentLoaded', function () {
        const shipDate = [];
        for (i = 0; i < 5; i++) {
            d = new Date();
            d.setDate(d.getDate() + i);
            day = d.getDate();
            month = d.getMonth() + 1;
            variable = "day" + i;
            console.log(variable);
            shipDate[i] = day + '/' + month;
            console.log(shipDate[i]);
        }

        const lanecontainer = document.getElementById('lane-container');
        i = 0;
        shipDate.forEach(function (sDate) {
            const swimLane = document.createElement('div');
            swimLane.classList.add("swim-lane");
            swimLane.id = `day${i}`
            swimLane.addEventListener("dragover", (e) => {
                e.preventDefault();

                const bottomTask = insertAboveTask(swimLane, e.clientY);
                const curTask = document.querySelector(".is-dragging");

                if (!bottomTask) {
                    swimLane.appendChild(curTask);
                }
                else {
                    swimLane.insertBefore(curTask, bottomTask);
                }
            })
            console.log(swimLane.id);

            const dateHead = document.createElement('h3');
            dateHead.textContent = `${shipDate[i]}`
            dateHead.className = "heading";
            swimLane.appendChild(dateHead);
            i++;
            console.log(i);
            lanecontainer.appendChild(swimLane);

            if (i == 5) {
                const swimLane = document.createElement('div');
                swimLane.className = 'swim-lane';
                swimLane.id = "late";
                swimLane.addEventListener("dragover", (e) => {
                    e.preventDefault();
    
                    const bottomTask = insertAboveTask(swimLane, e.clientY);
                    const curTask = document.querySelector(".is-dragging");
    
                    if (!bottomTask) {
                        swimLane.appendChild(curTask);
                    }
                    else {
                        swimLane.insertBefore(curTask, bottomTask);
                    }
                })
                const dateHead = document.createElement('h3');
                dateHead.textContent = "URGENT";
                dateHead.className = "heading";
                swimLane.appendChild(dateHead);
                lanecontainer.appendChild(swimLane);
            }

        })



        call = true;

    }, false)
}

