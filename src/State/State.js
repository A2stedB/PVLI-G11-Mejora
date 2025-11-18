import { StateMachine } from "./StateMachine.js";

export default class State{

    /**
     * @type {StateMachine}
     */
    _stateMachine

    constructor(stateMachine){
        this._stateMachine = stateMachine
        this._name;
    }

    /**
     * @abstract
     */
    onStateEnter(){

    }

    /**
     * @abstract
     */
    onStateExit(){

    }

    get name(){
        return this._name;
    }

    get stateMachine(){
        return this._stateMachine;
    }
}