//------------------------------------------------------------------------
// 
// Estado del archivo: Nuevo
// 
// Description:
// 
// Una "pantalla" (escena) que sirve para ver el mapa
// 
//------------------------------------------------------------------------
export class MapView extends Phaser.Scene{

    constructor(config){
        super({key:"MapView"})
        this.config = config;
    }

    init(){}

    create(config){
        let matrix = config.matrix;
        this.matrix = config.matrix
        
        let toggleKey = this.input.keyboard.addKey("M");
        let toggleSubmarineViewKey = this.input.keyboard.addKey("N");

        toggleKey.on("down",()=>{
            matrix.setVisible(false);
            config.closeCallback();
            this.scene.stop();
            // Reanudar escena principal
            this.scene.resume("GameScreen");
        })

        toggleSubmarineViewKey.on("down",()=>{
            matrix.showingSubmarine = !matrix.showingSubmarine;
            this.toggleSubmarineVisibility(matrix.showingSubmarine,matrix);
        })

        this.screenWidth = this.cameras.main.width;   // 800
        this.screenHeight = this.cameras.main.height; // 600

        this.add.rectangle(0,0,this.screenWidth,this.screenHeight,0x1c2e4a,1).setOrigin(0,0).setDepth(-1);

        // Para que se vea bien por delante, sino solo estoy manipulando el que esta en la otra escena y se veria el fondo negro de aqui por delante;
        this.add.existing(matrix);
        matrix.setVisible(true);
        matrix.setAlpha(1);
    }

    /**
     * Toggle de la visibilidad de los sprites de los submarinos en el "mapa" (matriz);
     */
    toggleSubmarineVisibility(bool){
        this.matrix.submarines.forEach(submarine => {
            submarine.setVisible(bool)
        });
    }
}