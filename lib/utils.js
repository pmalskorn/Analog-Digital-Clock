function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


function getCirclePositionByAngle(x, y, angle) {
    let retx = x + (clockRadius - handpadding) * Math.cos(angle * Math.PI / 180);
    let rety = y + (clockRadius - handpadding) * Math.sin(angle * Math.PI / 180);
    return { x: retx, y: rety };
}