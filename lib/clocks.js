let Clock = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hour = 270;
        this.min = 270;          
    }

    incAngle(){
        this.hour += 6;
        if(this.hour >= 360){
            this.hour = 0;
        }
        this.min += 13;
        if(this.min >= 360){
            this.min = 0;
        }
    }
    

};