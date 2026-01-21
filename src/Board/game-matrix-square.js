import { Position } from "../vector.js";

export class Square extends Phaser.GameObjects.Image{
    constructor(scene,x,y,config){
        super(scene,x,y,"Square");
        
        this.scene = scene;
        
        this.container = config.container;
        this.container.add(this);
        this.position = new Position(x,y);
        this.nearPoints = [];
        this.dragon = null;
        this.setDisplaySize(config.cellSize*2,config.cellSize*2);

        this.initialize();        
        scene.add.existing(this);
    }

    initialize(){
        let x = (this.position.x * this.container.config.cellSize);
        let y = (this.position.y * this.container.config.cellSize);
        this.setPosition(x,y);
        // console.warn(this.x,this.y);
    }
}