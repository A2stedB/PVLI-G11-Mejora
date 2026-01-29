//------------------------------------------------------------------------
// 
// Estado del archivo: Modificado
// 
// Cosas añadidas, nuevas, modificadas o quitadas: 
//
// He añadido algunas cosas de utilidad, y ahora no entra
// en el primer estado tras su construccion porque da algunos
// problemas. Tambien esta la condicion de fin de juego cuando ha pasado muchas rondas.
// 
//------------------------------------------------------------------------
import {StateMachine} from "../StateMachine.js";
import { Player1 } from "./Player1.js";
import { Player2 } from "./Player2.js";
import { CheckState } from "./CheckState.js";
import VictoryReason from "../../game-victoryCondition.js";
import EventDispatch from "../../Event/EventDispatch.js";
import Event from "../../Event/Event.js";

/**
 * La maquina del estado que controla el bucle del juego principal
 */
export class GameLoopMachine extends StateMachine{

    constructor(config){
        super(config.scene);
        
        this._scene = config.scene;
        this._gameManager = config.gameManager;
        this._roundLimit = config.limit;
        this._round = 0;
        this._name = "Gameloop Machine";
        this._player1 = new Player1(this,config.order[0]);
        this._player2 = new Player2(this,config.order[1]);
        this._checkState = new CheckState(this);
        this.playerList = [this._player1, this._player2];

        this._currentState = this._checkState;
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
        EventDispatch.emit(Event.UPDATE_ROUND, this._round);
        if(this._round >= this._roundLimit){
            this._gameManager.endOfGame(null,VictoryReason.even);
        }
    }

    /**
     * Devuelve la ronda actual
     * @property
     * @returns {Number}
     */
    get round(){
        return this._round;
    }
    
    // Orden del jugador
    setOrder(order){
        for(let i = 0; i < 2;++i){
            this.playerList[i]._id = order[i]; 
        }
    }


    // Coger el submarino actual del jugador
    getCurrentSubmarine() {
        let currentId = this._currentState._id;
        return this._gameManager.getSubmarineById(currentId);
    }

    // Coger la camara
    getCamera(){
        return this._scene.cameras.main
    }

    // Empzar la maquina de estado
    start() {
        if (this._currentState) {
            this._currentState.onStateEnter();
        }
    }
}