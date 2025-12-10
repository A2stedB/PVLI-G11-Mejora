
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
         // PANTALLA DIVIDIDA: mitad superior para Jugador 1, mitad inferior para Jugador 2
        this.halfHeight = this.screenHeight / 2; // 300px por jugador

        // pasaer referencias
        this.tablero = board;
        this.redSubmarine = redSubmarine;
        this.blueSubmarine = blueSubmarine;

       
    
        
        this.toggleKey = this.scene.input.keyboard.addKey('M');
        
        // Posiciones temporales de los submarinos (estas vendran del sistema de movimiento)
        // Los submarinos estan en vertices (coordenadas pares)
        this.submarine1 = {
            x: 2,  // posicion en el tablero logico
            y: 2,
            direction: 'north'  // north, south, east, west
        };
        
        this.submarine2 = {
            x: 2,  // posicion en el tablero logico
            y: 6,  // 2 casillas al sur del submarino 1
            direction: 'south'
        };
        
        this.initialize();
        
       this.toggleKey.on("down",()=>{
            this.refresh();
        }) 
        scene.add.existing(this)

        if (this.tablero.isActive()) {
            this.setVisible(false);
        }
       

    }

    initialize(){
        // const screenWidth = this.cameras.main.width;   // 800
        // const screenHeight = this.cameras.main.height; // 600
        
        // // PANTALLA DIVIDIDA: mitad superior para Jugador 1, mitad inferior para Jugador 2
        // const halfHeight = screenHeight / 2; // 300px por jugador
        

          const enemySub = this.tablero.submarines[this.tablero.submarines.currentTurn];
        const mySub = this.tablero.submarines.currentTurn === "red" ? this.tablero.submarines.blue : this.tablero.submarines.red;
        //JUGADOR 1 (Parte Superior)
        this.createPlayerViews(0, 50, this.screenWidth, this.screenHeight, this.submarine1, this.submarine2);
        

        
        // Linea divisoria
        // const line = this.scene.add.graphics();
        // line.lineStyle(2, 0xffffff, 1);
        // line.lineBetween(0, this.halfHeight, this.screenWidth, this.halfHeight);
        
        // JUGADOR 2 (Parte Inferior)
        //this.createPlayerViews(0, this.halfHeight, this.screenWidth, this.halfHeight, 'JUGADOR 2', this.submarine2, this.submarine1);
    }

    refresh() {
        this.active = !this.active;
        if (this.active) {
            this.setVisible(true);
        }
        else this.setVisible(false);
         
        // this.render()
    }

     /**
     * Crea las 3 vistas para un jugador
     */
    createPlayerViews(x, y, width, height, mySub, enemySub) {
        const viewWidth = width / 3;
        
        // VISTA LATERAL IZQUIERDA
        console.log(mySub.direction)
        const leftDirection = this.getLeftDirection(mySub.direction);
        this.createSingleView(
            x,
            y,
            viewWidth,
            height,
            'LAT. IZQ',
            mySub,
            enemySub,
            leftDirection
        );
        
        // VISTA FRONTAL (Centro)
        this.createSingleView(
            x + viewWidth,
            y,
            viewWidth,
            height,
            'FRONTAL',
            mySub,
            enemySub,
            mySub.direction
        );
        
        // VISTA LATERAL DERECHA
        const rightDirection = this.getRightDirection(mySub.direction);
        this.createSingleView(
            x + (viewWidth * 2),
            y,
            viewWidth,
            height,
            'LAT. DER',
            mySub,
            enemySub,
            rightDirection
        );
        

        
    }

    /**
     * Crea una vista individual
     */
    createSingleView(x, y, width, height, label, mySub, enemySub, viewDirection) {
       
        // fondo de la vista
        // const waterBg = this.scene.add.rectangle(
        //     x + width / 2,
        //     y + height / 2,
        //     width - 10,
        //     height,
        //     0x001a33,
        //     1
        // );

      // cargar imagen de fondo
        const waterBg = this.scene.add.image(
            x + width / 2,
            y + height / 2, 
            this.imId

        );
       
        waterBg.setDisplaySize(width, height - 20);        

        // // Borde blanco de la vista
        // const border = this.scene.add.graphics();
        // border.lineStyle(2, 0xffffff, 1);
        // border.strokeRect(x + 5, y + 10, width - 10, height - 20);
        
        // // Etiqueta de la vista
        // this.scene.add.text(x + width / 2, y + 15, label, {
        //     fontSize: '14px',
        //     fill: '#ffffff',
        //     backgroundColor: '#000000',
        //     padding: { x: 5, y: 3 }
        // }).setOrigin(0.5, 0);

          const centerX = x + width / 2;
        const centerY = y + height / 2;
        

        
        // Renderizar el contenido - UNA SOLA IMAGEN
       // this.paintSubs(x, y, width, height, this.tablero.currentTurn, enemySub, viewDirection);


    }

    toggle()
    {
        this.active = !this.active;
        if (this.active) {
            this.setVisible(true);
        }
        else this.setVisible(false);
         
    }

    /**
     * Renderiza el contenido de la vista - SOLO UNA IMAGEN del submarino si esta visible
     */
    paintSubs(x, y, width, height, mySub, enemySub, viewDirection) {
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        let attacker = this.tablero.submarines[this.tablero.currentTurn];
        // const target = this.tablero.currentTurn === "red" ? this.tablero.submarines.blue : this.tablero.submarines.red;
 
        let target =null;
       if ( this.tablero.currentTurn == "red") target = this.redSubmarine
       else target = this.blueSubmarine;
        
        if (this.onDistance(attacker, target)){this.drawSubmarine(centerX, centerY, 1)}
      
        let enemyDistance = null;
        
        // visibleCells.forEach((cell, index) => {
        //     if (this.isEnemyInCell(enemySub, cell)) {
        //         enemyDistance = index + 1; // 1 = cerca, 2 = lejos
        //     }
        // });
        
        // Dibujar segun si hay enemigo o no
        if (enemyDistance !== null) {
            // HAY ENEMIGO - Dibujar submarino
            this.drawSubmarine(centerX, centerY, 1);
        } else {
            // NO HAY ENEMIGO - Solo agua
            this.drawWater(centerX, centerY);
        }
    }

    /**
     * Dibuja el submarino enemigo con tamano segun distancia
     */
    drawSubmarine(centerX, centerY, distance) {
        let size;
        
        if (distance === 1) {
            // Enemigo CERCA (1 casilla) - MAS GRANDE
            size = 120;
        } else {
            // Enemigo LEJOS (2 casillas) - MAS PEQUENO
            size = 60;
        }
        
        // Cuerpo del submarino (circulo rojo)
        this.scene.add.circle(centerX, centerY, size * 0.4, 0xff0000, 1);
        
        // Torre del submarino (rectangulo)
        this.scene.add.rectangle(
            centerX,
            centerY - size * 0.25,
            size * 0.3,
            size * 0.5,
            0xcc0000,
            1
        );
        
        // Periscopio (linea)
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0x990000, 1);
        graphics.lineBetween(
            centerX, 
            centerY - size * 0.5, 
            centerX, 
            centerY - size * 0.8
        );
        
        // Texto de alerta
        this.scene.add.text(centerX, centerY + size * 0.6, '! ENEMIGO !', {
            fontSize: distance === 1 ? '14px' : '11px',
            fill: '#ff0000',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            padding: { x: 3, y: 2 }
        }).setOrigin(0.5);
        
        // Indicador de distancia
        this.scene.add.text(centerX, centerY - size * 0.9, distance + ' casilla' + (distance === 1 ? '' : 's'), {
            fontSize: '10px',
            fill: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 3, y: 1 }
        }).setOrigin(0.5);
    }

    /**
     * Dibuja agua vacia (sin submarino)
     */
    drawWater(centerX, centerY) {
        // Efecto de agua con circulos concentricos
        this.scene.add.circle(centerX, centerY, 80, 0x003366, 0.3);
        this.scene.add.circle(centerX, centerY, 25, 0x0055aa, 0.5);
        this.scene.add.circle(centerX, centerY, 50, 0x004488, 0.4);
        
        // Texto
        this.scene.add.text(centerX, centerY, 'Agua oscura\n(sin enemigo)', {
            fontSize: '12px',
            fill: '#66ccff',
            align: 'center',
            alpha: 0.7
        }).setOrigin(0.5);
    }

    /**
     * Obtiene las coordenadas de las casillas visibles
     */
    getVisibleCells(mySub, direction) {
        const cells = [];
        const dirVector = this.getDirectionVector(direction);
        
        // Calcular las 2 casillas visibles
        for (let depth = 1; depth <= 2; depth++) {
            cells.push({
                x: mySub.x + (dirVector.x * depth * 2),
                y: mySub.y + (dirVector.y * depth * 2)
            });
        }
        
        return cells;
    }

    /**
     * Verifica si el submarino enemigo esta en una casilla especifica
     */
    isEnemyInCell(enemySub, cell) {
        return enemySub.x === cell.x && enemySub.y === cell.y;
    }

    /**
     * Obtiene el vector de direccion
     */
    getDirectionVector(direction) {
        const vectors = {
            'north': { x: 0, y: -1 },
            'south': { x: 0, y: 1 },
            'east': { x: 1, y: 0 },
            'west': { x: -1, y: 0 }
        };
        return vectors[direction] || { x: 0, y: 0 };
    }

    /**
     * Obtiene la direccion izquierda
     */
    getLeftDirection(direction) {
        const left = {
            'north': 'west',
            'west': 'south',
            'south': 'east',
            'east': 'north'
        };
        return left[direction];
    }

    /**
     * Obtiene la direccion derecha
     */
    getRightDirection(direction) {
        const right = {
            'north': 'east',
            'east': 'south',
            'south': 'west',
            'west': 'north'
        };
        return right[direction];
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

    


}