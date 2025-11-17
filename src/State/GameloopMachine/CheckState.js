import EventDispatch from "../../Event/EventDispatch.js";
import State from "../State.js";
import Event from "../../Event/Event.js";

export class CheckState extends State{
    constructor(stateMachine){
        super(stateMachine);
        this._name = "Check State"
    }

    onStateEnter(){
        this.stateMachine.updateTurn();
        EventDispatch.emit(Event.UPDATE_ROUND,this.stateMachine.round)
        console.log("Updating information")
        console.log(`Ronda ${this.stateMachine.turn}`)
    }
    onStateExit(){
        
    }

    transition(){
        return this.stateMachine.stateList.player1;
    }
}