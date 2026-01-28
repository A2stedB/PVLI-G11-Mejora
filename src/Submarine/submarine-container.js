import SubmarineView2 from "./submarine-view.js";
import Orientation from "./submarine-orientation-v2.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";
import { Vector } from "../vector.js";
import { SubmarineHUDv2 } from "./submarine-HUD-v2.js";
import VictoryReason from "../game-victoryCondition.js";

export default class Submarine{

    constructor(config){ //config:{x,y,gameMatrix}
        this.scene = config.scene;

        this.config = config;
        this.data = config.data;
        this.name = this.data.name;
        this.gameManager = config.gamemanager;

        this.view = new SubmarineView2({scene:config.scene,submarine:this});
        this.hud = new SubmarineHUDv2({scene:config.scene,submarine:this});
        this.gameMatrix = config.gameMatrix;
        this.boardConfig = config.gameMatrix.config;
        this.orientation = config.orientation;

        this.position = new Vector(this.config.x,this.config.y)
        this.maxHealth = this.data.health;
        this.currentHealth = this.maxHealth;
        this.maxMunition = this.data.munition;
        this.currentMunition = this.maxMunition;
        this.damage = config.data.damage;
        this.order;

        this.initialize();

        EventDispatch.on(Event.MOVE,(c,direction)=>{
            if(c == this){
                let possibleDirection = Orientation.getAvailableDirection(this.orientation);
                let dir;
                if(direction == -90) dir = possibleDirection[0];
                else if(direction == 0) dir = possibleDirection[1];
                else if(direction == 90) dir = possibleDirection[2];
                if(direction != null) this.move(dir);
            }
        })

        EventDispatch.on(Event.SHOOT,(c,direction)=>{
            if(c == this){
                let possibleDirection = Orientation.getAvailableDirection(this.orientation);
                let dir;
                if(direction == -90) dir = possibleDirection[0];
                else if(direction == 0) dir = possibleDirection[1];
                else if(direction == 90) dir = possibleDirection[2];
                if(direction != null) this.shoot(dir);
            }
        })

    }

    initialize(){
        let boardWidth = this.boardConfig.boardWidth;
        let index = this.config.y * boardWidth + this.config.x;

        this.vertex = this.gameMatrix.vertexList[index];
        this.vertex.enter(this);
        this.gameMatrix.initSubmarine(this);

        this.gameMatrix.updateMap();
        this.view.updateView();
        this.hud.updateHUD();
    }

    move(direction){
        let nextX = this.position.x + direction.vector.x;
        let nextY = this.position.y + direction.vector.y;
        let boardWidth = this.boardConfig.boardWidth;
        let index = nextY * boardWidth + nextX;


        // Cambias de direccion de todas formas, se vera reflejado en las vistas
        this.orientation = direction;
        if(this.canMoveTo(nextX,nextY,index)){
            this.position.x = nextX;
            this.position.y = nextY;
            // this.orientation = direction;

            this.exitCurrent();

            this.vertex = this.gameMatrix.vertexList[index];
            this.vertex.enter(this);
            if(direction != null){
                this.scene.sound.stopAll();
                this.scene.sound.play("Move");
            }
            this.checkExit(this.vertex);
        }

        this.gameMatrix.updateMap();
        this.view.updateView();
    }

    shoot(direction){
        let nextX = this.position.x + direction.vector.x;
        let nextY = this.position.y + direction.vector.y;
        let boardWidth = this.boardConfig.boardWidth;
        let index = nextY * boardWidth + nextX;

        if(this.canMoveToWithoutEnemy(nextX,nextY)){
            let enemy = this.gameMatrix.vertexList[index].submarine;
            this.scene.sound.stopAll();
            this.scene.sound.play("Fire")
            if(enemy != null){
                enemy.removeHP(this.damage)
                if(enemy.currentHealth <= 0) {
                    this.gameManager.endOfGame(this,VictoryReason.defeatEnemy);
                }
            }
        }

        this.gameMatrix.updateMap();
        this.view.updateView();
        this.hud.updateHUD();
    }

    canMoveTo(newX, newY, index) {
        return (
            newX >= 0 &&
            newY >= 0 &&
            newX <= this.boardConfig.boardWidth - 1 &&
            newY <= this.boardConfig.boardHeight - 1 &&
            this.gameMatrix.vertexList[index].submarine == null
        );
    }

    canMoveToWithoutEnemy(newX, newY) {
        return (
            newX >= 0 &&
            newY >= 0 &&
            newX <= this.boardConfig.boardWidth - 1 &&
            newY <= this.boardConfig.boardHeight - 1)
    }

    exitCurrent(){
        this.vertex.submarine = null
    }

    updateView(){
        this.view.updateView();
    }

    removeHP(damage){
        this.currentHealth -= damage;
        if(this.currentHealth < 0) this.currentHealth = 0;
    }

    checkExit(vertex){
        if(this == vertex.exit){
            console.log("Exit reached");
            this.gameManager.endOfGame(this,VictoryReason.exitReached);
        }
    }

    
}