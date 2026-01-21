import board_config from "./config.json" with {type:"json"}
import { Square } from "./game-matrix-square.js";
import { Vertex } from "./game-matrix-vertex.js";


export default class GameMatrix extends Phaser.GameObjects.Container{
    constructor(scene,config){
        super(scene,0,0);

        this.scene = scene;
        this.config = board_config;
        this.style = this.scene.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 } });
        this.screenWidth = this.scene.cameras.main.width;   // 800
        this.screenHeight = this.scene.cameras.main.height; // 600
        this.matrix = [];

        this.scene.add.existing(this);
        this.initialize();
    }   

    initialize(){
        
        //El origen top-left de donde se muestra el tablero
        this.boardDisplayWidth = board_config.boardWidth * board_config.cellSize
        this.boardDisplayHeight = board_config.boardHeight * board_config.cellSize

        this.setSize(this.boardDisplayWidth,this.boardDisplayHeight)
        let x = (this.screenWidth/2) - (this.boardDisplayWidth/2)
        let y = (this.screenHeight/2) - (this.boardDisplayHeight/2)
        this.setPosition(x,y);
        console.log(this.x,this.y);

        // this.scene.add.circle(this.x,this.y,10,0xFFFFFF,1);
        // this.scene.add.circle(this.x+this.boardDisplayWidth,this.y,10,0xFFFFFF,1);
        // this.scene.add.circle(this.x,this.y + this.boardDisplayHeight,10,0xFFFFFF,1);
        // this.scene.add.circle(this.x+this.boardDisplayWidth,this.y+  this.boardDisplayHeight,10,0xFFFFFF,1);

        let vertexRow = (2*board_config.boardWidth) - 1
        let vertexColumn= (2*board_config.boardHeight) - 1

        for(let i = 0; i < vertexRow; ++i){
            this.matrix[i] = [];
            for(let j = 0; j < vertexColumn;++j){
                this.createVertex(this.matrix,i,j);
            }
        }

        console.log(this.matrix);
    }

    createVertex(matrix,x,y){
        if(!(x%2) && !(y%2)){
            matrix[x][y] = new Vertex(this.scene,x,y,{style:this.style,container:this,cellSize:board_config.cellSize});
        }
        else if(x%2 && y%2){
            matrix[x][y] = new Square(this.scene,x,y,{container:this,cellSize:board_config.cellSize});
        }
        else {
            matrix[x][y] = null;
        }
    }
}