import GameBoard from "../Board/GameBoard.js";
import { SubmarineComplete } from "../Submarine/SubmarineComplete.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";
import SubmarineView from "../Scene/SubmarineViewObject.js";
import { GameLoopMachine } from "../State/GameloopMachine/GameLoopMachine.js";
import { PlayerActionMachine } from "../State/PlayerActionMachine/PlayerActionMachine.js";

// AZUL = JAPON | ROJO = CHINA !!!

export class GameScreen extends Phaser.Scene{

    chain

    constructor(){
        super({key:"GameScreen"})
        this.tablero;
    }
    
    init(){
        console.log(" GameScreen init");
        
        // LIMPIAR eventos anteriores para evitar duplicados
        EventDispatch.off(Event.UPDATE_ROUND);
        EventDispatch.off(Event.UPDATE_PLAYER_TEXT);
        EventDispatch.off(Event.UPDATE_PLAYER_ACTION_TEXT);
        
        this.tablero = null;
    }
    
    preload(){
        console.log("preload");
        
        this.load.image("Square","Page/img/Profile/Lappland.jpeg")
        this.load.image("BG","assets/GameBoard_BG.jpg")
        this.load.image("Submarine","assets/submarino.png")
        this.load.image("SubWindow", "assets/SubWindow.png");
        this.load.image("sFront", "assets/Submarine/Submarine_front.png");
        this.load.image("sBack", "assets/Submarine/Submarine_back.png");
        this.load.image("sRight", "assets/Submarine/Submarine_right.png");
        this.load.image("sLeft", "assets/Submarine/Submarine_left.png");
    }
    
    //La dimension de la tabla tiene que ser un numero impar
    create(){

        this.createHeader();
        this.createPanel();
        let roundText = this.add.text(400,550,"Round 0",
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: '#412e1fff'
        })

        this.roundTextAnimation = this.add.text(-150,300,"Round 0",{fontFamily:"Outfit",fontSize:25})

        let playerText = this.add.text(5,5,"Turno de China",
        {
            fontFamily:"Outfit",
            fontSize:40,
            color: '#412e1fff'
        })

        let playerActionText = this.add.text(5,550,"Fase actual:", 
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: '#412e1fff'
        })

        this.toggleKey = this.input.keyboard.addKey('M');

        this.createTextTween();

        // Maquina de estados y objetos del juego
        this.gameloopMachine = new GameLoopMachine(this);
        this.playerActionMachine = new PlayerActionMachine(this,this.gameloopMachine);

        let texturas = ["Square","BG", "Submarine"];

        this.tablero = new GameBoard(this);

        let redSubmarine = this.tablero.submarines.red;
        let blueSubmarine = this.tablero.submarines.blue;

        this.submarineView = new SubmarineView(this,0,0, this.tablero, this.tablero.submarines.red, this.tablero.submarines.blue);
        this.submarineView.setDepth(1); // Pantalla al fondo
        this.tablero.setDepth(0); // Tablero encima

        // this.submarineView.setVisible(false);
        console.log(this.submarineView.visible)
        //Actualizar textos de ronda y jugador
        EventDispatch.on(Event.UPDATE_ROUND,(round)=>{
            let text = `Round ${round}`
            roundText.setText(text)
            this.roundTextAnimation.setText(text);
             this.submarineView.renderView();
            this.chain.restart();            
        })
        
        EventDispatch.on(Event.UPDATE_PLAYER_TEXT,(player)=>{
            if (this.tablero.currentTurn == "red") playerText.setText(`Turno de China`);
            else if (this.tablero.currentTurn == "blue")playerText.setText(`Turno de Japon`);
             this.submarineView.renderView();
          
        })

        EventDispatch.on(Event.UPDATE_PLAYER_ACTION_TEXT,(state)=>{
            playerActionText.setText(`Fase actual: ${state}`)
        })
    }

    update(){
     
    }

    createTextTween(){
        this.leftAnimation = this.add.tween({
            targets:this.roundTextAnimation,
            duration:1500,
            props:{
                x:{value:350}
            },
            ease:"Quart.easeInOut",
            persist:true,
        })

        this.rightAnimation = this.add.tween({
            targets:this.roundTextAnimation,
            duration:1500,
            props:{
                x:{value:1000}
            },
            ease:"Quart.easeInOut",
            delay:1000,
            persist:true
        })

        this.rightAnimation.on("complete",()=>{
            this.roundTextAnimation.setPosition(-150,525)
        })

        this.chain = this.tweens.chain({
            targets:this.roundTextAnimation,
            tweens:[
                this.leftAnimation,this.rightAnimation
            ],
            persist:true,
        })
    }

    playChain(){
        this.chain.play();
    }
}