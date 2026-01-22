export class MapView extends Phaser.Scene{

    constructor(config){
        super({key:"MapView"})
        this.config = config;
    }

    init(){}

    create(config){
        let matrix = config.matrix;

        let toggleKey = this.input.keyboard.addKey("P");

        toggleKey.on("down",()=>{
            matrix.setVisible(false);
            config.closeCallback();
            this.scene.stop();
            // Reanudar escena principal
            this.scene.resume("GameScreen");
        })

        this.screenWidth = this.cameras.main.width;   // 800
        this.screenHeight = this.cameras.main.height; // 600

        this.add.rectangle(0,0,this.screenWidth,this.screenHeight,0x000000,1).setOrigin(0,0).setDepth(-1);
        this.add.existing(matrix);// Para que se vea bien por delante con el fondo negro, sino solo estoy manipulando el que esta en la otra escena y se veria el fondo negro de aqui por delante;
        matrix.setVisible(true);   
        matrix.setAlpha(1);     
    }
}