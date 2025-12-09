import { Square } from "../Board/Square.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";
/**
 * El cuadrado visible en el mapa asociado a un cuadrado de logica, ahora sirve como el fondo de los cuadrados solo, que son invisibles.
 * Esto sirvio solo como prueba de las cosas,ya no se utiliza como tal.
 */
export class GraphicSquare extends Phaser.GameObjects.Image{

    /**
     * @param {Phaser.Scene} scene 
     * @param {Square} s 
     */
    constructor(scene,square,texture,cellSize){
        super(scene,(square.position.x*cellSize),square.position.y*cellSize,texture)
        this.cellSize = cellSize;
        this.square = square;
        this.texture = texture;
        this.setDisplaySize(cellSize*2,cellSize*2)

        //No visible
        this.setAlpha(0);
        
        scene.add.existing(this);
    }
    /**
     * El render del cuadrado visible en el mapa
     */
    render(){
        
    }
}