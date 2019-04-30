const clocksHorizontal = 15;
const clocksVertical = 8;
const clockWidth = Math.floor((window.innerWidth - 20) / clocksHorizontal);
let clockHeight = 0;

document.addEventListener('DOMContentLoaded', () => {

    if (clockWidth * 8 <= window.innerHeight) {
        clockHeight = clockWidth;
    } else {
        console.log("window not heigh enough !!!")
    }
    const canvasWidth = clocksHorizontal * clockWidth;
    const canvasHeight = clocksVertical * clockHeight;
    console.log(canvasHeight )

    var c = document.getElementById("myCanvas");
    c.width = canvasWidth;
    c.height = canvasHeight;
    c.style.width = c.width + "px";
    c.style.height = c.height + "px";
    var ctx = c.getContext("2d");
    ctx.moveTo(84, 0);
    ctx.lineTo(84, 84);
    ctx.lineTo(0, 84);
    ctx.stroke();

    //console.log(clockHeight);
}, false);