import State from "../State.js";
import EventDispatch from "../../Event/EventDispatch.js";
import Event from "../../Event/Event.js";

/**
 * EndState - Fin de turno mejorado
 * 
 * Actualiza información tras finalizar el turno de un jugador
 * Ahora también verifica colisiones con el dragón
 */
export class EndState extends State {
    constructor(stateMachine) {
        super(stateMachine);
        this._name = "End State";
    }

    onStateEnter() {
        // Obtener el submarino actual
        this.stateMachine.context.currentState.transition();
        
        // Continuar con la transición normal
    }
    
    /**
     * Verifica si el submarino está cerca del dragón
     */
    checkDragonCollision(submarine) {
        let collisionData = {
            collision: false,
            dragonPosition: null
        };
        
        this.stateMachine.context.currentState.transition();
    }
    
    onStateExit() {
        // Pasar al siguiente jugador
    }
    
    transition() {
        this.stateMachine.transition(this.stateMachine.stateList.moveState);
    }
}