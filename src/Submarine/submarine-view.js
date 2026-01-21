import { Orientation } from "./submarine-orientation-v2.js";
import EventDispatch from "../Event/EventDispatch.js";
import Event from "../Event/Event.js";

export default class SubmarineView2 extends Phaser.GameObjects.Container{

    scene
    show
    screenWidth
    screenHeight
    matrix



    constructor(config){
        super(config.scene,0,0);
        
        this.config = config;

        this.scene = config.scene;
        this.screenWidth = this.scene.cameras.main.width;   // 800
        this.screenHeight = this.scene.cameras.main.height - 100; // 600

        this.gameManager = config.gameManager;
        this.matrix = config.matrix;
        this.show = true;
        this.view = {};
        this.toggleKey = this.scene.input.keyboard.addKey('M');
        this.hideWater = this.scene.input.keyboard.addKey('H');
        this.enemy = null;

        this.initialize();

        this.scene.add.existing(this)
    }

    initialize(){
        // this.setSize(this.screenWidth,this.screenHeight);
        this.setDepth(0);
        
        //calcular centros de las ventanas
        this.centerY = this.screenHeight / 2 + 50; // vertical es la misma
        this.centerXiz = this.screenWidth / 6;
        this.centerX = this.screenWidth / 2;
        this.centerXder = this.screenWidth  - (this.screenWidth / 6) ;


        //TODO: Cambiar esto
        this.createWindowLayer();

        // this.enemy = this.scene.add.image(this.centerX, this.centerY, "sFront" ).setDisplaySize(250,250).setVisible(true);
        // this.enemy.setDepth(1);
        // this.add(this.enemy);

        this.torpedo = this.scene.add.circle(this.centerX,this.centerY,20,0x000000,1).setVisible(false).setDepth(-2);
        this.add(this.torpedo)

        this.toggleKey.on("down",()=>{
            this.show = !this.show;
            this.setVisible(this.show);
        }) 

        // this.hideWater.on("down",()=>{
        //     Object.entries(this.view).forEach(element => {
        //         element[1].list.forEach(element => {
        //             if(element.name == "water"){
        //                 element.setVisible(!element.visible);
        //             }
        //         });
        //     });
        // })


        EventDispatch.on(Event.MOVE,()=>{
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

        EventDispatch.on(Event.SHOOT,(c,direction)=>{
            let view;
            if(direction == 0) view = this.view.center.container;
            else if(direction == -90) view = this.view.left.container;
            else if(direction == 90) view = this.view.right.container;
            
            this.torpedo.setPosition(view.x,view.y+200).setVisible(true).setDepth(-2).setAlpha(1).setScale(1);
            this.scene.add.tween({
                targets:this.torpedo,
                duration:2000,
                props:{
                    y:view.y,
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

    createWindowLayer(){
        let viewWidth = this.screenWidth / 3;
        let viewHeight = this.screenHeight - 20;
        this.view.left = this.createSingleWindow(this.centerXiz,this.centerY,viewWidth,viewHeight);
        
        this.view.center = this.createSingleWindow(this.centerX,this.centerY,viewWidth,viewHeight);

        this.view.right = this.createSingleWindow(this.centerXder,this.centerY,viewWidth,viewHeight);
    }
    
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

    checkR(me,enemy){
        
    }

    switchToLand(view){
        let viewWidth = this.screenWidth / 3;
        let viewHeight = this.screenHeight - 20;
        view.bg.setTexture("Land").setDisplaySize(viewWidth,viewHeight);
    }

    switchToWater(view){
        let viewWidth = this.screenWidth / 3;
        let viewHeight = this.screenHeight - 20;
        view.bg.setTexture("BG").setDisplaySize(viewWidth,viewHeight);
    }

}