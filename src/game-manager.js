import { GameLoopMachine } from "./State/GameloopMachine/GameLoopMachine.js";
import { PlayerActionMachine } from "./State/PlayerActionMachine/PlayerActionMachine.js";
import Submarine from "./Submarine/submarine-container.js";
import GameMatrix from "./Board/game-matrix.js";
import Orientation from "./Submarine/submarine-orientation-v2.js";
import EventDispatch from "./Event/EventDispatch.js";
import SubmarineData from "./Submarine/submarine-data.json" with {type:"json"}
import UIdata from "./UI-data.json" with {type:"json"}
import Event from "./Event/Event.js";
import VictoryReason from "./game-victoryCondition.js";

export class GameManager{
    constructor(config){
        this.scene = config.scene;

        this.gameMatrix = new GameMatrix(this.scene)
        
        // 0 izquierda 1 derecha, orden de ronda
        this.order = config.order;

        this.submarineData = JSON.parse(JSON.stringify(SubmarineData));
        this.leftSub = new Submarine({x:1,y:0,scene:this.scene,gameMatrix:this.gameMatrix,orientation:Orientation.W,data:config.leftConfig,gamemanager:this})
        this.rightSub = new Submarine({x:5,y:4,scene:this.scene,gameMatrix:this.gameMatrix,orientation:Orientation.N,data:config.rightConfig,gamemanager:this})

        this.submarine = [this.leftSub, this.rightSub]

        
        this.currentSubmarine = this.getSubmarineById(this.order[0]);
        this.currentView = this.currentSubmarine.view;
        this.currentHUD = this.currentSubmarine.hud;

        this.initialize();

        this.gameloopMachine = new GameLoopMachine({scene:this.scene,gameManager:this,order:this.order,limit:10});
        this.playerActionMachine = new PlayerActionMachine(this.scene,this.gameloopMachine);
        this.gameloopMachine.start();
        
        this.currentTurn = 1;
        this.checkSameCoutry(config);
    }

    initialize(){
        this.setSubmarineExit(this.leftSub,5,5);
        this.setSubmarineExit(this.rightSub,0,0);

        this.setSubmarineID();

        let centerY = UIdata.top / 2;
        let screenWidth = this.scene.cameras.main.width;
        let centerXiz = screenWidth / 6;
        let centerX = screenWidth / 2;
        let centerXdr = screenWidth - screenWidth / 6

        this.roundText = this.scene.add.text(centerXiz,centerY,"Round 1",
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: 'rgb(255, 255, 255)'
        }).setOrigin(0.5,0.5)

        EventDispatch.on(Event.UPDATE_ROUND,(round)=>{
            this.roundText.setText(`Round ${round}`)
        })
        
        this.actionText = this.scene.add.text(centerX,centerY,"Accion",
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: 'rgb(255, 255, 255)'
        }).setOrigin(0.5,0.5)

        EventDispatch.on(Event.UPDATE_ACTION,(action)=>{
            this.actionText.setText(`${action}`)
        })

        this.countryText = this.scene.add.text(centerXdr,centerY,"",
        {
            fontFamily:"Outfit",
            fontSize:30,
            color: 'rgb(255, 255, 255)'
        }).setOrigin(0.5,0.5)

        EventDispatch.on(Event.UPDATE_CURRENT_PLAYER,(player)=>{
            this.countryText.setText(`${player}`)
        })

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
        EventDispatch.removeAllListeners(Event.UPDATE_ROUND)
        EventDispatch.removeAllListeners(Event.UPDATE_ACTION)
        EventDispatch.removeAllListeners(Event.UPDATE_CURRENT_PLAYER)
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
        return this.submarine[id];
    }

    mapPreview(){
        let gameScreen = this.scene;
        this.scene.scene.pause();
        this.scene.scene.launch("MapPreview",{ matrix: this.gameMatrix , closeCallback:()=>{gameScreen.add.existing(this.gameMatrix);},gameManager:this})
    }

    setSubmarineID(){
        for(let i = 0; i < 2;++i){
            this.submarine[i].id = i;
        }
    }

    checkSameCoutry(data){
        if(data.leftConfig.country == data.rightConfig.country){
            this.endOfGame(null,VictoryReason.sameCountry);
        }
    }
}