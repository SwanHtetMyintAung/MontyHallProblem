const doors = document.querySelectorAll("div.door");
const revealButton = document.querySelector("#reveal");
const messageText = document.querySelector("#message")

const random = Math.floor(Math.random()*3);
doors[random].childNodes[0].textContent = "1";
let initiated = false;
let leftOverDoors = [];
const startBtn = document.querySelector(".start-exp");



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
for(door of doors){
    if(door.childNodes[0].textContent != "1"){
        door.childNodes[0].textContent = "0"
    }
    door.addEventListener('click',(event)=>{
        if(initiated || event.target.classList.contains("door")){
            return;
        }
        // const value_placeholder = event.target.previousSibling;
        // value_placeholder.classList.remove("d-none");
        event.target.classList.add('selected');
        initiated = true;
        let i=0;
        let thePrizeDoor;
        for(leftdoor of doors){
            if(leftdoor.childNodes[1].classList.contains('selected')){
                continue;
            }
            if(leftdoor.childNodes[0].innerText == "1"){
                thePrizeDoor = i;
                console.log('found it')
            }
            leftOverDoors[i++] = leftdoor;
            
        }   

        revealOneDoor(thePrizeDoor);
    })
}

function revealOneDoor(doorWithPrize){
    let i=0;
    for(i=0;i<leftOverDoors.length;i++){
        if(i != doorWithPrize){
            leftOverDoors[i].childNodes[0].classList.remove('d-none');
            break;
        }
    }
    setTimeout(()=>promptToSwitch(i),2000);
}

function promptToSwitch(i){
    const answer = confirm("Do you wanna switch the door")
    if(!answer){
        revealButton.classList.remove("d-none");
        return;
    }
    let doorToSwitch = Array.from(doors).find(ele => {
        //return ele.childNodes[0].classList.contains('d-none') && !ele.childNodes[1].classList.contains('selected')
        return !ele.childNodes[1].classList.contains('selected') && ele.childNodes[0].classList.contains('d-none')
    })
    let previousDoor = Array.from(doors).find(ele => ele.childNodes[1].classList.contains('selected'))
    previousDoor.childNodes[1].classList.remove('selected');
    console.log(doorToSwitch)
    doorToSwitch.childNodes[1].classList.add('selected');

    revealButton.classList.remove("d-none");
    
}

revealButton.addEventListener('click',(event)=>{
    for(door of doors){
        door.childNodes[0].classList.remove('d-none');
    }
    let selectedDoor = Array.from(doors).find(ele => ele.childNodes[1].classList.contains('selected'))
    let doorWithPrize = Array.from(doors).find(ele => ele.childNodes[0].innerText.includes('1'))
    if(selectedDoor == doorWithPrize){
        messageText.textContent = "you are a winner";
    }else{
        messageText.textContent = "better luck next time";
    }
})
startBtn.addEventListener('click',(event)=>{
    choiceChanged()
})
function choiceChanged(simuCount = 1000){
    let wins = 0;
    //run the simulation 100 times
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
            //console.log(theDoor)
        }

    }
    console.log((wins/simuCount)*100+"%")
}

