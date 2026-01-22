import { Position } from "../vector.js";

export class Vertex extends Phaser.GameObjects.Graphics{
    constructor(scene,x,y,config){
        super(scene);
        
        this.setPosition()
        this.scene = scene;
        this.container = config.container;
        this.position = new Position(x,y);
        this.submarine = null;


        //Resource?
        this.resource = null;
        this.exit = null;

        this.initialize();

        this.container.add(this);
    }

    initialize(){
        let x = (this.position.x * this.container.config.cellSize);
        let y = (this.position.y * this.container.config.cellSize);

        this.setPosition(x,y);

        this.fillStyle(0xe6e8f0);
        this.fillCircle(0,0,2); //jdr con la posicion relativa
    }

    exit(){
        this.submarine = null;
    }

    enter(submarine){
        this.submarine = submarine;
        console.log(this.submarine)
    }
}