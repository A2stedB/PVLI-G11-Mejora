
//TODO:
//Vincular las vistas con el tablero y el submarino de verdad, pasandole a esto como parametros

export default class SubmarineView extends Phaser.GameObjects.Container{
/**
     * @param {Phaser.Scene} scene - La escena de Phaser
     * @param {SubmarineComplete} redSubmarine  - El submarino rojo
     * @param {SubmarineComplete} blueSubmarine - El submarino azul
     * @param {Number} x - Posición X del HUD
     * @param {Number} y - Posición Y del HUD
     * @param {String} playerName - Nombre del jugador ("Jugador 1" o "Jugador 2")
     * @param {LogicBoard} board - Tablero del juego
     */
    constructor(scene,x,y, board, redSubmarine, blueSubmarine){
        super(scene,x,y)

        this.scene = scene;
        this.active = true;

        // imagen de fondo
        this.imId = "SubWindow";

        // pantalla
        this.screenWidth = scene.cameras.main.width;   // 800
        this.screenHeight = scene.cameras.main.height - 100; // 600
        this.setSize(this.screenWidth,this.screenHeight);
      
        // pasaer referencias
        this.tablero = board;
        this.redSubmarine = redSubmarine;
        this.blueSubmarine = blueSubmarine;

        this.toggleKey = this.scene.input.keyboard.addKey('M');

         //calcular centros de las ventanas
        const centerY = this.screenHeight / 2; // vertical es la misma
        const centerXiz = this.screenWidth / 3;
        const centerX = this.screenWidth / 2;
        const centerXder = this.screenWidth  - (this.screenWidth / 3);

     
        this.initialize();

        this.toggleKey.on("down",()=>{
            this.refresh();
        }) 
        scene.add.existing(this)

        if (this.tablero.isActive()) {
            this.setVisible(false);
        }

        
        this.sub = this.scene.add.image(centerX, centerY, "Submarine" ).setDisplaySize(50,50);
        this.add(this.sub);
        this.sub.setAlpha(0)

       

    }

    initialize(){

        const enemySub = this.tablero.submarines[this.tablero.submarines.currentTurn];
        const mySub = this.tablero.submarines.currentTurn === "red" ? this.tablero.submarines.blue : this.tablero.submarines.red;

        //Crear las ventanas del submarino con espacio para el resto de cosas
        this.createPlayerViews(0, 50, this.screenWidth, this.screenHeight);
       
    }


    createPlayerViews(x, y, width, height) {
        const viewWidth = width / 3;
        
       //LATERAL IZQUIERDA
        this.createSingleView(
            x,
            y,
            viewWidth,
            height
        );
        
        // VISTA FRONTAL (Centro)
        this.createSingleView(
            x + viewWidth,
            y,
            viewWidth,
            height
        );
        
        // VISTA LATERAL DERECHA
        this.createSingleView(
            x + (viewWidth * 2),
            y,
            viewWidth,
            height
        );
    }

    //Crear una ventanas
    createSingleView(x, y, width, height) {

      // Cargar imagen de fondo
        const waterBg = this.scene.add.image(
            x + width / 2,
            y + height / 2, 
            this.imId
        );
        this.add(waterBg);
       
        waterBg.setDisplaySize(width, height - 20); 
    }

    //Esto sirve de render -- si se ve un submarino, lo pinta ne la vista correspondiente
    renderView() {
        
        if (this.onDistance(this.tablero.submarines.red, this.tablero.submarines.blue)){
           
            this.sub.setAlpha(1)
             if ( this.tablero.currentTurn === "blue"){

                this.sub.setTint(0xff0000);
             }

             else{

                this.sub.setTint(0x0000ff);
             }

           
        }
        else 
        {
           this.sub.setAlpha(0)
        }

        
    }

    onDistance(attacker, target)
    {
        //Calcula si los submarinos estan en rango de verse - usar isTargetDIr para pintar la vista en especifica 
        let isTarget1 = attacker.isTarget(target.position.x, target.position.y, 1)
        let isTarget2 = attacker.isTarget(target.position.x, target.position.y, 2)
        

        // let isTargetDir1 = isTarget1 && 
        //     attacker.isTargetDir(target.position.x, target.position.y, 1, direction) && 
        //     attacker.canShoot(distance);
            
        // let isTargetDir2 = isTarget2 && 
        //     attacker.isTargetDir(target.position.x, target.position.y, 2, direction) && 
        //     attacker.canShoot(distance);

        let debug = isTarget1 || isTarget2;
        console.log("ON_DISTANCE", debug)


        return isTarget1 || isTarget2;
    }

    
    refresh() {
        this.active = !this.active;
        if (this.active) {
            this.setVisible(true);
        }
        else this.setVisible(false);
         
        // this.render()
    }

}