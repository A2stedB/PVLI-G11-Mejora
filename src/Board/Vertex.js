import { Position } from "../Board/Position.js";
export class Vertex{
    constructor(x,y){
        this.position = new Position(x,y);
        this.available = true;
        this.submarine = null;
    }

    exit(){
        this.submarine = null;
        console.log(`${this.position.position}: ${this.submarine}`)
    }

    enter(submarine){
        console.log("Entered")
        this.submarine = submarine;
        console.log(this.submarine)
        console.log(this.submarine.name)
        console.log(`${this.position.position}: ${this.submarine.name}`)
    }
}