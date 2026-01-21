import { Position } from "../vector.js";

export class Vertex extends Phaser.GameObjects.Graphics{
    constructor(scene,x,y,config){
        super(scene,x,y);
        
        this.setPosition()
        this.scene = scene;
        this.container = config.container;
        this.style = config.style;
        this.position = new Position(x,y);
        this.submarine = null;


        //Resource?
        this.resource = null;
        this.exit = null;

        this.initialize();

        this.container.add(this);
        scene.add.existing(this);
    }

    initialize(){
        let x = (this.position.x * this.container.config.cellSize);
        let y = (this.position.y * this.container.config.cellSize);
        this.setPosition(x,y);
        console.log(this.x,this.y)
        this.style.fillStyle(0xe6e8f0);
        this.style.fillCircle(this.position.x*this.container.config.cellSize,(this.position.y*this.container.config.cellSize),2);
    }

    exit(){
        this.submarine = null;
    }

    enter(submarine){
        this.submarine = submarine;
    }
}