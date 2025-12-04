import GameBoard from "../Board/GameBoard.js";
import { SubmarineComplete } from "../Submarine/SubmarineComplete.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";
import { InputManager } from "../Event/InputManager.js";
import SubmarineView from "../Scene/SubmarineViewObject.js";
// import { ResourceManager } from "../Resources/ResourceManager.js";
// import { SubmarineInventory } from "../Resources/SubmarineInventory.js";

export class TutorialScene extends Phaser.Scene{
    constructor(){
        super({key:"tutorial"})

        this.tablero;
    }
    
    init(){
        console.log("init");
        this.tablero;
    }
    
    preload(){
        console.log("preload");
        
        this.load.image("Square","Page/img/Profile/Lappland.jpeg")
        this.load.image("BG","assets/GameBoard_BG.jpg")
        this.load.image("Submarine","assets/submarino.png")
    }
    
    //La dimension de la tabla tiene que ser un numero impar
    create(){
        let texturas = ["Square","BG", "Submarine"];
      //  this.submarineView = new SubmarineView(this,0,0)
        this.tablero = new GameBoard(this,11,11,200,0,texturas,40);
        this.inputManager = new InputManager(this, this.tablero.submarines.blue, this.tablero.submarines.red);
    }

    update(){}

    

}