import { PlayerState } from "./PlayerState.js";
import EventDispatch from "../../Event/EventDispatch.js";
import Event from "../../Event/Event.js";

//TODO
// - Un playerState generico y heredar de el

export class Player1 extends PlayerState{
    constructor(stateMachine,id){
        super(stateMachine,id);
        this._name = "Player 1"
    }

    onStateEnter(){
        EventDispatch.emit(Event.UPDATE_PLAYER_TEXT,"rojo")
        console.log("Player 1 key activated")
    }
    onStateExit(){
        EventDispatch.emit(Event.END_TURN);
        console.log("Player 1 key desactivated")
    }
    

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.player2)
    }
}