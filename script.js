// script.js

let startTime, updatedTime, difference, tInterval;
let isRunning = false;
let isPaused = false;
let savedTimesContainer = document.getElementById("savedTimes");

function startTimer() {
  if (!isRunning) {
    if (isPaused) {
      startTime = new Date().getTime() - difference;
      isPaused = false;
    } else {
      startTime = new Date().getTime();
    }
    tInterval = setInterval(getShowTime, 1);
    isRunning = true;
    document.getElementById("pauseBtn").innerText = "Pause";
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(tInterval);
    isPaused = true;
    isRunning = false;
    document.getElementById("pauseBtn").innerText = "Play";
  } else if (isPaused) {
    startTimer();
  }
}

function stopTimer() {
  if (isRunning || isPaused) {
    clearInterval(tInterval);
    isRunning = false;
    isPaused = false;
    document.getElementById("pauseBtn").innerText = "Pause";
    showDialog();
  }
}

function resetTimer() {
  clearInterval(tInterval);
  isRunning = false;
  isPaused = false;
  document.getElementById("hours").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  document.getElementById("seconds").innerText = "00";
  document.getElementById("milliseconds").innerText = "000";
  document.getElementById("pauseBtn").innerText = "Pause";
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor(difference % 1000);

  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText =
    seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("milliseconds").innerText =
    milliseconds < 100 ? "0" + milliseconds : milliseconds;
}

function showDialog() {
  document.getElementById("dialogBox").style.display = "flex";
}

function hideDialog() {
  document.getElementById("dialogBox").style.display = "none";
}

function saveTime() {
  let title = document.getElementById("titleInput").value;
  if (title) {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${title}</strong>: ${
      document.getElementById("hours").innerText
    }:${document.getElementById("minutes").innerText}:${
      document.getElementById("seconds").innerText
    }.${document.getElementById("milliseconds").innerText}`;
    savedTimesContainer.appendChild(card);
  }
  hideDialog();
  resetTimer();
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("saveBtn").addEventListener("click", saveTime);
document.getElementById("cancelBtn").addEventListener("click", hideDialog);
