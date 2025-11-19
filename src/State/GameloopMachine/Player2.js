import Event from "../../Event/Event.js";
import EventDispatch from "../../Event/EventDispatch.js";
import { PlayerState } from "./PlayerState.js";

export class Player2 extends PlayerState{
    constructor(stateMachine,id){
        super(stateMachine,id);
        this._name = "Player 2"
    }

    onStateEnter(){
        EventDispatch.emit(Event.UPDATE_PLAYER_TEXT,"azul")
        console.log("Player 2 key activated")
    }
    onStateExit(){
        // EventDispatch.emit(Event.DISABLE_KEY,2);
        console.log("Player 2 key desactivated")
    }

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.checkState)
    }
}