//------------------------------------------------------------------------
// 
// Estado del archivo: Nuevo
// 
// Description:
// 
// Un menu para la seleccion de los "personajes"
// 
// Comentario:
// Esto es lo que tenia mas claro de hacer desde hace 14 dias,
// y termino haciendo 2 dias antes de la entrega LOL.
// 
//------------------------------------------------------------------------
import UIdata from "../UI-data.json" with {type:"json"}
import SubmarineData from "../Submarine/submarine-data.json" with {type:"json"}
import al_assets from "../submarine_sprite.json" with {type:"json"}

export class SelectionMenu extends Phaser.Scene{

    constructor(){
        super({key:"SelectionMenu"})
    }

    init(){}

    preload(){
        this.loadImage();
        this.addLoadScreen();
    }

    create(){
        this.screenWidth = this.cameras.main.width;   // 800
        this.screenHeight = this.cameras.main.height; // 600

        this.data = JSON.parse(JSON.stringify(SubmarineData))
        this.dataList = Object.entries(JSON.parse(JSON.stringify(SubmarineData)));
        
        let centerY = this.screenHeight / 2;
        let centerX = this.screenWidth / 2
        this.leftIndex = 0;
        this.rightIndex = 1;

        this.leftKey = this.input.keyboard.addKey("A")
        this.rightKey = this.input.keyboard.addKey("RIGHT")
        
        this.leftContainer = {};
        this.rightContainer = {};

        // Se haria para que comienze una vez que ambos hayan confirmado, pero me da pereza
        let confirmKey = this.input.keyboard.addKey("SPACE");
        this.confirmText = this.add.text(this.screenWidth/2,UIdata.top,"Press SPACE to continue",{fontSize:20,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5).setDepth(3);
        confirmKey.on("down",()=>{
            this.scene.stop();
            this.scene.launch("RandomSide",{leftConfig:this.leftContainer.data,rightConfig:this.rightContainer.data});
        })

        // let split = this.add.rectangle(centerX,0,10,this.screenHeight - UIdata.top,"0x000000",1).setDepth(2).setOrigin(0.5,0);
        this.initialize();
    }

    initialize(){
        let fontSize = 20

        // switch izquierdo
        this.leftKey.on("down",()=>{
            let mod = (n, m) => {return (n % m + m) % m}
            this.leftIndex = mod(++this.leftIndex,this.dataList.length);
            this.updateInfoWithTween(this.leftContainer,this.leftIndex,0);

        })

        // switch derecho
        this.rightKey.on("down",()=>{
            let mod = (n, m) => {return (n % m + m) % m}
            this.rightIndex = mod(++this.rightIndex,this.dataList.length);
            this.updateInfoWithTween(this.rightContainer,this.rightIndex,1);
        })
        let centerX = this.screenWidth / 2

        // Inicializar la informacion de los personajes en ambos lados
        this.leftContainer = {};
        this.leftContainer.container = this.add.container(0,0)
        this.initializeInfo(this.leftContainer,this.leftIndex)
        this.add.text(centerX/2,this.screenHeight - 30,"Press A to change",{fontSize:fontSize,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5).setDepth(3)
        
        this.rightContainer = {};
        this.rightContainer.container = this.add.container(centerX,0)
        this.initializeInfo(this.rightContainer,this.rightIndex)
        this.add.text(centerX + centerX/2,this.screenHeight - 30,"Press \u2192 to change",{fontSize:fontSize,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5).setDepth(3)
    }

    /**
     * Inicializar la informacion de un "personaje"
     */
    initializeInfo(container,index){

        // Meter aqui el objeto real tb
        let submarine = this.dataList[index];
        let model = submarine[0];
        container.data = this.data[model];
        // console.log(container.data)
        let centerX = this.screenWidth / 4
        let centerY = this.screenHeight / 2
        let fontSize = 30

        // El fondo
        let color = submarine[1].color;
        let background = this.add.rectangle(0,0,this.screenWidth/2,this.screenHeight,color,1).setOrigin(0,0).setDepth(-1);
        container.background = background;
        container.container.add(container.background)

        // El pais
        let country = submarine[1].country;
        let nameHeight = 50;
        container.sub = this.add.text(centerX,nameHeight,`${model} - ${country}`,{fontSize:fontSize,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5);
        container.container.add(container.sub);
        
        // health
        let health = submarine[1].health
        let baseOffSetY = 200;
        let offSetY = 20
        container.health = this.add.text(centerX,centerY + baseOffSetY,`Health: ${health}`,{fontSize:fontSize - 10,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5);
        container.container.add(container.health);

        // munition
        let healthTextHeight = container.health.displayHeight
        let munition = submarine[1].munition
        container.munition = this.add.text(centerX,centerY + baseOffSetY + offSetY,`Munition: ${munition}`,{fontSize:fontSize - 10,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5);
        container.container.add(container.munition);

        // damage 
        let damage = submarine[1].damage
        container.damage = this.add.text(centerX,centerY + baseOffSetY + offSetY * 2,`Damage: ${damage}`,{fontSize:fontSize - 10,fontFamily:"Inconsolata",color:"0x000000"}).setOrigin(0.5,0.5);
        container.container.add(container.damage);

        let sprite = model;
        container.sprite = this.add.image(centerX,centerY,model).setScale(0.2);
        container.container.add(container.sprite);
    }

    updateInfoWithTween(container,index, lr){
        let aux_container = {}
        aux_container.container = this.add.container(container.container.x,-this.screenHeight);

        this.initializeInfo(aux_container,index);
        if(lr == 0) this.changeLeft(container,aux_container);
        else this.changeRight(container,aux_container);
        
    }


    // left and right seperated
    // arriba a abajo
    /**
     * Para la animacion de cambio del lado izquierdo
     */
    changeLeft(old,actual){
        let screenHeight = this.screenHeight;
        this.add.tween({
            targets:old.container,
            repeat:0,
            yoyo:false,
            duration:500,
            props:{
                y: screenHeight
            },
            onComplete:()=>{
                old.container.destroy();
            }
        })

        this.add.tween({
            targets:actual.container,
            repeat:0,
            yoyo:false,
            duration:500,
            props:{
                y: 0
            },
            onComplete:()=>{
                this.leftContainer = actual;  // a saber que hace la memoria con el actual
            }
        })
    }

    // abajo a arriba
    /**
     * Para la animacion de cambio del lado derecho
     */
    changeRight(old,actual){
        let screenHeight = this.screenHeight;
        // console.log(actual)
        actual.container.setPosition(actual.container.x,screenHeight);
        this.add.tween({
            targets:old.container,
            repeat:0,
            yoyo:false,
            duration:500,
            props:{
                y: -screenHeight
            },
            onComplete:()=>{
                old.container.destroy();
            }
        })

        this.add.tween({
            targets:actual.container,
            repeat:0,
            yoyo:false,
            duration:500,
            props:{
                y: 0
            },
            onComplete:()=>{
                this.rightContainer = actual;  // a saber que hace la memoria con el actual
            }
        })
    }

    /**
     * Cargar los assets
     */
    loadImage(){
        al_assets.image.forEach(element => {
            this.load.image(element.key,element.path)
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