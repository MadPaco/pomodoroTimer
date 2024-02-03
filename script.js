let timer = document.querySelector('#timer');
let startButton = document.querySelector('#start');
let stopButton = document.querySelector('#stop');
let resetButton = document.querySelector('#reset');
const MILLISECONDS_PER_MINUTE = 60000;
let pomodoroTime = 25;
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





function getDateDifferenceInSeconds(begin, end){
    return (end - begin) /1000;
}
