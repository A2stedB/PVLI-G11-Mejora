//------------------------------------------------------------------------
// 
// Estado del archivo: Nuevo
// 
// Description:
// 
// Una escena para la visualizacion de la posicion y de la orientacion antes de
// comenzar a jugar
//
//------------------------------------------------------------------------
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
        
        this.matrix.submarines[0].setVisible(true);
        this.matrix.submarines[1].setVisible(true);

        // Texto para continuar
        let confirmKey = this.input.keyboard.addKey("SPACE");
        this.confirmText = this.add.text(this.screenWidth/2,this.screenHeight - UIdata.top + 40,"Press SPACE to continue",{fontSize:20,fontFamily:"Inconsolata"}).setOrigin(0.5,0.5).setAlpha(0);

        console.log("Previewing map")

        confirmKey.on("down",()=>{
            matrix.setVisible(false);
            this.hideSubmarine();
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
        this.descriptiveText();
    }

    /**
     * Crear los parpadeos de los sprites
     */
    createTween(){

        this.add.tween({
            delay:3000,
            targets:this.confirmText,
            duration:1000,
            repeat:0,
            props:{
                alpha:1
            },
            yoyo:false,
        })

        let blink = (submarineSprite) =>{
            this.add.tween({
                targets:submarineSprite,
                duration:2000,
                repeat:-1,
                props:{
                    alpha:0
                },
                yoyo:true,
            })
        }

        blink(this.matrix.submarines[0])
        blink(this.matrix.submarines[1])

        let offSetX = this.screenWidth / 4;
        let mult = 1.5
        
        let right = this.matrix.submarines.find(s => s.submarine.id === 1);
        let rightSubmarine = this.add.image(this.screenWidth/2 + offSetX * mult,this.screenHeight / 2,"sTop").
                            setTint(right.submarine.data.color).
                            setScale(0.18).
                            setRotation(Phaser.Math.DegToRad(right.submarine.orientation.degree));

        let left = this.matrix.submarines.find(s => s.submarine.id === 0);
        let leftSubmarine = this.add.image(this.screenWidth/2 - offSetX * mult,this.screenHeight / 2,"sTop").
                            setTint(left.submarine.data.color).
                            setScale(0.18).
                            setRotation(Phaser.Math.DegToRad(left.submarine.orientation.degree));
    }

    /**
     * Poner los textos que describe la orientacion
     */
    descriptiveText(){
        let left = this.matrix.submarines.find(s => s.submarine.id === 0);
        let right = this.matrix.submarines.find(s => s.submarine.id === 1);

        if (!left || !right) {
            console.error("No se encontraron los submarinos por ID");
            return;
        }

        this.titleText = this.add.text(this.screenWidth/2,UIdata.top - 50,"Orientacion inicial",
        {
            fontFamily:"Inconsolata",
            fontSize:30,
            color: 'rgb(255, 255, 255)'
        }).setOrigin(0.5,0.5)

        let offSetY = this.screenHeight / 4;
        let offSetX = this.screenWidth / 4;
        let multX = 1.5
        let fontSize = 20

        let directionLeft = this.add.text(this.screenWidth/2 - offSetX * multX,this.screenHeight / 2 - offSetY,
                                          `${left.submarine.orientation.string}`,
                                          {fontSize:fontSize,fontFamily:"Inconsolata"}
                                        ).setOrigin(0.5,0.5)
        let directionRight = this.add.text(this.screenWidth/2 + offSetX * multX,this.screenHeight / 2 - offSetY,
                                          `${right.submarine.orientation.string}`,
                                          {fontSize:fontSize,fontFamily:"Inconsolata"}
                                        ).setOrigin(0.5,0.5)
    }

    /**
     * Esconder los sprites de nuevo para comenzar a jugar
     */
    hideSubmarine(){
        this.matrix.submarines[0].setAlpha(1);
        this.matrix.submarines[1].setAlpha(1);
        this.matrix.submarines[0].setVisible(false);
        this.matrix.submarines[1].setVisible(false);
    }
}