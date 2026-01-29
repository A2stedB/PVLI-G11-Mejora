//------------------------------------------------------------------------
// 
// Estado del archivo: Refactorizado
// 
// Description:
// 
// Objeto que representa las vistas del submarino
// 
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version:
// 
// HE QUITADO LOS 48 IFS QUE HABIA
// HE QUITADO LOS 48 IFS QUE HABIA
// HE QUITADO LOS 48 IFS QUE HABIA
// 
// 
// 
//------------------------------------------------------------------------
import Orientation  from "./submarine-orientation-v2.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";
import UIdata from "../UI-data.json" with {type:"json"}

export default class SubmarineView2 extends Phaser.GameObjects.Container{

    scene
    show
    screenWidth
    screenHeight
    matrix

    constructor(config){
        super(config.scene,0,0);
        this.scene = null
        
        this.config = config;

        this.scene = config.scene;
        this.screenWidth = this.scene.cameras.main.width;   // 800
        this.screenHeight = this.scene.cameras.main.height; // 600

        this.submarine = config.submarine;
        this.gameManager = config.gameManager;
        this.matrix = config.matrix;
        this.show = true;
        this.view = {};
        this.viewArray = [];
        // this.toggleKey = this.scene.input.keyboard.addKey('M');
        // this.hideWater = this.scene.input.keyboard.addKey('H');
        this.enemy = null;

        this.initialize();

        this.scene.add.existing(this)
    }

    initialize(){
        this.setDepth(0);
        
        this.setPosition(0,UIdata.top)

        //calcular centros de las ventanas
        this.centerY = this.screenHeight / 2 + 50; // vertical es la misma
        this.centerXiz = this.screenWidth / 6;
        this.centerX = this.screenWidth / 2;
        this.centerXder = this.screenWidth  - (this.screenWidth / 6) ;

        this.createWindowLayer();

        this.enemy = this.scene.add.image(this.centerX, this.centerY, "sLeft" ).setDisplaySize(250,250).setVisible(true);
        this.enemy.setDepth(-3);
        this.setVisible(false)
        this.add(this.enemy);

        
        this.torpedo = this.scene.add.circle(this.centerX,this.centerY,20,0x000000,1).setVisible(false).setDepth(-2);
        this.add(this.torpedo)

        // Animacion de mover
        EventDispatch.on(Event.MOVE,(sub,direction)=>{
            if(direction == null) return;
            Object.entries(this.view).forEach(view => {
                    this.scene.add.tween({
                        targets:view[1].moveEffect,
                        duration:1500,
                        props:{
                            alpha:1
                        },  
                        yoyo:true
                    })
                });
            });

        // Animacion de disparar
        EventDispatch.on(Event.SHOOT,(c,direction)=>{
            let view;
            if(direction == 0) view = this.view.center.container;
            else if(direction == -90) view = this.view.left.container;
            else if(direction == 90) view = this.view.right.container;
            
            this.torpedo.setPosition(view.x+(direction/2),view.y+200).setVisible(true).setDepth(-2).setAlpha(1).setScale(1);
            this.scene.add.tween({
                targets:this.torpedo,
                duration:2000,
                props:{
                    y:view.y,
                    x:view.x,
                    scale:0,
                },
                yoyo:false,
                onComplete:()=>{
                    this.torpedo.setPosition(this.centerX,this.centerY).setAlpha(0).setVisible(false)
                },
                callBackScope:this
            })
        })
    }

    // Crear las vistas
    createWindowLayer(){
        let viewWidth = this.screenWidth / 3;
        let viewHeight = this.screenHeight - UIdata.top - UIdata.HUD.height;

        this.centerY = viewHeight / 2;
        this.view.left = this.createSingleWindow(this.centerXiz,this.centerY,viewWidth,viewHeight);
        
        this.view.center = this.createSingleWindow(this.centerX,this.centerY,viewWidth,viewHeight);

        this.view.right = this.createSingleWindow(this.centerXder,this.centerY,viewWidth,viewHeight);

        this.viewArray.push(this.view.left,this.view.center,this.view.right);
    }
    
