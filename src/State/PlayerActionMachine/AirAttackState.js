import EventDispatch from "../../Event/EventDispatch.js";
import State from "../State.js";
import Event from "../../Event/Event.js";

export class AirAttackState extends State{

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
        this._name = "Air attack State"
    }

    onStateEnter(){
        // console.log("Air Attack Phase");
        EventDispatch.emit(Event.UPDATE_PLAYER_ACTION_TEXT,"Air Attack");

        if(this.stateMachine.context.currentState.id == 1){
            //Enable player 1 key
            this.up = this.stateMachine.scene.input.keyboard.addKey("W")
            this.down = this.stateMachine.scene.input.keyboard.addKey('S');
            this.left = this.stateMachine.scene.input.keyboard.addKey('A');
            this.right = this.stateMachine.scene.input.keyboard.addKey('D');
        }
        else if(this.stateMachine.context.currentState.id == 2){
            this.up = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            this.down = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
            this.left = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            this.right = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        }

        this.up.on("down",()=>{
            EventDispatch.emit(Event.AIR_ATTACK);
            this.transition();
        })
        this.down.on("down",()=>{
            EventDispatch.emit(Event.AIR_ATTACK);
            this.transition();
        })
        this.left.on("down",()=>{
            EventDispatch.emit(Event.AIR_ATTACK);
            this.transition();
        })
        this.right.on("down",()=>{
            EventDispatch.emit(Event.AIR_ATTACK);
            this.transition();
        })
    }

    onStateExit(){
        this.up.removeAllListeners();
        this.down.removeAllListeners();
        this.left.removeAllListeners();
        this.right.removeAllListeners();
    }

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.endState)
        // return this.stateMachine.stateList.endState;
    }
}