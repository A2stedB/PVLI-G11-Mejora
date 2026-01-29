//------------------------------------------------------------------------
// 
// Estado del archivo: Nuevo
// 
// Description:
// 
// Un objeto que es la representacion del submarino en el mapa
// 
// 
//------------------------------------------------------------------------
export class SubmarineSprite extends Phaser.GameObjects.Image{

    constructor(config){
        super(config.scene,config.submarine.vertex.x, config.submarine.vertex.y,"sTop")

        this.submarine = config.submarine;
        this.setTint(this.submarine.data.color)
        this.setRotation(Phaser.Math.DegToRad(this.submarine.orientation.degree));
        this.setScale(0.07)
    }

    // Refrescar la posicion
    updateView(){
        let position = this.submarine.vertex;
        this.setPosition(position.x,position.y);
        this.setRotation(Phaser.Math.DegToRad(this.submarine.orientation.degree));
    }

}