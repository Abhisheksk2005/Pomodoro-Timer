let workDuration = 25;
let breakDuration = 5;
let isWorking = true;
let isRunning = false;
let timeLeft = workDuration * 60;
let completedSessions = 0;
let timerInterval;

const timerDisplay = document.getElementById('timer-display');
const progressBar = document.getElementById('progress-bar');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const sessionCounter = document.getElementById('session-counter');

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  progressBar.value = timeLeft;
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    resetBtn.disabled = false;
  } else {
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    resetBtn.disabled = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        if (isWorking) {
          completedSessions++;
          sessionCounter.textContent = `Completed Sessions: ${completedSessions}`;
        }
        isWorking = !isWorking;
        timeLeft = (isWorking ? workDuration : breakDuration) * 60;
        updateTimerDisplay();
        startPauseTimer();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isWorking = true;
  timeLeft = workDuration * 60;
  updateTimerDisplay();
  startPauseBtn.textContent = 'Start';
  resetBtn.disabled = false;
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);

document.getElementById('work-duration').addEventListener('change', function() {
  workDuration = parseInt(this.value);
  if (isWorking) {
    timeLeft = workDuration * 60;
    updateTimerDisplay();
  }
});

document.getElementById('break-duration').addEventListener('change', function() {
  breakDuration = parseInt(this.value);
  if (!isWorking) {
    timeLeft = breakDuration * 60;
    updateTimerDisplay();
  }
});

updateTimerDisplay();
