const CLOCK_DELAY = 50;
const STEPS_AT_CLOCKTICK = 3;
const ANGLE_OFFSET = 270;

const CLOCK_STATE = {
    READY: 1,
    IN_CONTROL: 2,
    IN_ANIMATION: 3
}

let Hand = class {
    constructor(x, y) {
        this.setpoint = 0;
        this.currentValue = 0;
        this.lastEndPosition = null;
        this.startPosition = {
            x: x,
            y: y
        };
    }
}

let Clock = class {
    constructor(x, y) {
        this.hand = [
            new Hand(x, y),
            new Hand(x, y)
        ];
        this.state = CLOCK_STATE.READY;
        this.redraw = true;

        setInterval(function () {
            this.tick(this.getHourHand());
            this.tick(this.getMinuteHand());
        }.bind(this), CLOCK_DELAY);
    }

    tick(hand) {
        for (let i = 0; i < STEPS_AT_CLOCKTICK; i++) {
            if (hand.setpoint != hand.currentValue) {
                hand.currentValue++;
                this.redraw = true;
            }
            if (hand.currentValue > 360) {
                hand.currentValue = 0;
            }
        }

    }

    getHourHand() {
        return this.hand[0];
    }

    getMinuteHand() {
        return this.hand[1];
    }

    setHourSetpoint(setpoint) {
        this.getHourHand().setpoint = setpoint;
    }

    setMinuteSetpoint(setpoint) {
        this.getMinuteHand().setpoint = setpoint;
    }

    setBothSetpoints(setpoint) {
        this.setHourSetpoint(setpoint);
        this.setMinuteSetpoint(setpoint);
    }

};