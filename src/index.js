const BASE_URL = 'http://localhost:3000'
window.addEventListener("keydown", function(e) {
    if ([13, 37, 38, 39, 40].indexOf(e.key) > -1){
        e.preventDefault(); // arrow keys and enter
    }
}, false);
const context = document.querySelector("canvas").getContext("2d")
context.canvas.height = 800
context.canvas.width = 1200 //same aspect ratio as GBA. might switch to GB