import { GameLoopMachine } from "./State/GameloopMachine/GameLoopMachine.js";
import { PlayerActionMachine } from "./State/PlayerActionMachine/PlayerActionMachine.js";
import Submarine from "./Submarine/submarine-container.js";
import GameMatrix from "./Board/game-matrix.js";
import Orientation from "./Submarine/submarine-orientation-v2.js";
import SubmarineData from "./Submarine/submarine-data.json" with {type:"json"}

export class GameManager{
    constructor(config){
        this.scene = config.scene;

        this.gameMatrix = new GameMatrix(this.scene)
        this.gameloopMachine = new GameLoopMachine(this.scene);
        this.playerActionMachine = new PlayerActionMachine(this.scene,this.gameloopMachine);
        this.submarine = [];

        // let submarineData = JSON.parse(SubmarineData);
        // console.log(submarineData)
        this.redSub = new Submarine({x:3,y:5,scene:this.scene,gameMatrix:this.gameMatrix,orientation:Orientation.N,data:SubmarineData.japan})
        this.blueSub = new Submarine({x:3,y:0,scene:this.scene,gameMatrix:this.gameMatrix,orientation:Orientation.S,data:SubmarineData.china})
        this.currentView = this.blueSub.view;
        this.currentView.setVisible(true);
        this.currentHUD = this.blueSub.hud;
        this.currentHUD.setVisible(true);
        this.blueSub.updateView();

        this.initialize();
        this.currentTurn = 0;
    }

    initialize(){
        this.setSubmarineExit(this.redSub,4,5);
    }

    flipCoin(){

    }

    setSubmarineExit(submarine,x,y){
        this.gameMatrix.setExit(submarine,x,y);
    }
}