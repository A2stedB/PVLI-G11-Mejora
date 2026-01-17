import { Position } from "../vector.js";

export class Vertex extends Phaser.GameObjects.Graphics{
    constructor(scene,x,y,config){
        super(scene);
        
        this.scene = scene;
        this.graphic = config.graphic;
        this.position = new Position(x,y);
        this.submarine = null;


        //Resource?
        this.resource = null;
        scene.add.existing(this);

        
    }

    initialize(){
        this.graphic.fillStyle(0xe6e8f0);
        this.graphic.fillCircle((this.vertex.position.x)*this.cellSize,(this.vertex.position.y*this.cellSize),2);
    }

    exit(){
        this.submarine = null;
    }

    enter(submarine){
        this.submarine = submarine;
    }
}