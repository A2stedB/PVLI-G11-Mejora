//------------------------------------------------------------------------
// 
// Estado del archivo: refactorizado
// 
// Description: Objeto que representa un cuadrado de la matriz del juego
// 
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version: He juntado la logica y la grafica
// 
//------------------------------------------------------------------------
import { Position } from "../vector.js";
export class Square extends Phaser.GameObjects.Image{
    constructor(scene,x,y,config){
        super(scene,x,y,"Square");
        
        this.scene = scene;
        
        this.container = config.container;
        this.container.add(this);
        this.position = new Position(x,y);
        this.vertices = [];
        this.dragon = null;
        this.setDisplaySize(config.cellSize*2,config.cellSize*2);

        this.initialize();        

        this.setVisible(false);
    }

    initialize(){
        let x = (this.position.x * this.container.config.cellSize);
        let y = (this.position.y * this.container.config.cellSize);
        this.setPosition(x,y);
    }

    dragonEnter(dragon){
        this.dragon = dragon;
        return this;
    }

    dragonExit(){
        this.dragon = null;
    }

}