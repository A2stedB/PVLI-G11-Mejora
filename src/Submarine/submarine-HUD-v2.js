import UIdata from "../UI-data.json" with {type:"json"}
export class SubmarineHUDv2 extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene,0,0);
        
        this.scene = config.scene;
        
        this.submarine = config.submarine;
        // console.log(UIdata)
        this.initialize();
        this.scene.add.existing(this);
        
    }

    initialize(){
        let height = this.scene.cameras.main.height
        this.setPosition(0,height - UIdata.HUD.height)

        this.background = this.scene.add.image(0,0,"Submarine HUD")
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(UIdata.HUD.width,UIdata.HUD.height)
        this.background.setTint()
        this.add(this.background);

        this.healthBar;
    }
}