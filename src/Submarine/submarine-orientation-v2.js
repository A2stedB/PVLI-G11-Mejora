import { Vector } from "../vector.js";
const Orientation = Object.freeze({
    N: {
        degree:0,
        vector: new Vector(0,-1),
    },
    E: {
        degree:90,
        vector: new Vector(1,0)
    },
    S: {
        degree:180,
        vector: new Vector(0,1),
    },
    W:{
        degree:270,
        vector: new Vector(-1,0),
    },

    getAvailableDirection(direction) {
        //Object.entries() crea una copia del objeto
        let array = [this.N,this.E,this.S,this.W];
        let indexLeft = this.mod(direction.degree - 90,360) / 90
        let indexRight = this.mod(direction.degree + 90,360) / 90

        let left = array[indexLeft];
        let right = array[indexRight];
        return [left,direction,right];
    },

     mod:(n, m) => (n % m + m) % m
});

export default Orientation;