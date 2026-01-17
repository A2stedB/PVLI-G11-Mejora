import { Orientation } from "./submarine-orientation-v2.js";

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
        this.setSize(this.screenWidth,this.screenHeight);
        this.setDepth(0);
        
        //calcular centros de las ventanas
        this.centerY = this.screenHeight / 2 + 50; // vertical es la misma
        this.centerXiz = this.screenWidth / 6;
        this.centerX = this.screenWidth / 2;
        this.centerXder = this.screenWidth  - (this.screenWidth / 6) ;

        this.createWindowLayer(this.screenWidth);

        this.enemy = this.scene.add.image(this.centerX, this.centerY, "sFront" ).setDisplaySize(250,250).setVisible(true);
        this.enemy.setDepth(1);
        this.add(this.enemy);

        this.toggleKey.on("down",()=>{
            this.show = !this.show;
            this.setVisible(this.show);
        }) 

        this.hideWater.on("down",()=>{
            Object.entries(this.view).forEach(element => {
                element[1].list.forEach(element => {
                    if(element.name == "water"){
                        element.setVisible(!element.visible);
                    }
                });
            });
        })
    }

    createWindowLayer(width){
        let viewWidth = width / 3;
        this.view.left = this.createSingleWindow(this.centerXiz,this.centerY,viewWidth,this.screenHeight);
        this.view.center = this.createSingleWindow(this.centerX,this.centerY,viewWidth,this.screenHeight);
        this.view.right = this.createSingleWindow(this.centerXder,this.centerY,viewWidth,this.screenHeight);
    }
    
    createSingleWindow(x,y,width,height){
        height = height - 20;
        let window = this.scene.add.container(0,0);
        let submarineWindow = this.scene.add.image(x,y,"SubWindow");
        submarineWindow.setDepth(-1);
        submarineWindow.setDisplaySize(width,height);

        let water = this.scene.add.image(x,y,"BG")
        water.setDepth(-3);
        water.setName("water")
        water.setDisplaySize(width,height);
        
        let land = this.scene.add.image(x,y,"Land");
        land.setDepth(-4);
        land.setDisplaySize(width,height);

        //El orden afecta...
        window.add(land);
        window.add(water);
        window.add(submarineWindow);

        this.add(window);

        return window;
    }

    checkR(me,enemy){
        
    }

}