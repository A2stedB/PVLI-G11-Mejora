import { Vertex } from "../Board/Vertex.js";

/**
 * El vertice visible en el mapa asociado a un vertice de logica
 */
export class GraphicVertex extends Phaser.GameObjects.Graphics{
    constructor(scene,graphic,cellSize,v,offsetX,offsetY){
        super(scene,v);
        this.graphic = graphic;
        this.cellSize = cellSize;
        this.vertex= v;

        scene.add.existing(this);
    }

    /**
     * El render del punto visible en el mapa
     */
    render(){
        this.graphic.fillStyle(0xe6e8f0);
        this.graphic.fillCircle((this.vertex.position.x)*this.cellSize,(this.vertex.position.y*this.cellSize),2);
    }
}