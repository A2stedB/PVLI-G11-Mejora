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
        this._name = "Fire State"
        this.scene = this.stateMachine.scene;
    }

    onStateEnter(){

        EventDispatch.emit(Event.UPDATE_PLAYER_ACTION_TEXT,"Fire");
        
        let currentPlayer = this.stateMachine.context.currentState.id
        
        if(currentPlayer == 1){
            //Enable player 1 key
            this.up = this.stateMachine.scene.input.keyboard.addKey("W")
            this.down = this.stateMachine.scene.input.keyboard.addKey('S');
            this.left = this.stateMachine.scene.input.keyboard.addKey('A');
            this.right = this.stateMachine.scene.input.keyboard.addKey('D');
        }
        else if(currentPlayer== 2){
            this.up = this.stateMachine.scene.input.keyboard.addKey("UP");
            this.down = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
            this.left = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            this.right = this.stateMachine.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        }

        this.confirmButton = [this.left.keyCode,this.right.keyCode];

        this.setEvent();

        this.up.on("down",()=>{
            EventDispatch.emit(Event.SHOOT,this.confirmButton,0);
        })
        this.down.on("down",()=>{
            this.transition();
        })
        this.left.on("down",()=>{
            EventDispatch.emit(Event.SHOOT,this.confirmButton,-90);
        })
        this.right.on("down",()=>{
            EventDispatch.emit(Event.SHOOT,this.confirmButton,90);
        })
    }

    onStateExit(){
        this.up.off("down");
        this.down.off("down");
        this.left.off("down");
        this.right.off("down");
    }

    transition(){
        this.stateMachine.transition(this.stateMachine.stateList.endState)
    }

    setEvent(){
        EventDispatch.on(Event.SHOOT,(confirmButton,direction)=>{
            this.shoot();
            // this.scene.scene.pause();

            // this.scene.scene.launch("fireStateWindow",{

            //     //Teclas del jugador correspondiente
            //     confirmButton:confirmButton, 

            //     //cuando ya sabe la distancia que quiere disparar
            //     distanceCallback: (distance)=>{
            //         let range = distance;
            //         this.shoot(range,direction);
                    
            //     },

            //     //El id del jugador actual
            //     currentPlayer:this.stateMachine.context.currentState.id
            // })
        })
    }

    shoot(distance, direction){
        this.transition();
    }
}