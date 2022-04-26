// Elements

ticks = document.getElementById('ticks')
button = document.getElementById('button')
audio = document.getElementById('audio')

// Global variables

clock = undefined
value = undefined

// Functions

function launchMetronome(event) {
    button.removeEventListener("click", launchMetronome);

    value = ticks.value; // interval in ns
    clock = setInterval(beep, getIntervalNs(value));

    button.innerText = "Stop";
    button.addEventListener("click", stopMetronome);
    console.log("added")
}

function stopMetronome(event) {
    button.removeEventListener("click", stopMetronome);

    clearInterval(clock);
    clock = undefined;
    value = undefined;

    button.innerText = "Start";
    button.addEventListener("click", launchMetronome);
}

function beep() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

// Utils

function getIntervalNs(ticks) {
    return Math.floor((60 / ticks) * 1000)
}

// Event listeners

button.addEventListener("click", launchMetronome);