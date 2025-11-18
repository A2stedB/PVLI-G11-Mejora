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
    constructor(stateMachine){
        super(stateMachine);
        this._name = "Move State"

    }
    onStateEnter(){
        /**
         * @type {Phaser.Input.Keyboard.Key}
         */
        this.up
        this.down
        this.left
        this.right;
        EventDispatch.emit(Event.UPDATE_PLAYER_ACTION_TEXT,"Move");
        if(this.stateMachine.context.name == "Player 1"){
            //Enable player 1 key
            this.up = this.stateMachine.scene.input.keyboard.addKey("W")
            this.down = this.s = this.scene.input.keyboard.addKey('S');
            this.left = this.a = this.scene.input.keyboard.addKey('A');
            this.right = this.d = this.scene.input.keyboard.addKey('D');
        }
        else if(this.stateMachine.context.name == "Player 2"){
            this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
            this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        }

        this.up.on("down",()=>{
            EventDispatch.emit(Event.MOVE)
            this.transition();
        })
        this.down.on("down",()=>{
            this.transition();
        })
        this.left.on("down",()=>{
            this.transition();
        })
        this.right.on("down",()=>{
            this.transition();
        })


    }

    onStateExit(){
        //Remove key listenener
        this.up.off("down");
        this.down.off("down");
        this.left.off("down");
        this.right.on("down");
    }

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.fireState)
    }
}