import { Position } from "../vector.js";

export class Square extends Phaser.GameObjects.Image{
    constructor(scene,x,y,config){
        super(scene,x,y,"Square");
        
        this.scene = scene;
        this.position = new Position(x,y);
        this.nearPoints = [];
        this.dragon = null;

        scene.add.existing(this);
    }
}