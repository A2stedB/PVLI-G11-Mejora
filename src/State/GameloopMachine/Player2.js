import Event from "../../Event/Event.js";
import EventDispatch from "../../Event/EventDispatch.js";
import State from "../State.js";

export class Player2 extends State{
    constructor(stateMachine){
        super(stateMachine);
        this._name = "Player 2"
    }

    onStateEnter(){
        //Bloquear teclas del jugador 1
        //Subscribir a las transiciones
        EventDispatch.emit(Event.ENABLE_KEY,2);
        EventDispatch.emit(Event.UPDATE_PLAYER_TEXT,"azul")
        console.log("Player 2 key activated")
    }
    onStateExit(){
        EventDispatch.emit(Event.DISABLE_KEY,2);
        console.log("Player 2 key desactivated")
    }

    transition(){
        return this.stateMachine.stateList.checkState;
    }
}