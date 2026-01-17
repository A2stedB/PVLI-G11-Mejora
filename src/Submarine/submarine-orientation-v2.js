import { Vector } from "../vector.js";
export const Orientation = Object.freeze({
    N: {
        degree:0,
        vector: new Vector(0,1),
    },
    E: {
        degree:90,
        vector: new Vector(1,0)
    },
    S: {
        degree:180,
        vector: new Vector(0,-1),
    },
    W:{
        degree:270,
        vector: new Vector(-1,0),
    },

    // getAvailableDirection(direction) {
    //     return [direction, (direction + 90) % 360, (direction - 90) % 360];
    // }
});