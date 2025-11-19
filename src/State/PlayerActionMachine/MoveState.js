import EventDispatch from "../../Event/EventDispatch.js";
import State from "../State.js";
import { FireState } from "./FireState.js"
import { AirAttackState } from "./AirAttackState.js"
import { StateMachine } from "../StateMachine.js";
import { PlayerActionMachine } from "./PlayerActionMachine.js";
import Event from "../../Event/Event.js";

//TODO
// - Cambiar el Player 1 a un ID generico
// - Pasar las teclas por InputManager para evitar dejar cosas en este script? Pero solo el sabe lo que necesita

export class MoveState extends State{

    /**
     * @type {Phaser.Input.Keyboard.Key}
     */
    up

    /**
     * @type {Phaser.Input.Keyboard.Key}
     */
    down

    /**
     * @type {Phaser.Input.Keyboard.Key}
     */
    left

    /**
     * @type {Phaser.Input.Keyboard.Key}
     */
    right



    constructor(stateMachine){
        super(stateMachine);
        this._name = "Move State"

    }
    onStateEnter(){

        EventDispatch.emit(Event.UPDATE_PLAYER_ACTION_TEXT,"Move");

        let currentPlayer = this.stateMachine.context.currentState.id

        if(currentPlayer == 1){
            //Enable player 1 key
            this.up = this.stateMachine.scene.input.keyboard.addKey("W")
            this.down = this.stateMachine.scene.input.keyboard.addKey('S');
            this.left = this.stateMachine.scene.input.keyboard.addKey('A');
            this.right = this.stateMachine.scene.input.keyboard.addKey('D');
        }
        else if(currentPlayer == 2){
            this.up = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            this.down = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
            this.left = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            this.right = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        }

        this.up.on("down",()=>{
            EventDispatch.emit(Event.MOVE,currentPlayer,0);
            this.transition();
        })
        this.down.on("down",()=>{
            EventDispatch.emit(Event.MOVE,currentPlayer,null);
            this.transition();
        })
        this.left.on("down",()=>{
            EventDispatch.emit(Event.MOVE,currentPlayer,-90);
            this.transition();
        })
        this.right.on("down",()=>{
            EventDispatch.emit(Event.MOVE,currentPlayer,90);
            this.transition();
        })
    }

    onStateExit(){
        this.up.off("down");
        this.down.off("down");
        this.left.off("down");
        this.right.off("down");
    }

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.fireState)
    }
}