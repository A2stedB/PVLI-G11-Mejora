//------------------------------------------------------------------------
// 
// Estado del archivo: Limpiado
// 
// Description:
// 
// La ultima etapa de la maquina de estado
// 
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version:
// 
// 99.9% de las cosas ni se utlizaba...
// Limpieza muy grade.
// 
//------------------------------------------------------------------------
import State from "../State.js";
import { StateMachine } from "../StateMachine.js";

export class CheckState extends State {

    /**
     * @constructor
     * @param {StateMachine} stateMachine - La máquina del estado al que pertenece
     */
    constructor(stateMachine) {
        super(stateMachine);
        this._name = "Check State";
    }

    /**
     *  Método ejecutado al entrar en este estado
     */
    onStateEnter() {

        this.stateMachine.updateRound();
        
        console.log(`\n=== RONDA ${this.stateMachine.round} ===`);
        
        this.transition();
    }

    /**
     * Método ejecutado al salir de este estado
     */
    onStateExit() {
        // Nada especial al salir
    }

    /**
     * Transición al siguiente estado (Player1)
     */
    transition() {
        this.stateMachine.transition(this.stateMachine.stateList.player1);
    }
}