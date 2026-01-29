//------------------------------------------------------------------------
// 
// Estado del archivo: Modificado
// 
// Description:
// 
// El estado para el primero que empieza
// 
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version:
// 
// Ahora hay efecto de fade in fade out, guay.
//
// Esta el booleano de isTransitioning porque no sabia que se puede stackear llamadas
// y habia casos en el que se llama muchas veces al onStateEnter()
// 
//------------------------------------------------------------------------
import { PlayerState } from "./PlayerState.js";
import EventDispatch from "../../Event/EventDispatch.js";
import Event from "../../Event/Event.js";

/**
 * El "jugador" con submarino rojo
 * @extends {PlayerState}
 * @class
 */
export class Player1 extends PlayerState{

    /**
     * @constructor
     * @param {StateMachine} stateMachine
     * @param {Number} id El id del jugador 
     */
    constructor(stateMachine,id){
        super(stateMachine,id);
        this._name = "Player 1"
        this.isTransitioning = false;
    }

    onStateEnter(){
        this.isTransitioning = false;
        this.stateMachine._gameManager.setCurrentSubmarine(this._id);
        let player = this.stateMachine.getCurrentSubmarine(this._id).data.country
        console.log(player);
        EventDispatch.emit(Event.UPDATE_CURRENT_PLAYER,player)

        // CurrentState??
        this.stateMachine._gameManager.playerActionMachine.transition(
            this.stateMachine._gameManager.playerActionMachine.stateList.moveState
        );
    }
    onStateExit(){
        
    }
    

    transition(){
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        let camera = this.stateMachine._scene.cameras.main;
        camera.fadeOut(2000);
        camera.once("camerafadeoutcomplete",()=>{
            camera.fadeIn(2000);
            this.stateMachine.transition(this.stateMachine.stateList.player2)

        })
    }
}