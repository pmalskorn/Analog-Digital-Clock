
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
        clock.hands.forEach(hand => {
            clearClockHand(hand);
        });
        clock.hands.forEach(hand => {
            drawHand(hand);
        });
        clock.redraw = false;
    }
}

function drawBorder() {
    for (let i = 0; i < clocksHorizontal; i++) {
        clocks[i][0].setBothSetpoints(225);
        clocks[i][clocksVertical - 1].setBothSetpoints(225);
    }
    for (let i = 0; i < clocksVertical; i++) {
        clocks[0][i].setBothSetpoints(225);
        clocks[(clocksHorizontal - 1) / 2][i].setBothSetpoints(225);
        clocks[clocksHorizontal - 1][i].setBothSetpoints(225);
    }

}

function allClocksReady() {
    let allReady = true;
    clocks.forEach(verticalRow => {
        verticalRow.forEach(clock => {
            if (clock.state != CLOCK_STATE.READY) {
                allReady = false;
            }
        });
    });
    return allReady;
}

function drawTime() {
    drawBorder();
    let time = new Date().toLocaleTimeString("de").split(":");
    let hh = time[0];
    let mm = time[1];
    drawCharacter(1, 1, hh.charAt(0));
    drawCharacter(4, 1, hh.charAt(1));
    drawCharacter(8, 1, mm.charAt(0));
    drawCharacter(11, 1, mm.charAt(1));
}

function animation1() {
    if (prepare) {
        clocks.forEach(verticalRow => {
            verticalRow.forEach(clock => {
                clock.setHourSetpoint(0);
                clock.setMinuteSetpoint(180);
                clock.redraw = true;
            });
        });
        prepare = false;
    } else {
        clocks.forEach((verticalRow, i) => {
            verticalRow.forEach((clock, j) => {
                clock.setHourPosition(clock.getHourSetpoint() + Math.log10(i + j + 1));
                clock.setMinutePosition(clock.getMinuteSetpoint() + Math.log10(i + j + 1));
                clock.redraw = true;
            });
        });
    }
}

function animation2() {
    if (prepare) {
        clocks.forEach((verticalRow, i) => {
            verticalRow.forEach((clock, j) => {
                if (i % 2 == 0 && j % 2 == 0) {
                    clock.setHourSetpoint(90);
                    clock.setMinuteSetpoint(180);
                }
                if (i % 2 == 1 && j % 2 == 0) {
                    clock.setHourSetpoint(180);
                    clock.setMinuteSetpoint(270);
                }
                if (i % 2 == 0 && j % 2 == 1) {
                    clock.setHourSetpoint(0);
                    clock.setMinuteSetpoint(90);
                }
                if (i % 2 == 1 && j % 2 == 1) {
                    clock.setHourSetpoint(0);
                    clock.setMinuteSetpoint(270);
                }
            });
        });
        prepare = false;
    } else {
        clocks.forEach((verticalRow, i) => {
            verticalRow.forEach((clock, j) => {
                if (i % 2 == 0 && j % 2 == 0 || i % 2 == 1 && j % 2 == 1) {
                    clock.setHourPosition(clock.getHourSetpoint() + 2);
                    clock.setMinutePosition(clock.getMinuteSetpoint() + 2);
                    clock.redraw = true;
                }
                if (i % 2 == 0 && j % 2 == 1 || i % 2 == 1 && j % 2 == 0) {
                    clock.setHourPosition(clock.getHourSetpoint() - 2);
                    clock.setMinutePosition(clock.getMinuteSetpoint() - 2);
                    clock.redraw = true;
                }
            });
        });
    }
}

function drawCharacter(x, y, char) {
    let characterInfos = CHARACTERS[char];
    characterInfos.forEach(clockInfo => {
        clocks[clockInfo.x + x][clockInfo.y + y].setHourSetpoint(clockInfo.hour);
        clocks[clockInfo.x + x][clockInfo.y + y].setMinuteSetpoint(clockInfo.minute);
    });
}


const STATE = {
    TIME: 0,
    ANIMATION_1: 1,
    ANIMATION_2: 2
}

let currentState = STATE.TIME;
let prepare = true;

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
    console.log("created");



    setInterval(function () {
        if (allClocksReady()) {
            switch (currentState) {
                case STATE.TIME:
                    drawTime();
                    break;
                case STATE.ANIMATION_1:
                    animation1();
                    break;
                case STATE.ANIMATION_2:
                    animation2();
                    break;
            }
        }
        clocks.forEach(verticalRow => {
            verticalRow.forEach(clock => {
                redrawHands(clock);
                clock.tick();
            });
        });
    }, 50);

    setInterval(function () {
        currentState = (currentState + 1) % 3;
        prepare = true;
    }, 30000);

}, false);
