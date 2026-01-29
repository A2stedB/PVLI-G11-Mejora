import VictoryReason from '../game-victoryCondition.js';

import { 
    UIStyles, 
    createOverlay, 
    createStyledPanel, 
    createStyledText, 
    createStyledButton 
} from '../UIStyles.js';

export class GameOverScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'GameOver' });
    }

    /**
     * Inicialización - Recibe datos del resultado de la partida
     * 
     * @param {Object} data - Datos del fin de juego
     * @param {string} data.winner - 'red' o 'blue'
     * @param {string} data.reason - 'elimination' o 'escape'
     */
    init(data) {
        this.winner = data.winner;
        this.reason = data.reason;
    }

    /**
     * Creación de la escena
     */
    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        
        const overlay = createOverlay(this, 0.95);
        overlay.setDepth(1000);
        
        let winnerColorHex;
        let winnerName;
        if(this.winner != null){
            winnerColorHex = this.winner.color
            winnerName = this.winner.name
        }

        let titleText;
        console.log(this.reason)
        switch(this.reason){
            case VictoryReason.exitReached:
                titleText = "Ha llegado a la salida"
                break;
            case VictoryReason.defeatEnemy:
                titleText = "Ha hundido al enenmigo"
                break;
            case VictoryReason.even:
                titleText = "Paz en el mundo, oleee"
                break;
            case VictoryReason.sameCountry:
                titleText = `Guerra civil, a tomar por el culo el pais`
                break;
        }
        
        const title = createStyledText(this, w/2, 100, titleText, 'title');
        title.setFontSize('42px');
        title.setColor('#ffff00');
        title.setStroke('#000000', 6);
        title.setOrigin(0.5);
        title.setDepth(1001);
        
        // PASO 4: Anuncio del ganador con efecto de brillo
        if(this.winner != null){
            const winnerText = this.add.text(
                w/2, 180, 
                `VICTORIA: ${winnerName}`, 
                {
                    fontSize: '48px',
                    color: winnerColorHex,
                    fontFamily: 'Arial',
                    fontStyle: 'bold',
                    stroke: '#000000',
                    strokeThickness: 8,
                    align: 'center'
                }
            );
            winnerText.setOrigin(0.5);
            winnerText.setDepth(1001);
        }
        
        // Animación de brillo del ganador
        // this.tweens.add({
        //     targets: winnerText,
        //     scale: 1.1,
        //     duration: 1000,
        //     yoyo: true,
        //     repeat: -1,
        //     ease: 'Sine.easeInOut'
        // });
        
        // // PASO 5: Panel de estadísticas
        // this.createStatsPanel(w, h);
        
        // // PASO 6: Botones de acción
        this.createButtons(w, h);
        
        // // PASO 7: Efecto de celebración
        // this.createCelebrationEffect(w/2, h/2, winnerColorHex);
    }
    
    /**
     * Crea los botones de acción
     * 
     * @param {Number} w - Ancho de la pantalla
     * @param {Number} h - Alto de la pantalla
     */
    createButtons(w, h) {
        const buttonY = h - 120;
    
        // BOTÓN REVANCHA con soporte de teclado (R)
        const revanchaBtn = createStyledButton(
            this,
            w/2 - 150,
            buttonY,
            '↻ REVANCHA',
            () => {
                this.scene.stop(this);
                this.scene.start("SelectionMenu")
                },
            true,
            'R'
        );
        revanchaBtn.bg.setDepth(1002);
        revanchaBtn.label.setDepth(1003);

        // BOTÓN MENÚ con soporte de teclado (ESC)
        const menuBtn = createStyledButton(
            this,
            w/2 + 150,
            buttonY,
            '⌂ MENÚ',
            () => {
                console.log("=== VOLVIENDO AL MENÚ ===");
                
                // CRÍTICO: Detener TODOS los tweens y timers de Game Over
                console.log("  Deteniendo tweens de Game Over...");
                this.tweens.killAll();
                this.time.removeAllEvents();
                
                const gameScreen = this.scene.get('GameScreen');
                
                if (gameScreen) {
                    console.log("  Limpiando GameScreen...");
                    
                    if (gameScreen.tweens) {
                        gameScreen.tweens.killAll();
                    }
                    
                    // if (gameScreen.gameManager) {
                    //     gameScreen.gameManager.destroy();
                    // }
                }
                
                console.log("  Deteniendo Game Over...");
                this.scene.stop('GameOver');
                
                console.log("  Deteniendo GameScreen...");
                this.scene.stop('GameScreen');
                
                // Usar timer desde scene manager (no desde this que ya está detenida)
                const sceneManager = this.scene.manager;
                
                // Intentar usar escena default/boot para el timer
                const bootScene = sceneManager.getScene('default');
                
                if (bootScene && bootScene.time) {
                    bootScene.time.delayedCall(200, () => {
                        console.log("  Iniciando menú...");
                        sceneManager.start('menu2');
                        console.log("Menú cargado");
                    });
                } else {
                    // Fallback: iniciar inmediatamente
                    console.log("  Iniciando menú (sin delay)...");
                    setTimeout(() => {
                        sceneManager.start('menu2');
                    }, 200);
                }
            },
            false,
            'ESC'
        );
        menuBtn.bg.setDepth(1002);
        menuBtn.label.setDepth(1003);
        
        // TEXTO DE AYUDA
        const helpText = createStyledText(
            this, w/2, buttonY + 50,
            'Presiona R para revancha | ESC para menú',
            'small'
        );
        helpText.setOrigin(0.5);
        helpText.setDepth(1002);
    }
}