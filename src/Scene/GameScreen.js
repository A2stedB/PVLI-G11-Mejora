//------------------------------------------------------------------------
// 
// Estado del archivo: refactorizado
// 
// Description:
// 
// La escena del juego
// 
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version:
// 
// QUE FKING LIMPIO ESTA ESTO QUE PRECIOSO!!!
// He quitado todo lo que tiene que ver con la pantalla del juego en si.
// Solo esta el GameManager, que es el que gestiona todo
// 
//------------------------------------------------------------------------
import image_assets from "../image.json" with {type:"json"}
import sound_assets from "../sound.json" with {type:"json"}
import { GameManager } from "../game-manager.js";

export class GameScreen extends Phaser.Scene{

    constructor(){
        super({key:"GameScreen"})
        
    }
    
    preload(){
        this.addLoadScreen();

        this.loadImage();
        this.loadAudio();
    }
    create(data){
        this.gameManager = new GameManager({scene:this,order:data.order,leftConfig:data.left,rightConfig:data.right});
    }

    /**
     * Carga las imagenes necesarias
     */
    loadImage(){
        image_assets.image.forEach(element => {
            this.load.image(element.key,element.path)
        });
    }

    /**
     * Carga los audios necesarios
     */
    loadAudio(){
        sound_assets.audio.forEach(element => {
            this.load.audio(element.key,element.path)
        });
    }

    /**
     * Pantalla de carga
     */
    addLoadScreen(){
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        })
    }
}