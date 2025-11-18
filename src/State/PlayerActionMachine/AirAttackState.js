import EventDispatch from "../../Event/EventDispatch.js";
import State from "../State.js";
import Event from "../../Event/Event.js";

export class AirAttackState extends State{
    constructor(stateMachine){
        super(stateMachine);
        this._name = "Air attack State"
    }

    onStateEnter(){
        // console.log("Air Attack Phase");
        EventDispatch.emit(Event.UPDATE_PLAYER_ACTION_TEXT,"Air Attack");
    }

    onStateExit(){
        
    }

    transition(){
        return this.stateMachine.stateList.endState;
    }
}