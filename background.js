'use strict'

//---------
// Aliases
//---------
const { event, menu, mpv, overlay } = iina

//-----------
// Variables
//-----------
let timer = '' // will become a setInterval timer that will be cleared after we no longer need it

//--------
// Events
//--------
event.on("iina.plugin-overlay-loaded", () => {
    // show the overlay only after the WebView has fully loaded
    overlay.show()
}) // event.on -> iina.plugin-overlay-loaded

event.on("iina.window-did-close", () => {
    clearInterval(timer)
}) // event.on -> iina.window-did-close

event.on("iina.window-loaded", () => {
    overlay.loadFile("ui/overlay.html")
    overlay.setClickable(true)

    timer = setInterval(() => {
        const frameNumber = mpv.getNumber("estimated-frame-number")

        overlay.postMessage("progress-update", { frameNumber })
    }, 100)

    menu.addItem(
        menu.item("Show", () => {
            overlay.show()
        })
    ) // addItem

    menu.addItem(
        menu.item("Hide", () => {
            overlay.hide()
        })
    ) // addItem
}) // event.on -> iina-window-loaded