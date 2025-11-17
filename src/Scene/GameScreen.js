import GameBoard from "../Board/GameBoard.js";
import { SubmarineComplete } from "../Submarine/SubmarineComplete.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";
import { InputManager } from "../Input/InputManager.js";
import SubmarineView from "../Scene/SubmarineViewObject.js";
import { GameLoopMachine } from "../State/GameloopMachine/GameLoopMachine.js";
import { PlayerActionMachine } from "../State/PlayerActionMachine/PlayerActionMachine.js";
// import { ResourceManager } from "../Resources/ResourceManager.js";
// import { SubmarineInventory } from "../Resources/SubmarineInventory.js";

export class GameScreen extends Phaser.Scene{
    constructor(){
        super({key:"GameScreen"})

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
        this.gameloopMachine = new GameLoopMachine;
        this.playerActionMachine = new PlayerActionMachine(this.gameloopMachine);
        let texturas = ["Square","BG", "Submarine"];
      //  this.submarineView = new SubmarineView(this,0,0)
        this.tablero = new GameBoard(this,11,11,200,0,texturas,40);
        this.inputManager = new InputManager(this, this.tablero.submarines.red, this.tablero.submarines.blue,this.gameloopMachine,this.playerActionMachine);

        let roundText = this.add.text(350,400,"Round 0",{fontFamily:"inconsolata",fontSize:32})
        let playerText = this.add.text(350,450,"Turno del submarino rojo",{fontFamily:"inconsolata",fontSize:32})

        EventDispatch.on(Event.UPDATE_ROUND,(round)=>{
            roundText.setText(`Round ${round}`)
        })

        EventDispatch.on(Event.UPDATE_PLAYER_TEXT,(player)=>{
            playerText.setText(`Turno del submarino ${player}`);
        })
    }

    update(){}

    

}