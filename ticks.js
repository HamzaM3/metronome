const value_element = document.getElementById('value')
const button = document.getElementById('button')
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')

let expected_time = undefined;
let ticks = 40;

let clock = undefined
let interval = undefined
let playing = false

let pushed = undefined;

// Change the value

function increment_ticks() {
    ticks++;
    value_element.innerHTML = ticks
}

function decrement_ticks() {
    ticks--;
    value_element.innerHTML = ticks
}

plus.addEventListener('click', increment_ticks)
minus.addEventListener('click', decrement_ticks)

// Actual metronome

function bpm_to_ms(ticks) {
    return Math.floor((60 / ticks) * 1000)
}

async function beep() {
    let audio = new Audio("./tick.mp3")
    audio.play();
}

function callback_the_beep() {
    if (!playing) return;

    interval = bpm_to_ms(ticks);
    expected_time = expected_time + interval;
    clock = setTimeout(callback_the_beep, expected_time - Date.now());

    beep();
}

function start_metronome() {
    interval = bpm_to_ms(ticks)
    expected_time = Date.now() + interval;
    playing = true

    clock = setTimeout(callback_the_beep, interval);
    button.innerText = "Stop";
}

function stop_metronome() {
    playing = false;

    clearTimeout(clock);
    clock = undefined;
    interval = undefined;
    button.innerText = "Start";
}

button.addEventListener('click', () => {
    if (playing) stop_metronome();
    else start_metronome()
})