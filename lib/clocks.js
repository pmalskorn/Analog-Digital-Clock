const CLOCK_DELAY = 100;
const STEPS_AT_CLOCKTICK = 6;
const ANGLE_OFFSET = 270;

const CLOCK_STATE = {
    READY: 1,
    IN_CONTROL: 2,
    IN_ANIMATION: 3
}

let Clock = class {
    constructor(x, y) {
        //postion in canvas
        this.x = x;
        this.y = y;
        this.hands = {
            hour:{
                setpoint: 0,
                currentValue: 0,
                lastPosition: null,
                redraw : true
            },
            minute:{
                setpoint: 0,
                currentValue: 0,
                lastPosition: null,
                redraw : true
            }
        }
        //last position of hands for deletion
        this.lastHourPos;
        this.lastMinutePos;
        //values for hands movement
        this.setpointHour = 0;
        this.setpointMinute = 0;
        this.currentValueHour = 0;
        this.currentValueMinute = 0;
        //State
        this.state = CLOCK_STATE.READY;
        this.redraw = true;

        setInterval(function () {
            this.tick();
        }.bind(this), CLOCK_DELAY);
    }

    tick() {
        if (this.setpointHour != this.currentValueHour |
            this.setpointMinute != this.currentValueMinute) {
            for (let i = 0; i < STEPS_AT_CLOCKTICK; i++) {
                if (this.currentValueHour != this.setpointHour) {
                    this.currentValueHour++;
                    if (this.currentValueHour > 360) {
                        this.currentValueHour = 0;
                    }
                }
                if (this.currentValueMinute != this.setpointMinute) {
                    this.currentValueMinute++;
                    if (this.currentValueMinute > 360) {
                        this.currentValueMinute = 0;
                    }
                }
            }
            this.redraw = true;
        }
    }

    getCurrentHourAngleWithOffset() {
        return this.currentValueHour + ANGLE_OFFSET;
    }

    getCurrentMinuteAngleWithOffset() {
        return this.currentValueMinute + ANGLE_OFFSET;
    }

};