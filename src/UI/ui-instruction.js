
export default class InstructionUI extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene,0,0);

        this.scene = config.scene;
        this.screenWidth = this.scene.cameras.main.width;   // 800
        this.height = 45;
        this.fontSize = config.fontSize;
        this.background = this.scene.add.rectangle(this.screenWidth/2, 30, this.screenWidth, 60, 0x00CC9966, 1)

        this.availableAction = ["mover","disparar"];

        this.keySet1 = ["\u2190","\u2191","\u2192"]
        this.keySet2 = ["A","W","D"]
        this.currentKeySet = this.keySet2
        this.leftKey = this.currentKeySet[0]
        this.fowardKey = this.currentKeySet[1]
        this.rightKey = this.currentKeySet[2]

        this.currentAction = this.availableAction[0];
        this.initialize();

        this.scene.add.existing(this);

    }

    initialize(){

        this.centerY = this.screenHeight / 2 + 50; // vertical es la misma
        this.centerXiz = this.screenWidth / 6;
        this.centerX = this.screenWidth / 2;
        this.centerXder = this.screenWidth  - (this.screenWidth / 6) ;

        this.scene.add.text(this.centerXiz,this.height,`${this.leftKey} ${this.currentAction} izquierda`,{ fontSize: this.fontSize, fill: '#fff' }).setOrigin(0.5,0.5)
        this.scene.add.text(this.centerX,this.height,`${this.fowardKey} ${this.currentAction} delante`,{ fontSize: this.fontSize, fill: '#fff' }).setOrigin(0.5,0.5)
        this.scene.add.text(this.centerXder,this.height,`${this.rightKey} ${this.currentAction} derecha`,{ fontSize: this.fontSize, fill: '#fff' }).setOrigin(0.5,0.5)

        
    }
}