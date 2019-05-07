
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


function clearSquare(x, y, diffX, diffY) {
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

function clearClockHand(hand) {
    if (hand.lastEndPosition != null) {
        let diffX = hand.lastEndPosition.x - hand.startPosition.x;
        let diffY = hand.lastEndPosition.y - hand.startPosition.y;
        clearSquare(hand.startPosition.x, hand.startPosition.y, diffX, diffY);
    }
}

function drawHand(hand) {
    ctx.lineWidth = handThickness;
    let pos = getCirclePositionByAngle(
        hand.startPosition.x,
        hand.startPosition.y,
        hand.currentValue + 270);
    hand.lastEndPosition = pos;
    ctx.beginPath();
    ctx.moveTo(hand.startPosition.x, hand.startPosition.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function redrawHands(clock) {
    if (clock.redraw) {
        clock.hand.forEach(hand => {
            clearClockHand(hand);
        });
        clock.hand.forEach(hand => {
            drawHand(hand);
        });
        clock.redraw = false;
    }
}


function drawBorder() {
    for (let i = 0; i < clocksHorizontal; i++) {
        clocks[i][j].setHourSetpoint(225);
        clocks[i][clocksVertical - 1]
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
    characterInfos.forEach(clockInfo => {
        clocks[clockInfo.x + x][clockInfo.y + y].setHourSetpoint(clockInfo.hour);
        clocks[clockInfo.x + x][clockInfo.y + y].setMinuteSetpoint(clockInfo.minute);
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
                redrawHands(clock);
            });
        });
    }, 50);

    //drawBorder();
    setInterval(function () {
        drawCharacter(1, 1, example)
        drawCharacter(4, 1, example)
        drawCharacter(8, 1, example)
        drawCharacter(11, 1, example)
        example++;
        if (example > 9) {
            example = 0;
        }


    }, 8000);


}, false);

let example = 0;