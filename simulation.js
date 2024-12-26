const start_btn = document.querySelector(".start-exp");
const main_body = document.querySelector("body");
start_btn.addEventListener('click',(event)=>{
    //making iteratable
    // let data_list = Array.from(document.querySelectorAll(".simulation-data-list > li > b"));
    // let success_rate = data_list.find(e=> e.getAttribute('data-success-rate'));

    let result = {
        success_rate : Math.round(choiceChanged()),
        door_count:3,
        choiceChanged:true
    }
    simulationBox(result);
})
function choiceChanged(simuCount = 1000){
    let wins = 0;
    for(let i=0;i<simuCount;i++){
        const simuDoors = [
            { value: 0, selected: false },
            { value: 0, selected: false },
            { value: 0, selected: false },
        ];
    
        // Place the prize behind a random door
        const prizeDoor = Math.floor(Math.random() * 3);
        simuDoors[prizeDoor].value = 1;
    
        // Player's initial random choice
        let initialChoice = Math.floor(Math.random() * 3);
        simuDoors[initialChoice].selected = true;
    
        let untouchedDoor = simuDoors.indexOf(simuDoors.find(e=> e.value != 1 && e.selected == false));
        let selectedDoor = simuDoors.indexOf(simuDoors.find(e=> e.selected == true));
        simuDoors[selectedDoor].selected = false;
        let doorToSwitch = simuDoors.length - (untouchedDoor + selectedDoor);
        simuDoors[doorToSwitch].selected = true;

        let theDoor;
        if (theDoor = simuDoors.find(door => door.value == 1 && door.selected == true)) {
            wins++;
        }

    }
    //return the wins by percentage
    return (wins/simuCount) * 100;
}
//to add a box to ui
function simulationBox(data){
    let {success_rate,door_count,choice_changed} = data;

    let parent_container = document.createElement('div');
    parent_container.classList.add("simulation-result");
    let title = document.createElement('h2');
    title.textContent = "Monty Hall Simulation";
    parent_container.append(title);
    let data_list = document.createElement('ul');
    data_list.classList.add("simulation-data-list");
    parent_container.append(data_list);
    //making a li component for Each data variable
    let list_success_rate = document.createElement('li');
    list_success_rate.dataset.successRate = success_rate;
    list_success_rate.textContent =  `Success Rate:${list_success_rate.dataset.successRate}%`;
    data_list.append(list_success_rate);
    //
    let list_door_count = document.createElement('li');
    list_door_count.dataset.doorCount = door_count;
    list_door_count.textContent = `Door Count:${list_door_count.dataset.doorCount}`;
    data_list.append(list_door_count);
    //
    let list_choice_changed = document.createElement('li');
    list_choice_changed.dataset.choiceChanged = choice_changed;
    list_choice_changed.textContent = `Changed The Initial Choice:${list_choice_changed.dataset.choiceChanged ? "Yes" : "No"}`;
    data_list.append(list_choice_changed);


    //the nail to the coffin(nah, i'd win)
    main_body.insertBefore(parent_container,main_body.children[1]);
}