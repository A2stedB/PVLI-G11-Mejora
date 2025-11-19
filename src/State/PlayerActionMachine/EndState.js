import State from "../State.js";

export class EndState extends State{
    constructor(stateMachine){
        super(stateMachine);
        this._name = "End State"
    }

    onStateEnter(){
        this.transition();
    }
    
    onStateExit(){
        this.stateMachine.context.currentState.transition();
    }
    
    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.moveState)
        // return this.stateMachine.stateList.moveState;
    }
}