    // Crear una vista
    createSingleWindow(x,y,width,height){

        let view = {}
        view.container = null;
        view.bg = null;
        view.moveEffect = null;

        let window = this.scene.add.container(x,y);

        //0 0 respecto del "centro" del container...
        let submarineWindow = this.scene.add.image(0,0,"SubWindow");
        submarineWindow.setDepth(-1);
        submarineWindow.setDisplaySize(width,height);
        // this.scene.add.existing(submarineWindow)

        let water = this.scene.add.image(0,0,"BG")
        water.setDepth(-3);
        water.setName("water")
        water.setDisplaySize(width,height);

        let speedingEffect = this.scene.add.image(0,0,"Speed effect")
        speedingEffect.setName("move");
        speedingEffect.setDepth(-2);
        speedingEffect.setDisplaySize(width,height);
        speedingEffect.setAlpha(0);

        //El orden afecta...
        window.add(water);
        window.add(speedingEffect);
        window.add(submarineWindow);

        this.add(window);
        view.container = window;
        view.bg = water;
        view.moveEffect = speedingEffect;

        return view;
    }

    // Refresh de las vistas
    updateView(){
        let directions = Orientation.getAvailableDirection(this.submarine.orientation)
        this.enemy.setVisible(false);

        //izquierda centro derecha
        for(let i = 0; i < 3;++i){
            let direction = directions[i];
            let window = this.viewArray[i];
            let matrix = this.submarine.gameMatrix;

            let x = this.submarine.position.x + direction.vector.x;
            let y = this.submarine.position.y + direction.vector.y;

            this.switchToWater(window)
            if(!this.submarine.canMoveToWithoutEnemy(x,y)){
                this.switchToLand(window);
            }
            else{
                let boardWidth = this.submarine.boardConfig.boardWidth;
                let index = y * boardWidth + x;
                let vertex = matrix.vertexList[index];
                // console.log(vertex.position, vertex.submarine)
                if(vertex.submarine != null){
                    this.checkRotations(this.submarine,vertex.submarine,i)
                    this.enemy.setScale(0.2);
                    this.enemy.setTint(vertex.submarine.data.color)
                    this.enemy.setPosition(window.container.x,window.container.y);
                    this.enemy.setVisible(true);
                }
            }
        }
    }   

    // Cambiar el fondo de una vista a la tierra(borde)
    switchToLand(view){
        let viewWidth = this.screenWidth / 3;
        let viewHeight = this.screenHeight - UIdata.top - UIdata.HUD.height;
        view.bg.setTexture("Land").setDisplaySize(viewWidth,viewHeight);
    }

    // Cambiar el fondo de una vista a la agua
    switchToWater(view){
        let viewWidth = this.screenWidth / 3;
        let viewHeight = this.screenHeight - UIdata.top - UIdata.HUD.height;
        view.bg.setTexture("BG").setDisplaySize(viewWidth,viewHeight);
    }

    // Metodo auxiliar para cambiar el sprite del enemigo
    changeSprite(rotation)
    {
        switch (rotation) {
            case 'front':
                this.enemy.setTexture("sFront");
                break;
            case 'back':
                this.enemy.setTexture("sBack");
                break;
            case 'right':
                this.enemy.setTexture("sRight");
                break; 
            case 'left':
                this.enemy.setTexture("sLeft");
                break;
        }
    }

    /**
     * Dado tu y otro submarino rival, averiguar como se ve el rival desde tu punto de vista
     */
    checkRotations(me, enemy, side)
    {
        // El % no es %
        let mod = (n, m) =>  {return (n % m + m) % m}

        const sideOffsets = [-90, 0, 90];
        const myDirectionAngle = me.orientation.degree + sideOffsets[side]; // Poner la vista de "frente" respecto al enemigo

        let diff = mod(enemy.orientation.degree - myDirectionAngle + 360,360);

        if (diff === 0) this.changeSprite("back");
        else if (diff === 180) this.changeSprite("front");
        else if (diff === 90) this.changeSprite("left");
        else if (diff === 270) this.changeSprite("right");

        //48 IFS!!!!!
        //48 IFS!!!!!
        //48 IFS!!!!!
    }
}