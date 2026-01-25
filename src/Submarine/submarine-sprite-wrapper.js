
export class SubmarineSprite extends Phaser.GameObjects.Image{

    constructor(config){
        super(config.scene,config.submarine.vertex.x, config.submarine.vertex.y,"sTop")

        this.submarine = config.submarine;
        this.setRotation(Phaser.Math.DegToRad(this.submarine.orientation.degree));
        this.setScale(0.07)
    }

    updateView(){
        let position = this.submarine.vertex;
        this.setPosition(position.x,position.y);
        this.setRotation(Phaser.Math.DegToRad(this.submarine.orientation.degree));
    }

}