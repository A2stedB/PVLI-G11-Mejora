import board_config from "./config.json" with {type:"json"}
import { Square } from "./game-matrix-square.js";
import { Vertex } from "./game-matrix-vertex.js";
import { SubmarineSprite } from "../Submarine/submarine-sprite-wrapper.js";



export default class GameMatrix extends Phaser.GameObjects.Container{
    constructor(scene,config){
        super(scene,0,0);

        this.scene = scene;
        this.config = board_config;
        this.style = this.scene.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 } });
        this.screenWidth = this.scene.cameras.main.width;   // 800
        this.screenHeight = this.scene.cameras.main.height; // 600

        this.matrix = [];
        this.vertexList = [];
        this.squareList = [];
        this.submarines = [];

        this.toggleKey = this.scene.input.keyboard.addKey("P");
        
        this.showingSubmarine = true

        this.scene.add.existing(this);
        this.initialize();
    }   

    initialize(){
        let centerX = (this.screenWidth/2) 
        let centerY = (this.screenHeight/2) 
        let totalColumns = (2 * this.config.boardWidth) - 2;
        let totalRows = (2 * this.config.boardHeight) - 2;
        
        //El origen top-left de donde se muestra el tablero
        this.boardDisplayWidth = totalColumns * this.config.cellSize;
        this.boardDisplayHeight = totalRows * this.config.cellSize;

        let x = centerX - (this.boardDisplayWidth/2)
        let y = centerY - (this.boardDisplayHeight/2)
        this.setPosition(x,y);

        // this.scene.add.circle(this.x,this.y,10,0xFFFFFF,1);
        // this.scene.add.circle(this.x+this.boardDisplayWidth,this.y,10,0xFFFFFF,1);
        // this.scene.add.circle(this.x,this.y + this.boardDisplayHeight,10,0xFFFFFF,1);
        // this.scene.add.circle(this.x+this.boardDisplayWidth,this.y+  this.boardDisplayHeight,10,0xFFFFFF,1);
        
        let background = this.scene.add.image(0,0,"BG").
                         setDisplaySize(this.boardDisplayWidth,this.boardDisplayHeight).setOrigin(0,0)
        
        this.add(background)
        this.moveDown(background)

        let vertexRow = (2 * this.config.boardWidth) - 1;
        let vertexColumn = (2 * this.config.boardHeight) - 1;

        for(let i = 0; i < vertexRow; ++i){
            this.matrix[i] = [];
            for(let j = 0; j < vertexColumn;++j){
                this.matrixCreation(this.matrix,j,i);
            }
        }

        this.getVertexForSquare();

        this.toggleKey.on("down",()=>{
            let gameScreen = this.scene;
            this.scene.scene.pause();
            this.scene.scene.launch("MapView", { matrix: this , closeCallback:()=>{gameScreen.add.existing(this);}}); //La misma sin duplicar pero esta en esta escena de nuevo 
        })
        
        this.setVisible(false);
    }

    matrixCreation(matrix,x,y){
        if(!(x%2) && !(y%2)){
            matrix[y][x] = new Vertex(this.scene,x,y,{style:this.style,container:this,cellSize:board_config.cellSize});
            this.vertexList.push(matrix[y][x]);
            
        }
        else if(x%2 && y%2){
            matrix[y][x] = new Square(this.scene,x,y,{container:this,cellSize:board_config.cellSize});
            this.squareList.push(matrix[y][x])
        }
        else {
            matrix[y][x] = null;
        }
    }

    getVertexForSquare(){
        this.squareList.forEach(square => {
            let x = square.position.x; let y = square.position.y
            let topLeft = this.matrix[y-1][x-1];
            let topRight = this.matrix[y+1][x-1];
            let bottomLeft = this.matrix[y-1][x+1];
            let bottomRight = this.matrix[y+1][x+1];

            square.vertices.push(topLeft,topRight,bottomLeft,bottomRight);
        });
    }

    updateMap(){
        this.submarines.forEach(submarines => {
            submarines.updateView();
        });
    }

    initSubmarine(submarine){
        let newSubmarine = new SubmarineSprite({scene:this.scene,submarine:submarine}).setVisible(this.showingSubmarine)
        this.submarines.push(newSubmarine);
        this.add(newSubmarine);
    }
}