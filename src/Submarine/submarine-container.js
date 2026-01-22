import SubmarineView2 from "./submarine-view.js";
import { Orientation } from "./submarine-orientation-v2.js";

export default class Submarine{

    constructor(config){ //config:{x,y,gameMatrix}
        this.scene = config.scene;

        this.config = config;
        this.view = new SubmarineView2({scene:config.scene});
        this.gameMatrix = config.gameMatrix;
        this.boardConfig = config.gameMatrix.config;
        this.orientation = config.orientation;

        this.initialize();
        this.position;

    }

    initialize(){
        let boardWidth = this.boardConfig.boardWidth;
        let boardHeight = this.boardConfig.boardHeight;
        let index = this.config.x * boardHeight + this.config.y;

        this.vertex = this.gameMatrix.vertexList[index];
        this.vertex.enter(this);
        this.gameMatrix.initSubmarine(this);
    }

    move(direction){
        
    }
}