let countdown;
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timerDisplay');

// Start button event listener
startButton.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value, 10) || 0;
    const minutes = parseInt(minutesInput.value, 10) || 0;
    const seconds = parseInt(secondsInput.value, 10) || 0;

    const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (totalMilliseconds <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    startCountdown(totalMilliseconds);
});

// Reset button event listener
resetButton.addEventListener('click', () => {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00:00:000";
    resetButton.classList.add('hidden');
    startButton.disabled = false;
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
});

// Function to start the countdown
function startCountdown(milliseconds) {
    clearInterval(countdown);
    const endTime = Date.now() + milliseconds;

    countdown = setInterval(() => {
        const remainingTime = endTime - Date.now();

        if (remainingTime <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00:00:000";
            alert("Time's Up!");
            resetButton.classList.remove('hidden');
            startButton.disabled = false;
        } else {
            timerDisplay.textContent = formatTime(remainingTime);
        }
    }, 10);

    startButton.disabled = true;
    resetButton.classList.remove('hidden');
}

// Function to format the time
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(3, '0')}`;
}
