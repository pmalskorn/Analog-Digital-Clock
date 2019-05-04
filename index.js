const clocksHorizontal = 15;
const clocksVertical = 8;
const clockBorderThickness = 3;
const clockpadding = 5;
const handThickness = 3
const handpadding = 7;

let clockWidth;
let clockHeight;
let clockRadius;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let clocks = createArray(clocksHorizontal, clocksVertical);


function clearHand(x, y, diffX, diffY) {
    if (diffX >= 0 && diffY >= 0) {
        ctx.clearRect(x - handThickness, y - handThickness, diffX + handThickness * 2, diffY + handThickness * 2);
    } else if (diffX <= 0 && diffY >= 0) {
        ctx.clearRect(x + handThickness, y - handThickness, diffX - handThickness * 2, diffY + handThickness * 2);
    } else if (diffX <= 0 && diffY <= 0) {
        ctx.clearRect(x + handThickness, y + handThickness, diffX - handThickness * 2, diffY - handThickness * 2);
    } else if (diffX >= 0 && diffY <= 0) {
        ctx.clearRect(x - handThickness, y + handThickness, diffX + handThickness * 2, diffY - handThickness * 2);
    }
}

function clearClockHands(clock) {
    if (clock.lastHourPos != undefined && clock.lastMinutePos != undefined) {
        let diffX = clock.lastHourPos.x - clock.x;
        let diffY = clock.lastHourPos.y - clock.y;
        clearHand(clock.x, clock.y, diffX, diffY);
        diffX = clock.lastMinutePos.x - clock.x;
        diffY = clock.lastMinutePos.y - clock.y;
        clearHand(clock.x, clock.y, diffX, diffY);
    }
}

function getCirclePositionByAngle(x, y, angle) {
    let retx = x + (clockRadius - handpadding) * Math.cos(angle * Math.PI / 180);
    let rety = y + (clockRadius - handpadding) * Math.sin(angle * Math.PI / 180);
    return { x: retx, y: rety };
}

function drawHands(clock, hoursAngle, minutesAngle) {
    //offset for starting so 0 degree is the top
    hoursAngle += 270;
    minutesAngle += 270;

    ctx.lineWidth = handThickness;
    let hour = getCirclePositionByAngle(clock.x, clock.y, hoursAngle);
    let minute = getCirclePositionByAngle(clock.x, clock.y, minutesAngle);
    clock.lastHourPos = hour;
    clock.lastMinutePos = minute;
    ctx.beginPath();
    ctx.moveTo(clock.x, clock.y);
    ctx.lineTo(hour.x, hour.y);
    ctx.moveTo(clock.x, clock.y);
    ctx.lineTo(minute.x, minute.y);
    ctx.stroke();
}

function drawCircle(x, y) {
    ctx.lineWidth = clockBorderThickness;
    ctx.beginPath();
    ctx.arc(x, y, clockRadius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawClocks() {
    for (let i = 0; i < clocksHorizontal; i++) {
        for (let j = 0; j < clocksVertical; j++) {
            let x = clockWidth / 2 + i * clockWidth;
            let y = clockWidth / 2 + j * clockWidth;
            drawCircle(x, y);
            clocks[i][j] = new Clock(x, y);
        }
    }
    console.log(clocks.length)
}

function drawBorder() {
    for (let i = 0; i < clocksHorizontal; i++) {
        drawHands(clocks[i][0], 225, 225);
        drawHands(clocks[i][clocksVertical - 1], 225, 225);
    }
    for (let i = 0; i < clocksVertical; i++) {
        drawHands(clocks[0][i], 225, 225);
        drawHands(clocks[(clocksHorizontal - 1) / 2][i], 225, 225);
        drawHands(clocks[clocksHorizontal - 1][i], 225, 225);
    }
}

function drawCharacter(x, y, char) {
    let characterInfos = CHARACTERS[char];
    characterInfos.forEach(clock => {
        drawHands(clocks[clock.x + x][clock.y + y], clock.hour, clock.minute);
    });
}


document.addEventListener('DOMContentLoaded', () => {

    clockWidth = Math.floor((window.innerWidth - 20) / clocksHorizontal);
    if (clockWidth * 8 <= window.innerHeight) {
        clockHeight = clockWidth;
    } else {
        clockHeight = Math.floor((window.innerHeight - 20) / clocksVertical);
        clockWidth = clockHeight;
    }
    clockRadius = (clockWidth / 2) - clockpadding;

    const canvasWidth = clocksHorizontal * clockWidth;
    const canvasHeight = clocksVertical * clockHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    drawClocks();

    drawCharacter(1, 1, 1);
    drawCharacter(4, 1, 2);
    drawCharacter(8, 1, 3);
    drawCharacter(11, 1, 0);
    drawBorder();


}, false);