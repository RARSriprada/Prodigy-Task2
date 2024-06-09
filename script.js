let timer;
let isRunning = false;
let [minutes, seconds, milliseconds] = [0, 0, 0];
let laps = [];

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTime, 10);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    [minutes, seconds, milliseconds] = [0, 0, 0];
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.getElementById('milliseconds').innerText = '00';
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        laps.push(lapTime);
        displayLaps();
    }
}

function updateTime() {
    milliseconds += 1;
    if (milliseconds == 100) {
        milliseconds = 0;
        seconds += 1;
        if (seconds == 60) {
            seconds = 0;
            minutes += 1;
        }
    }
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
    document.getElementById('milliseconds').innerText = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function displayLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}
