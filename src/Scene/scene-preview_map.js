import UIdata from "../UI-data.json" with {type:"json"}
export class MapPreView extends Phaser.Scene{

    constructor(config){
        super({key:"MapPreview"})
        this.config = config;
    }

    init(){}

    create(config){
        this.screenWidth = this.cameras.main.width;   // 800
        this.screenHeight = this.cameras.main.height; // 600

        let matrix = config.matrix;
        this.matrix = config.matrix
        
        // Texto para continuar
        let confirmKey = this.input.keyboard.addKey("SPACE");

        // Hacer que parpadee
        this.confirmText = this.add.text(this.screenWidth/2,this.screenHeight - UIdata.top + 40,"Press SPACE to continue",{fontSize:20,fontFamily:"Inconsolata"}).setOrigin(0.5,0.5);

        console.log("Previewing map")

        confirmKey.on("down",()=>{
            matrix.setVisible(false);
            config.closeCallback();
            this.scene.stop();
            // Reanudar escena principal
            this.scene.resume("GameScreen");
        })


        this.add.rectangle(0,0,this.screenWidth,this.screenHeight,0x1c2e4a,1).setOrigin(0,0).setDepth(-1);
        this.add.existing(matrix);
        matrix.setVisible(true);   
        matrix.setAlpha(1);

        this.createTween();
    }

    createTween(){
        this.add.tween({
            targets:this.confirmText,
            duration:1000,
            repeat:-1,
            props:{
                alpha:0
            },
            yoyo:true,
        })
    }
}