// Elements

ticks = document.getElementById('ticks')
button = document.getElementById('button')


// Global variables

let clock = undefined
let interval = undefined
let playing = false

let expected_time = 0;

// Functions

function launchMetronome(event) {
    button.removeEventListener("click", launchMetronome);

    interval = getIntervalNs(ticks.value);
    playing = true;
    
    expected_time = Date.now() + interval;

    beep();

    clock = setTimeout(callbacking(beep), interval);

    button.innerText = "Stop";
    button.addEventListener("click", stopMetronome);
}

function stopMetronome(event) {
    playing = false;
    button.removeEventListener("click", stopMetronome);

    clearTimeout(clock);
    clock = undefined;
    interval = undefined;

    button.innerText = "Start";
    button.addEventListener("click", launchMetronome);
}

function callbacking(func) {
    return () => {
        if (!playing) return;

        interval = getIntervalNs(ticks.value);
        expected_time = expected_time + interval
        clock = setTimeout(callbacking(beep), expected_time - Date.now());

        func();
    }
}

async function beep() {
    let audio = new Audio("./beep.mp3")
    audio.play();
}

// Utils

function getIntervalNs(ticks) {
    return Math.floor((60 / ticks) * 1000)
}

// Event listeners

button.addEventListener("click", launchMetronome);



