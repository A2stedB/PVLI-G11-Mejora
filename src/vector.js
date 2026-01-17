export class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    get position(){
        return (`x: ${this.x}, y ${this.y}`)
    }
}

var Position = function(x = 0,y = 0){
    return new Vector(x,y);
}

export var Position;
