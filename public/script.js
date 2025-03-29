let call = false;
let buffer = 5;
if (call == false) {
    document.addEventListener('DOMContentLoaded', function () {
        const shipDate = [];
        for (i = 0; i < buffer; i++) {
            d = new Date();
            variable = "day" + i;
            console.log(variable);
            d.setDate(d.getDate()+i);
            shipDate[i] = (d.getDate()) + '/' + (d.getMonth()+1) + '/' + (d.getFullYear().toString().substr(-2));
            console.log(shipDate[i]);
        }

        const lanecontainer = document.getElementById('lane-container');
        i = 0;
        
        shipDate.forEach(function (sDate) {
            const swimLane = document.createElement('div');
            swimLane.classList.add("swim-lane");
            swimLane.id = shipDate[buffer-(i+1)];
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
            dateHead.textContent = `${shipDate[buffer-i-1]}`
            dateHead.className = "heading";
            swimLane.appendChild(dateHead);
            i++;
            console.log(i);
            lanecontainer.appendChild(swimLane);

            if (i == buffer) {
                addlane(lanecontainer,"late","URGENT","heading");
                addlane(lanecontainer,"complete","Complete","completezone","complete");
                addlane(lanecontainer,"delete","Delete","dropzone");
                
            }

        })



        call = true;

    }, false)

}


function addlane(lane,identification,laneheader, headerid){
                const swimLane = document.createElement('div');
                swimLane.className = 'swim-lane';
                swimLane.id = identification;
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
                const urgentHead = document.createElement('h3');
                urgentHead.textContent = laneheader;
                urgentHead.className = "heading";
                urgentHead.id = headerid;
                swimLane.appendChild(urgentHead);
                lane.appendChild(swimLane);
}
