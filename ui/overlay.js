'use strict'

//-----------
// Variables
//-----------
const overlay = document.getElementById("overlay")
const display = document.getElementById("frame-number")

//-----------
// Functions
//-----------
const copyNumber = function copyNumber(e) {
    e.stopPropagation()
    navigator.clipboard.writeText(display.dataset.frameNumber)
} // copyNumber

//--------
// Events
//--------
overlay.addEventListener('click', copyNumber)
display.addEventListener('click', copyNumber)

iina.onMessage("progress-update", ({ frameNumber }) => {
    display.dataset.frameNumber = frameNumber
    display.textContent = frameNumber.toLocaleString()
})