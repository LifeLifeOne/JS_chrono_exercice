'use strict'

/************************* DATA *************************/
let chronoDisplay, startButton, resetButton, timeOut_Id;
let chrono = {
    minutes: 0,
    seconds: 0,
    cents: 0
}

/************************* FUNCTIONS *************************/
/**
 * Update the chrono and display it
 */
function updateChrono() {

    chrono.cents++;
    if (chrono.cents > 99) {
        chrono.seconds++;
        chrono.cents = 0;
    }
    if (chrono.seconds > 59) {
        chrono.minutes++;
        chrono.seconds = 0;
    }

    chronoDisplay.innerText = `${(chrono.minutes < 10) ? '0' + chrono.minutes : chrono.minutes} : ${(chrono.seconds < 10) ? '0' + chrono.seconds : chrono.seconds
        } : ${(chrono.cents < 10) ? '0' + chrono.cents : chrono.cents}`;

    // update chrono every second
    timeOut_Id = setTimeout(updateChrono, 1);
}

/**
 * Start / Stop the chrono
 */
function onClickStartButton() {

    switch (startButton.innerText) {

        case 'start':
            updateChrono();
            startButton.innerText = 'stop';
            startButton.classList.remove('btn-info');
            startButton.classList.add('btn-danger');
            chronoDisplay.style.border = '1px solid lightgreen';
            break;

        case 'stop':
            clearTimeout(timeOut_Id);
            startButton.innerText = 'start';
            startButton.classList.remove('btn-danger');
            startButton.classList.add('btn-info');
            chronoDisplay.style.border = '1px solid lightgray';
            break;

        default:
            break;
    }

}

/**
 * Reset the chrono
 */
function onClickResetButton() {

    clearTimeout(timeOut_Id);
    chrono.minutes = 0;
    chrono.seconds = 0;
    chrono.cents = 0;

    chronoDisplay.innerHTML = '00 : 00 : 00';
    startButton.innerText = 'start';
    startButton.classList.remove('btn-danger');
    startButton.classList.add('btn-info');
    chronoDisplay.style.border = '1px solid lightgray';
    timeOut_Id = null;
}

/**
 * Main function of the script
 */
function init() {
    chronoDisplay = document.querySelector("#chrono");
    startButton = document.querySelector("#start");
    resetButton = document.querySelector("#reset");
    startButton.addEventListener("click", onClickStartButton);
    resetButton.addEventListener("click", onClickResetButton);
}

/************************* MAIN *************************/
document.addEventListener("DOMContentLoaded", init);