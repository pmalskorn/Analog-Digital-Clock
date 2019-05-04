const CLOCK_DELAY = 1000;
let Clock = class {
    constructor(x, y) {
        //postion in canvas
        this.x = x;
        this.y = y;
        
        this.hour = 0;
        this.min = 0;

        this.setpointHour = 0
        this.setpointMinute = 0;
        this.currentValueHour = 0;
        this.currentValueMinute = 0;

        setTimeout(function () {
            this.currentValueHour = this.setpointHour;
            this.currentValueMinute = this.setpointMinute;
        }, CLOCK_DELAY);

    }

    incAngle() {
        this.hour += 6;
        if (this.hour >= 360) {
            this.hour = 0;
        }
        this.min += 13;
        if (this.min >= 360) {
            this.min = 0;
        }
    }
};