//------------------------------------------------------------------------
// 
// Estado del archivo: Sin tocar
// 
//------------------------------------------------------------------------
import State from "../State.js";

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
    }

    
    onStateExit() {
    }
    
    transition() {
        this.stateMachine.transition(this.stateMachine.stateList.moveState);
    }
}