import { Position } from "../Board/Position.js";
import { Vertex } from "../Board/Vertex.js";
import { Dragon } from "../Dragon/Dragon.js";

/**
 * El cuadrado logico, tiene los 4 vertices que forma este cuadrado
 */
export class Square{

    resource;

    dragon

    constructor(x,y){
        this.position = new Position(x,y);
        this.nextPoint = [];
        this.active = false;
        this.dragon = null;
    }

    /**
     * 
     * @param {Array.<[Square,Vertex,null]>} matrix 
     */
    getNextPoint(matrix){
        let x = this.position.x;
        let y = this.position.y;

        let topLeft = matrix[x-1][y-1];
        let topRight = matrix[x+1][y-1];
        let bottomLeft = matrix[x-1][y+1];
        let bottomRight = matrix[x+1][y+1];
        this.nextPoint.push(topLeft,topRight,bottomLeft,bottomRight)
    }

    /**
     * Registrar cuando el dragon entra en esta casilla
     * @param {Dragon} dragon 
     * @returns 
     */
    dragonEnter(dragon){
        this.dragon = dragon;
        return this;
    }

    /**
     * Registar la salida del dragon de esta casilla
     */
    dragonExit(){
        this.dragon = null;
    }


}