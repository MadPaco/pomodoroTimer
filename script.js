const timer = document.querySelector('#timer');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const hornSound = new Audio('./media/sounds/fog-horn.mp3')
const MILLISECONDS_PER_MINUTE = 60000;
//declaring pomodoroTime as a let to add the option
//to change the time via dropdown later down the road
let pomodoroTime = 0.1; 
let intervalID;
let endTime;
let savedDifference = null;
let difference = null; 
let timerIsRunning = false;

startButton.addEventListener('click', ()=>{
    if (!timerIsRunning){
        timerIsRunning = true;
        let startTime = new Date();
        if (savedDifference != null){
            endTime = new Date(startTime.getTime() + (savedDifference * MILLISECONDS_PER_MINUTE))
            difference = savedDifference;
            savedDifference = null;
        }
        else{  
            endTime = new Date(startTime.getTime() + (pomodoroTime * MILLISECONDS_PER_MINUTE))
            difference = getDateDifferenceInSeconds(startTime, endTime);
        }
        
        intervalID = setInterval(()=>{
            --difference; //this avoids displaying 25:00 twice
            let minutes = Math.floor(difference / 60);
            let seconds = difference % 60;
            timer.innerHTML = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
            if (difference <= 0) {
                playSound();
                clearInterval(intervalID); 
                timer.innerHTML = 'Time for a break.';
                timerIsRunning = false;
            }
        }, 1000);
    }
});

stopButton.addEventListener('click', ()=>{
    savedDifference = difference;
    clearInterval(intervalID);
    timerIsRunning = false;
});

resetButton.addEventListener('click', ()=>{
    savedDifference = null;
    difference = null; 
    timerIsRunning = false;
    timer.innerHTML = pomodoroTime + ':00';
});

function getDateDifferenceInSeconds(begin, end){
    return (end - begin) /1000;
}

let soundRepititions = 0;
const maxSoundRepetitions = 2;

function playSound() {
    if (soundRepititions < maxSoundRepetitions) {
        hornSound.play();
        soundRepititions++;
        hornSound.onended = () => {
            playSound();
        };
    }
}