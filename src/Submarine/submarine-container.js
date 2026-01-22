import SubmarineView2 from "./submarine-view.js";
import { Orientation } from "./submarine-orientation-v2.js";

export default class Submarine{

    constructor(config){ //config:{x,y,gameMatrix}
        this.scene = config.scene;

        this.config = config;
        this.view = new SubmarineView2({scene:config.scene});
        this.gameMatrix = config.gameMatrix;
        this.boardConfig = config.gameMatrix.config;

        this.initialize();
        this.position;

    }

    initialize(){
        let boardWidth = this.boardConfig.boardWidth;
        let boardHeight = this.boardConfig.boardHeight;
        let index = this.config.y * boardHeight + this.config.x;

        this.position = this.gameMatrix.vertexList[index];
        this.position.enter(this);
        this.gameMatrix.updateView();
    }

    move(direction){

    }
}