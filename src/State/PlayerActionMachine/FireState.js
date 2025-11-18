import EventDispatch from "../../Event/EventDispatch.js";
import State from "../State.js";
import Event from "../../Event/Event.js";

export class FireState extends State{
    constructor(stateMachine){
        super(stateMachine);
        this._name = "Fire State"
    }

    onStateEnter(){
        // console.log("Fire Phase");
        EventDispatch.emit(Event.UPDATE_PLAYER_ACTION_TEXT,"Fire");
    }

    onStateExit(){
        
    }

    transition(){
        return this._stateMachine.stateList.airAttackState;
    }
}