//------------------------------------------------------------------------
// 
// Estado del archivo: 
// 
// Cosas añadidas, nuevas, modificadas o quitadas: 
// 
// Commentarios: 
// 
// TODO: Añadir una lista de observadores y "avisarles" cuando este cambia de estado
// 
//------------------------------------------------------------------------
import {StateMachine} from "../StateMachine.js";
import { Player1 } from "./Player1.js";
import { Player2 } from "./Player2.js";
import { CheckState } from "./CheckState.js";

/**
 * La maquina del estado que controla el bucle del juego principal
 */
export class GameLoopMachine extends StateMachine{

    constructor(config){
        super(config.scene);
        
        this._scenescene = config.scene;
        this._gameManager = config.gameManager;
        this._round = 0;
        this._name = "Gameloop Machine";
        this._player1 = new Player1(this,config.order[0]);
        this._player2 = new Player2(this,config.order[1]);
        this._checkState = new CheckState(this);
        this.playerList = [this._player1, this._player2];

        this._currentState = this._checkState;
        this._currentState.onStateEnter();
    }

    get stateList(){
        let availableStates = Object.freeze({
            player1: this._player1,
            player2: this._player2,
            checkState: this._checkState,
        })
        return availableStates;
    }

    /**
     * Metodo que suma uno al numero de ronda
     * @method
     */
    updateRound(){
        ++this._round;
    }

    /**
     * Devuelve la ronda actual
     * @property
     * @returns {Number}
     */
    get round(){
        return this._round;
    }
    
    setOrder(order){
        for(let i = 0; i < 2;++i){
            this.playerList[i]._id = order[i]; 
        }
    }

    getCurrentSubmarine() {
        let currentId = this._currentState._id;
        return this._gameManager.getSubmarineById(currentId);
    }
}