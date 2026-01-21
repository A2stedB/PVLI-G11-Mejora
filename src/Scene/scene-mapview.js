export default class MapView extends Phaser.Scene{
    constructor(matrix){
        super({key:"MapView"})

        this.matrix = matrix;
    }
}