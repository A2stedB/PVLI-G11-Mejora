import GameBoard from "../Board/GameBoard.js";
import { SubmarineComplete } from "../Submarine/SubmarineComplete.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";
// import { InputManager } from "../Input/InputManager.js";
import SubmarineView from "../Submarine/SubmarineViewObject.js";
import { GameLoopMachine } from "../State/GameloopMachine/GameLoopMachine.js";
import { PlayerActionMachine } from "../State/PlayerActionMachine/PlayerActionMachine.js";
// import { ResourceManager } from "../Resources/ResourceManager.js";
// import { SubmarineInventory } from "../Resources/SubmarineInventory.js"
import SubmarineView2 from "../Submarine/submarine-view.js";
import InstructionUI from "../UI/ui-instruction.js";
import image_assets from "../image.json" with {type:"json"}
import sound_assets from "../sound.json" with {type:"json"}
import GameMatrix from "../Board/game-matrix.js";
import Submarine from "../Submarine/submarine-container.js";

// AZUL = JAPON | ROJO = CHINA !!!

export class GameScreen extends Phaser.Scene{

    chain

    constructor(){
        super({key:"GameScreen"})
        
    }
    
    init(){

    }
    
    preload(){
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });



        this.loadImage();
        this.loadAudio();
    }
    
    //La dimension de la tabla tiene que ser un numero impar
    create(){

        this.createHeader();
        this.createPanel();

        this.instruction = new InstructionUI({scene:this,fontSize:20})
        let roundText = this.add.text(370,550,"Round 0",
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: '#412e1fff'
        })

        this.roundTextAnimation = this.add.text(-150,300,"Round 0",{fontFamily:"Outfit",fontSize:25})

        // let playerText = this.add.text(5,5,"Turno de China",
        // {
        //     fontFamily:"Outfit",
        //     fontSize:40,
        //     color: '#412e1fff'
        // })

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

        // this.submarineView = new SubmarineView(this,0,0, this.tablero, this.tablero.submarines.red, this.tablero.submarines.blue);
        this.submarineView = new SubmarineView2({scene:this})
        // this.submarineView.setDepth(1); // Pantalla al fondo
        this.tablero.setDepth(0); // Tablero encima

        // this.submarineView.setVisible(false);
        // console.log(this.submarineView.visible)
        //Actualizar textos de ronda y jugador
        EventDispatch.on(Event.UPDATE_ROUND,(round)=>{
            let text = `Round ${round}`
            roundText.setText(text)
            this.roundTextAnimation.setText(text);
            //  this.submarineView.renderView();
            this.chain.restart();            
        })
        
        // EventDispatch.on(Event.UPDATE_PLAYER_TEXT,(player)=>{
        //     if (this.tablero.currentTurn == "red") playerText.setText(`Turno de China`);
        //     else if (this.tablero.currentTurn == "blue")playerText.setText(`Turno de Japon`);
        //      this.submarineView.renderView();
          
        // })

        // EventDispatch.on(Event.UPDATE_PLAYER_ACTION_TEXT,(state)=>{
        //     playerActionText.setText(`Fase actual: ${state}`)
        //      this.submarineView.renderView();
        // })

        this.matrix2 = new GameMatrix(this);
        this.blueSub = new Submarine({x:1,y:3,scene:this,gameMatrix:this.matrix2})
        console.log(this.blueSub.position);
    }

     refresh() {
        this.submarineView.active = !this.submarineView.active;
        if (this.submarineView.active) {
            this.submarineView.setVisible(true);
        }
        else this.submarineView.setVisible(false);
        
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
            ease:"Quart.easeInOut", //Quart
            persist:true,
        })

        this.rightAnimation = this.add.tween({
            targets:this.roundTextAnimation,
            duration:1500,
            props:{
                x:{value:1000}
            },
            ease:"Quart.easeInOut", //Quart
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

    createHeader()
    {
        // this.background = this.add.rectangle(0, 0, 1600, 60, 0x00CC9966, 1);
        // this.background.setOrigin(0, 0);
    }
    createPanel()
    {
        this.panel = this.add.rectangle(0, 0, 1010, 100, 0x00CC9966, 1);
        this.panel.setPosition(0,575);
      

          let divisor = this.add.text(300,565," | ",
        {
            fontFamily:"Outfit",
            fontSize:40,
            color: '#412e1fff'
        })
           let divisor2 = this.add.text(300,530," | ",
        {
            fontFamily:"Outfit",
            fontSize:40,
            color: '#412e1fff'
        })
    }

    loadImage(){
        image_assets.image.forEach(element => {
            this.load.image(element.key,element.path)
        });
    }

    loadAudio(){
        sound_assets.audio.forEach(element => {
            this.load.audio(element.key,element.path)
        });
    }
}