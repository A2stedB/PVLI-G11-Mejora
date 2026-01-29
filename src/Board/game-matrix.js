//------------------------------------------------------------------------
// 
// Estado del archivo: refactorizado
// 
// Description:
// 
// Objeto que representa la matriz del juego
// 
//
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version:
// 
// No se la verdad xD, ya no actua de "Game Manager" como antes, solo tiene
// una "funcionalidad"
// Esta mucho más organizado
// 
//------------------------------------------------------------------------
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
        this.exits = [];

        this.toggleKey = this.scene.input.keyboard.addKey("M");
        
        this.showingSubmarine = false;

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

        // Cambiar a la vista del "mapa" 
        this.toggleKey.on("down",()=>{
            let gameScreen = this.scene;
            this.scene.scene.pause();
            this.scene.scene.launch("MapView", { matrix: this , closeCallback:()=>{gameScreen.add.existing(this);}}); //La misma sin duplicar pero esta en esta escena de nuevo 
        })
        
        this.setVisible(false);
    }


    /**
     * Metodo auxiliar para la creacion de la matriz
     * @param {*} matrix 
     * @param {*} x 
     * @param {*} y 
     */
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

    /**
     * Metodo que averigua los cuatro vertices que forma un cuadrado para todos los cuadrados que hay en la matriz
     * Esto al final ni lo he usado...
     */
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

    /**
     * Actualizar las vistas de los submarinos
     */
    updateMap(){
        this.submarines.forEach(submarines => {
            submarines.updateView();
        });
    }

    /**
     * Inicializar el sprite que se ve en la matriz con el submarino correspondiente
     * @param {Submarine} submarine 
     */
    initSubmarine(submarine){
        let newSubmarine = new SubmarineSprite({scene:this.scene,submarine:submarine}).setVisible(this.showingSubmarine)
        this.submarines.push(newSubmarine);
        this.add(newSubmarine);
    }

    /**
     * Imponer la salida para el submarino
     * @param {Submarine} submarine 
     * @param {Number} x 
     * @param {Number} y 
     */
    setExit(submarine,x,y){
        let index = y * board_config.boardWidth + x;
        this.vertexList[index].setExit(submarine);
        this.exits.push(this.vertexList[index])
    }
}