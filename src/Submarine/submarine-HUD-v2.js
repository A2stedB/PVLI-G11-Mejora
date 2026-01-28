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
        let alignTop = 40;

        // El fondo
        this.background = this.scene.add.image(0,0,"Submarine HUD")
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(UIdata.HUD.width,UIdata.HUD.height)
        this.background.setTint(this.submarine.data.color)
        this.add(this.background);

        this.top = this.scene.add.image(0,0,"Submarine HUD top").setOrigin(0,0).setDisplaySize(800,UIdata.top).setTint(this.submarine.data.color)
        let topY = 0 - height + UIdata.HUD.height;
        this.top.setPosition(0,topY)
        this.add(this.top)
        
        // La barra de vida
        this.healthBarContainer = this.scene.add.container(60,alignTop)
        this.healthText = this.scene.add.text(0,0,"Presion",{fontFamily: 'inconsolata', fontSize: 20, color: '#FFFFFF'})
        let healthBarHeight = this.healthText.displayHeight;
        let healthBarWidth = this.healthText.displayWidth;

        let offset = 10;
        let numOffset = 60
        this.healthBarBackground = this.scene.add.rectangle(0,healthBarHeight + offset,200,20,0x00999966).setOrigin(0,0);
        this.healthBar = this.scene.add.rectangle(0,healthBarHeight + offset ,200,20,0x8B0000).setOrigin(0,0)
        this.healthBarNum = this.scene.add.text(healthBarWidth + numOffset ,0,"0",{fontFamily: 'inconsolata', fontSize: 20, color: '#FFFFFF'})
        this.healthBarContainer.add([this.healthBarBackground,this.healthBar,this.healthText,this.healthBarNum]);
        this.add(this.healthBarContainer)

        // Municion
        this.munitionContainer = this.scene.add.container(500,alignTop);
        this.munitionText = this.scene.add.text(0,0,"Munition",{fontFamily: 'inconsolata', fontSize: 20, color: '#FFFFFF'})
        let munitionTextHeight = this.munitionText.displayHeight;
        this.munitionNum = this.scene.add.text(0,munitionTextHeight + offset,"0",{fontFamily: 'inconsolata', fontSize: 20, color: '#FFFFFF'})
        this.munitionContainer.add([this.munitionText,this.munitionNum]);
        this.add(this.munitionContainer)

        this.setVisible(false);
    }

    updateHUD(){

        let submarine = this.submarine
        // Update health
        let currentHPpercent = submarine.currentHealth / submarine.maxHealth;
        this.healthBar.width = 200 * currentHPpercent;
        this.healthBarNum.setText(`${submarine.currentHealth} / ${submarine.maxHealth}`)

        // Update munition count
        this.munitionNum.setText(`${submarine.currentMunition} / ${submarine.maxMunition}`)
    }
}