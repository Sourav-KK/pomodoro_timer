let workTitle = document.getElementById("work");
let breakTitle = document.getElementById("break");
let resetBtn = document.getElementById("resetBtn");
let errMesssage = document.getElementById("errMesssage");

let playIcon = document.getElementById("play-icon");
let pauseIcon = document.getElementById("pause-icon");
let resetIcon = document.getElementById("reset-icon");

let workTime = 25;
let breakTime = 5;
let seconds = "00";

let isTimerActive = false;
let currentInterval = null;

window.onload = () => {
  initialState();
};

function initialState() {
  workTime = 25;
  seconds = "00";
  breakTime = 5;

  isTimerActive = false;
  currentInterval = null;

  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = seconds;

  workTitle.classList.add("active");
  breakTitle.classList.remove("active");

  document.getElementById("start").style.display = "block";
  document.getElementById("pause").style.display = "none";
  errMesssage.style.display = "none";
}

// Function to format time as two digits
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// start timer
function startTimer() {
  // change button
  document.getElementById("start").style.display = "none";
  document.getElementById("pause").style.display = "block";

  // change Time
  seconds = 59;

  let workMinutes = workTime - 1;
  let breakMinutes = breakTime - 1;

  let breakCount = 0;

  //   countdown
  let timerFunction = () => {
    document.getElementById("minutes").innerHTML = workMinutes;
    document.getElementById("seconds").innerHTML = seconds;

    // start
    seconds--;

    isTimerActive = true;
    errMesssage.style.display = "none";
    if (seconds === 0 && workMinutes === 5) {
      audioNotification("./assets/halfTime.wav");
    }
    if (seconds === -1) {
      workMinutes--;
      if (workMinutes === -1) {
        if (breakCount % 2 === 0) {
          audioNotification("./assets/time-up.wav");
          // start break
          workMinutes = breakMinutes;
          breakCount++;

          // change panel
          workTitle.classList.remove("active");
          breakTitle.classList.add("active");
        } else {
          // continue work
          workMinutes = workTime;
          breakCount++;

          // change panel
          breakTitle.classList.remove("active");
          workTitle.classList.add("active");
        }
        seconds = 59;
      } else {
        seconds = 59;
      }
      seconds = 59;
    }
  };

  // start countdown
  currentInterval = setInterval(timerFunction, 1000);
}

// Pause timer (add this function if you want to pause the timer)
function pauseTimer() {
  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
    document.getElementById("start").style.display = "block";
    document.getElementById("pause").style.display = "none";
  } else {
    return;
  }
}

function resetTimer() {
  if (isTimerActive) {
    if (currentInterval !== null) {
      clearInterval(currentInterval);
      currentInterval = null;
    }
    initialState();
  } else {
    isTimerActive = false;

    errMesssage.style.display = "block";
    errMesssage.innerText = "Please active the timer first";
  }
}

function audioNotification(url) {
  let audio = new Audio(url);
  audio.play();
}
