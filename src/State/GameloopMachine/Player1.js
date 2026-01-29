import { PlayerState } from "./PlayerState.js";
import EventDispatch from "../../Event/EventDispatch.js";
import Event from "../../Event/Event.js";

/**
 * El "jugador" con submarino rojo
 * @extends {PlayerState}
 * @class
 */
export class Player1 extends PlayerState{

    /**
     * @constructor
     * @param {StateMachine} stateMachine
     * @param {Number} id El id del jugador 
     */
    constructor(stateMachine,id){
        super(stateMachine,id);
        this._name = "Player 1"
    }

    onStateEnter(){
        // this.submarine = this.stateMachine.getCurrentSubmarine()
        this.stateMachine._gameManager.setCurrentSubmarine(this._id);
        let player = this.stateMachine.getCurrentSubmarine(this._id).data.country
        EventDispatch.emit(Event.UPDATE_CURRENT_PLAYER,player)
        // this.submarine.updateView();
    }
    onStateExit(){
        // EventDispatch.emit(Event.END_TURN);
    }
    

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.player2)
    }
}