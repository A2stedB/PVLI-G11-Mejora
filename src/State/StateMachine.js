import State from "./State.js";

//TODO
// - Subscribir las teclas en su correspondiente estado que lo necesita
// - La transicion ponerlo en el onStateEnter(), poner la comprobacion de transicion del estado dentro del onStateEnter(), puede no haber transicion

export class StateMachine{

    /**
     * @private
     * @type {Phaser.Scene} La escena en el que esta la maquina del estado
     */
    _scene;

    /**
     * @private
     * @type {String} Nombre de la maquina del estado, undefined por defecto
     */
    _name;

    /**
     * @private
     * @type {State} El estado actual 
     */
    _currentState;

    /**
     * @private
     * @type {*} El contexto de la maquina del estado, null por defecto
     * @
     */
    _context;


    /**
     * @constructor
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        this._scene = scene
        this._name;
        this._currentState = null;
        this._context = null;
    }

    /**
     * @method
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

    transition(state){
        /**
         * @type {State}
         */
        this._currentState.onStateExit();
        let nextState = state;
        if(nextState){
            if(this.context){
                console.log(`${this.context.name}: ${this.context.currentState.name}`)
            }
            console.log(`Changing "${this.name}" from "${this._currentState.name}" to “${nextState.name}”`)
            this.setState(nextState)
            this._currentState.onStateEnter();
        }
    }

    /**
     * @property
     */
    get name(){
        return this._name;
    }

    /**
     * @property
     */
    get currentState(){
        return this._currentState;
    }

    /**
     * @property
     */
    get stateList(){}

    /**
     * @property
     */
    get context(){
        return this._context;
    }

    
    get scene(){
        return this._scene;
    }
}