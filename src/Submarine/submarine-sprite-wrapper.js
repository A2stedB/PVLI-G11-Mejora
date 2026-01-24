
export class SubmarineSprite extends Phaser.GameObjects.Image{

    constructor(config){
        super(config.scene,config.submarine.vertex.x, config.submarine.vertex.y,"sTop")

        this.submarine = config.submarine;
        this.setRotation(Phaser.Math.DegToRad(this.submarine.orientation.degree));
        this.setScale(0.1)
    }

    updateView(){
        console.log(this.x,this.y)
        let position = this.submarine.vertex;
        console.log(position);
        this.setPosition(position.x,position.y);
        this.setRotation(Phaser.Math.DegToRad(this.submarine.orientation.degree));
        console.log(this.x,this.y)
    }

}