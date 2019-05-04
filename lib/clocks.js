const CLOCK_DELAY = 100;
const STEPS_AT_CLOCKTICK = 6;

let Clock = class {
    constructor(x, y) {
        //postion in canvas
        this.x = x;
        this.y = y;
        //last position of hands for deletion
        this.lastHourPos;
        this.lastMinutePos;

        //values for hands movement
        this.setpointHour = 0
        this.setpointMinute = 0;
        this.currentValueHour = 0;
        this.currentValueMinute = 0;

        setInterval(function () {
            //this.currentValueHour = this.setpointHour;
            //this.currentValueMinute = this.setpointMinute;
            this.tick();
        }.bind(this), CLOCK_DELAY);
    }

    tick() {
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
    }
};