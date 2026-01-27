
export class RandomSide extends Phaser.Scene{
    constructor(){
        super({key:"RandomSide"})
    }

    preload(){
        this.load.image("Arrow","assets/up arrow.png")
    }

    create(data){
        // Si es 0 empieza izquierda, si es 1 entonces derecha

        this.cameras.main.setBackgroundColor("#d5d5d5");
        let rnd = Phaser.Math.Between(0,1);
        console.log(rnd);
        let width = this.cameras.main.width
        let height = this.cameras.main.height
        let arrow = this.add.image(width/2,height/2,"Arrow").setScale(0.5);

        arrow.setRotation(Phaser.Math.DegToRad((rnd + 1 + rnd) * 90))

        // this.add.tween({
        //     targets:arrow,
        //     duration:3000,
        //     props:{
        //         angle: Phaser.Math.DegToRad((rnd + 1 + rnd) * 90)
        //     },
        // })

        let order = [];
        order.push(rnd);
        if(rnd == 1) order.push(0);
        else order.push(1);

        // console.log(order)

        this.time.delayedCall(2000,()=>{
            this.scene.stop();
            data.gameManager.order = order;
            // console.log(data)
            data.gameManager.setOrder();
            this.scene.resume("GameScreen");
        })
        
    }
}