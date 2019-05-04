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

function drawHands(clock) {
    ctx.lineWidth = handThickness;

    // 270 offset for starting so 0 degree is the top
    let hour = getCirclePositionByAngle(clock.x, clock.y, clock.currentValueHour + 270);
    let minute = getCirclePositionByAngle(clock.x, clock.y, clock.currentValueMinute + 270);
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
        clocks[i][0].setpointHour = 225;
        clocks[i][0].setpointMinute = 225;
        clocks[i][clocksVertical - 1].setpointHour = 225;
        clocks[i][clocksVertical - 1].setpointMinute = 225;
    }
    for (let i = 0; i < clocksVertical; i++) {
        clocks[0][i].setpointHour = 225;
        clocks[(clocksHorizontal - 1) / 2][i].setpointHour = 225;
        clocks[clocksHorizontal - 1][i].setpointHour = 225;
        clocks[0][i].setpointMinute = 225;
        clocks[(clocksHorizontal - 1) / 2][i].setpointMinute = 225;
        clocks[clocksHorizontal - 1][i].setpointMinute = 225;
    }
}

function drawCharacter(x, y, char) {
    let characterInfos = CHARACTERS[char];
    characterInfos.forEach(clock => {
        clocks[clock.x + x][clock.y + y].setpointHour = clock.hour;
        clocks[clock.x + x][clock.y + y].setpointMinute = clock.minute;
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

    setInterval(function () {
        clocks.forEach(verticalRow => {
            verticalRow.forEach(clock => {
                clearClockHands(clock);
                drawHands(clock)
            });
        });
    }, 100);

    setInterval(function () {

        drawCharacter(1, 1, example)
        drawCharacter(4, 1, example)
        drawCharacter(8, 1, example)
        drawCharacter(11, 1, example)
        drawBorder();
        example++;
        if (example > 9) {
            example = 0;
        }


    }, 8000);


}, false);

let example = 0;