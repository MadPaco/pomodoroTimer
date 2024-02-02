let timer = document.querySelector('#timer');
let startButton = document.querySelector('#start');
let stopButton = document.querySelector('#stop')
let resumeButton = document.querySelector('#resume')
const MILLISECONDS_PER_MINUTE = 60000;
let pomodoroTime = 25;
let intervallID;
let startTime = new Date();
let savedDifference;
let difference;

startButton.addEventListener('click', ()=>{
    let endTime = new Date(startTime.getTime() + (pomodoroTime * MILLISECONDS_PER_MINUTE))
    difference = getDateDifferenceInSeconds(startTime, endTime);
    intervallID = setInterval(()=>{
        timer.innerHTML = Math.floor(difference/60) + ':' + (difference % 60);
        difference--;
        if (difference <= 0) {
            clearInterval(intervalID); 
            timer.innerHTML = 'Time for a break.';
        }
    }, 1000);
}, { once: true });

stopButton.addEventListener('click', ()=>{
    savedDifference = difference;
    clearInterval(intervallID);
});



function getDateDifferenceInSeconds(begin, end){
    return (end - begin) /1000;
}
