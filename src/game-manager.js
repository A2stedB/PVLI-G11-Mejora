import { GameLoopMachine } from "./State/GameloopMachine/GameLoopMachine.js";
import { PlayerActionMachine } from "./State/PlayerActionMachine/PlayerActionMachine.js";
import Submarine from "./Submarine/submarine-container.js";
import GameMatrix from "./Board/game-matrix.js";
import Orientation from "./Submarine/submarine-orientation-v2.js";
import EventDispatch from "./Event/EventDispatch.js";
import SubmarineData from "./Submarine/submarine-data.json" with {type:"json"}
import UIdata from "./UI-data.json" with {type:"json"}

export class GameManager{
    constructor(config){
        this.scene = config.scene;

        this.gameMatrix = new GameMatrix(this.scene)
        
        // 0 izquierda 1 derecha, orden de ronda
        this.order = config.order;

        this.submarineData = JSON.parse(JSON.stringify(SubmarineData));
        this.redSub = new Submarine({x:3,y:3,scene:this.scene,gameMatrix:this.gameMatrix,orientation:Orientation.S,data:this.submarineData.japan,gamemanager:this})
        this.blueSub = new Submarine({x:4,y:3,scene:this.scene,gameMatrix:this.gameMatrix,orientation:Orientation.N,data:this.submarineData.china,gamemanager:this})

        this.submarine = [this.blueSub, this.redSub]

        
        this.blueSub.removeHP(90);
        // Hacer el 50 50 antes de cargar todo esto
        this.currentSubmarine = this.getSubmarineById(this.order[0]);
        this.currentView = this.currentSubmarine.view;
        this.currentHUD = this.currentSubmarine.hud;

        this.gameloopMachine = new GameLoopMachine({scene:this.scene,gameManager:this,order:this.order,limit:3});
        this.playerActionMachine = new PlayerActionMachine(this.scene,this.gameloopMachine);
        
        this.initialize();
        this.currentTurn = 1;
    }

    initialize(){
        this.setSubmarineExit(this.redSub,4,5);
        // this.setSubmarineExit(this.redSub,4,5);

        let centerY = UIdata.top / 2;
        let screenWidth = this.scene.cameras.main.width;
        let centerXiz = screenWidth / 6;
        let centerX = screenWidth / 2;
        let centerXdr = screenWidth - screenWidth / 6

        this.roundText = this.scene.add.text(centerXiz,centerY,"Round 1",
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: 'rgb(72, 70, 163)'
        }).setOrigin(0.5,0.5)
        
        this.actionText = this.scene.add.text(centerX,centerY,"Accion",
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: 'rgb(72, 70, 163)'
        }).setOrigin(0.5,0.5)

        this.mapPreview();
        // this.scene.add.existing(roundText);

        // Primero ejecuta todo lo que hay dentro del scope y luego ya cambia de la escena
        // console.log(this.submarine)
    }

    setSubmarineExit(submarine,x,y){
        this.gameMatrix.setExit(submarine,x,y);
    }

    endOfGame(sub,reason){
        this.scene.scene.stop();
        EventDispatch.removeAllListeners(Event.MOVE)
        EventDispatch.removeAllListeners(Event.SHOOT)
        this.scene.scene.start("GameOver",{winner:sub,reason:reason})
    }

    setCurrentSubmarine(id){
        this.currentHUD.setVisible(false);
        this.currentView.setVisible(false);

        this.currentSubmarine = this.getSubmarineById(id);
        this.currentHUD = this.currentSubmarine.hud;
        this.currentView = this.currentSubmarine.view;
        this.currentHUD.updateHUD();
        this.currentView.updateView();
        this.currentHUD.setVisible(true);
        this.currentView.setVisible(true);
    }

    getSubmarineById(id) {
        // console.log(this.submarine)
        return this.submarine[id];
    }

    mapPreview(){
        let gameScreen = this.scene;
        this.scene.scene.pause();
        this.scene.scene.launch("MapPreview",{ matrix: this.gameMatrix , closeCallback:()=>{gameScreen.add.existing(this.gameMatrix);}})
    }
}