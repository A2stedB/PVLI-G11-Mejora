import State from "./State.js";

//TODO
// - Subscribir las teclas en su correspondiente estado que lo necesita
// - La transicion ponerlo en el onStateEnter(), poner la comprobacion de transicion del estado dentro del onStateEnter(), puede no haber transicion

export class StateMachine{
    constructor(){
        // /**
        //  * @type {State}
        //  */
        this._name;
        this._currentState = null;
        this._context = null;
    }

    /**
     * 
     * @param {State} state 
     */
    setState(state){
        this._currentState = state;
    }

    onStateEnter(){
        if(this._currentState){
            this._currentState.onStateEnter();
        }
    }

    onStateExit(){
        if(this._currentState){
            this._currentState.onStateExit()
        }
    }

    transition(){
        /**
         * @type {State}
         */
        this._currentState.onStateExit();
        let nextState = this._currentState.transition();
        if(nextState){
            if(this.context){
                console.log(`${this.context.name}: ${this.context.currentState.name}`)
            }
            console.log(`Changing "${this.name}" from "${this._currentState.name}" to “${nextState.name}”`)
            this.setState(nextState)
            this._currentState.onStateEnter();
        }
    }

    get name(){
        return this._name;
    }

    get currentState(){
        return this._currentState;
    }

    get stateList(){}

    get context(){
        return this._context;
    }
}