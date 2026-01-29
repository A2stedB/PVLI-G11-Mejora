import Event from "../../Event/Event.js";
import EventDispatch from "../../Event/EventDispatch.js";
import { StateMachine } from "../StateMachine.js";
import { PlayerState } from "./PlayerState.js";

/**
 * El "jugador" con submarino azul
 * @extends {PlayerState}
 * @class
 */
export class Player2 extends PlayerState{
    /**
     * 
     * @param {StateMachine} stateMachine
     * @param {Number} id El id del jugador 
     */
    constructor(stateMachine,id){
        super(stateMachine,id);
        this._name = "Player 2"
    }

    onStateEnter(){
        this.stateMachine._gameManager.setCurrentSubmarine(this._id);
        let player = this.stateMachine.getCurrentSubmarine(this._id).data.country
        EventDispatch.emit(Event.UPDATE_CURRENT_PLAYER,player)
    }
    onStateExit(){
        EventDispatch.emit(Event.END_TURN);
    }

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.checkState)
    }
}