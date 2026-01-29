//------------------------------------------------------------------------
// 
// Estado del archivo: Modificado
// 
// Description:
// 
// 
// 
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version:
// 
// Ahora y un delay por la animacion y el sonido
// 
//------------------------------------------------------------------------
import EventDispatch from "../../Event/EventDispatch.js";
import State from "../State.js";
import Event from "../../Event/Event.js";


/**
 * El estado de disparar
 */
export class FireState extends State{

    /**
     * Frente
     * @type {Phaser.Input.Keyboard.Key}
     */
    up

    /**
     * No disparar
     * @type {Phaser.Input.Keyboard.Key}
     */
    down

    /**
     * Izquierda
     * @type {Phaser.Input.Keyboard.Key}
     */
    left

    /**
     * Derecha
     * @type {Phaser.Input.Keyboard.Key}
     */
    right

    /**
     * @type {Phaser.Scene}
     */
    scene

    constructor(stateMachine){
        super(stateMachine);
        this._name = "Fire"
        this.scene = this.stateMachine._scene;
    }

    onStateEnter(){

        EventDispatch.emit(Event.UPDATE_ACTION,this._name)
        
        let currentPlayer = this.stateMachine.context.currentState.id
        let submarine = this.stateMachine.context.getCurrentSubmarine();
        
        if(currentPlayer == 0){
            //Enable player 1 key
            this.up = this.stateMachine.scene.input.keyboard.addKey("W")
            this.down = this.stateMachine.scene.input.keyboard.addKey('S');
            this.left = this.stateMachine.scene.input.keyboard.addKey('A');
            this.right = this.stateMachine.scene.input.keyboard.addKey('D');
        }
        else if(currentPlayer== 1){
            this.up = this.stateMachine.scene.input.keyboard.addKey("UP");
            this.down = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
            this.left = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            this.right = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        }

        this.setEvent();

        this.up.on("down",()=>{
            EventDispatch.emit(Event.SHOOT,submarine,0);
        })
        this.down.on("down",()=>{
            this.transition();
        })
        this.left.on("down",()=>{
            EventDispatch.emit(Event.SHOOT,submarine,-90);
        })
        this.right.on("down",()=>{
            EventDispatch.emit(Event.SHOOT,submarine,90);
        })
    }

    onStateExit(){
        if (this.up) this.up.removeAllListeners("down");
        if (this.down) this.down.removeAllListeners("down");
        if (this.left) this.left.removeAllListeners("down");
        if (this.right) this.right.removeAllListeners("down");
    }

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.endState)
    }

    setEvent(){
        EventDispatch.on(Event.SHOOT,(confirmButton,direction)=>{
            this.shoot();
        })
    }

    shoot(distance, direction){
        this.scene.time.delayedCall(2 * 1000,()=>{
            this.transition();
        })
    }
}