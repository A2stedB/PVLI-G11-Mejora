//------------------------------------------------------------------------
// 
// Estado del archivo: Nuebo
// 
// Description:
// 
// Una escena que sirve para decidir quien empieza jugando
// 
//------------------------------------------------------------------------
import UIdata from "../UI-data.json" with {type:"json"}
export class RandomSide extends Phaser.Scene{
    constructor(){
        super({key:"RandomSide"})
    }

    preload(){
        this.load.image("Arrow","assets/up arrow.png")
    }

    create(config){
        // Si es 0 empieza izquierda, si es 1 entonces derecha

        this.cameras.main.setBackgroundColor("#d5d5d5");
        let rnd = Phaser.Math.Between(0,1);
        let width = this.cameras.main.width
        let height = this.cameras.main.height
        let arrow = this.add.image(width/2,height/2,"Arrow").setScale(0.5);
        this.screenWidth = this.cameras.main.width;   // 800
        this.screenHeight = this.cameras.main.height; // 600

        arrow.setRotation(Phaser.Math.DegToRad(360 - (rnd + 1 + rnd) * 90))

        let order = [];

        order.push(rnd);
        if(rnd == 1) order.push(0);
        else order.push(1);

        let confirmKey = this.input.keyboard.addKey("SPACE");
        this.confirmText = this.add.text(this.screenWidth/2,this.screenHeight - UIdata.top + 40,"Press SPACE to continue",{fontSize:20,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5).setAlpha(0);
        let startSide = rnd == 0 ? "izquierdo":"derecho"
        this.startSideText = this.add.text(width/2,height/2,`Empieza el jugador ${startSide}`,{fontSize:20,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5).setAlpha(0);

        confirmKey.on("down",()=>{
            this.scene.stop();
            this.scene.launch("GameScreen",{order:order,left:config.leftConfig,right:config.rightConfig});
        })

        this.createTween(arrow)

    }

    /**
     * Tween de los textos
     * Que aesthetic LMAO
     */
    createTween(arrow){

        let showText = (text,delay)=>{
            this.add.tween({
                delay:delay,
                targets:text,
                duration:1000,
                repeat:0,
                loop:0,
                yoyo:0,
                props:{
                    alpha:1
                },
                onComplete:()=>{
                    showText(this.confirmText,1000)
                }
            })
        }

        this.add.tween({
            delay:1000,
            targets:arrow,
            duration:1000,
            repeat:0,
            loop:0,
            yoyo:false,
            props:{
                y:{value:'-=100'},
                scale:{value:"-=0.3"},
            },
            onComplete: ()=>{
                showText(this.startSideText,0)
            },
            callbackScope:this
        })

        
    }

}