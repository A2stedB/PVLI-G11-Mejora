import Event from "../../Event/Event.js";
import EventDispatch from "../../Event/EventDispatch.js";
import { StateMachine } from "../StateMachine.js";
import { PlayerState } from "./PlayerState.js";

/**
 * El "jugador" con submarino azul
 * @extends {PlayerState}
 * @class
 */
export class Player2 extends PlayerState{
    /**
     * 
     * @param {StateMachine} stateMachine
     * @param {Number} id El id del jugador 
     */
    constructor(stateMachine,id){
        super(stateMachine,id);
        this._name = "Player 2"
    }

    onStateEnter(){
        let camera = this.stateMachine._scene.cameras.main;
        camera.fadeIn(2000);
        this.stateMachine._gameManager.setCurrentSubmarine(this._id);
        let player = this.stateMachine.getCurrentSubmarine(this._id).data.country
        console.log(player);
        EventDispatch.emit(Event.UPDATE_CURRENT_PLAYER,player)
    }
    onStateExit(){
        EventDispatch.emit(Event.END_TURN);
    }

    transition(){
        let camera = this.stateMachine._scene.cameras.main;
        camera.fadeOut(2000);
        camera.once("camerafadeoutcomplete",()=>{
            this.stateMachine.transition(this.stateMachine.stateList.checkState)
        })
    }
}