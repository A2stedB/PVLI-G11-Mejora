import {StateMachine} from "../StateMachine.js";
import { Player1 } from "./Player1.js";
import { Player2 } from "./Player2.js";
import { CheckState } from "./CheckState.js";
export class GameLoopMachine extends StateMachine{
    constructor(){
        super();
        this._round = 0;
        this._name = "Gameloop Machine"
        this._player1 = new Player1(this);
        this._player2 = new Player2(this);
        this._checkState = new CheckState(this);

        this._currentState = this._player1;
    }

    get stateList(){
        let availableStates = Object.freeze({
            player1: this._player1,
            player2: this._player2,
            checkState: this._checkState,
        })
        return availableStates;
    }

    updateTurn(){
        ++this._round;
        this.transition();
    }

    get round(){
        return this._round;
    }
}