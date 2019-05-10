
const STEPS_AT_CLOCKTICK = 3;

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

    isControlComplet() {
        return this.setpoint == this.currentValue;
    }
}

let Clock = class {
    constructor(x, y) {
        this.hands = [
            new Hand(x, y),
            new Hand(x, y)
        ];
        this.state = CLOCK_STATE.READY;

        this.redraw = true;
    }

    tick() {
        if (this.state == CLOCK_STATE.IN_CONTROL) {
            for (let i = 0; i < STEPS_AT_CLOCKTICK; i++) {
                this.hands.forEach(hand => {
                    if (!hand.isControlComplet()) {
                        hand.currentValue++;
                        this.redraw = true;
                    }
                    if (hand.currentValue > 360) {
                        hand.currentValue = 0;
                    }else if(hand.currentValue < 0){
                        hand.currentValue = 360;
                    }
                });
                this.checkClockState();
            }
        } else if (this.state == CLOCK_STATE.IN_ANIMATION) {
            this.hands.forEach(hand => {
                if (!hand.isControlComplet()) {
                    if(hand.setpoint < 0)
                        hand.setpoint = 360 - Math.abs(hand.setpoint);
                    else
                        hand.setpoint = hand.setpoint % 360;

                    hand.currentValue = hand.setpoint;
                }
            });
            this.checkClockState();
        }
    }

    checkClockState() {
        if (this.hands[0].isControlComplet() &&
            this.hands[1].isControlComplet()) {
            this.state = CLOCK_STATE.READY;
        }
    }

    getHourHand() {
        return this.hands[0];
    }

    getMinuteHand() {
        return this.hands[1];
    }

    //functions forAnimation
    getHourSetpoint() {
        return this.getHourHand().setpoint;
    }

    getMinuteSetpoint() {
        return this.getMinuteHand().setpoint;
    }

    setHourPosition(setpoint) {
        this.state = CLOCK_STATE.IN_ANIMATION;
        this.getHourHand().setpoint = setpoint;
    }

    setMinutePosition(setpoint) {
        this.state = CLOCK_STATE.IN_ANIMATION;
        this.getMinuteHand().setpoint = setpoint;
    }

    //functions for Control
    setHourSetpoint(setpoint) {
        this.state = CLOCK_STATE.IN_CONTROL;
        this.getHourHand().setpoint = setpoint;
    }

    setMinuteSetpoint(setpoint) {
        this.state = CLOCK_STATE.IN_CONTROL;
        this.getMinuteHand().setpoint = setpoint;
    }

    setBothSetpoints(setpoint) {
        this.state = CLOCK_STATE.IN_CONTROL;
        this.setHourSetpoint(setpoint);
        this.setMinuteSetpoint(setpoint);
    }

};