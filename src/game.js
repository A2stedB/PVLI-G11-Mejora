import { GameScreen } from "./Scene/GameScreen.js";
import { Menu2 } from "./Scene/MenuV2.js";
import { Flappy_Dragon } from "./Minigames/MGFlappyDragon.js";
import { MinigameDialogScene } from "./Scene/MinigameDialogScene.js";
import { RepairMinigame } from "./Minigames/RepairMinigame.js";
import { GameOverScene } from "./Scene/GameOverScene.js"; 
import {MapView} from "./Scene/scene-mapview.js";
import { RandomSide } from "./Scene/scene-random-side.js";
import { MapPreView } from "./Scene/scene-preview_map.js";
import { SelectionMenu } from "./Scene/scene-selection.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
	type: Phaser.AUTO,
    parent: "game",
	width: 800,
	height: 600,
	pixelArt: true,
    //backgroundColor: '#ebeb34',
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	// FÍSICA NECESARIA PARA EL MINIJUEGO
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false // Cambiar a true para ver las físicas
		}
    },

	scene: [
		Menu2, 
		SelectionMenu,
		RandomSide,
		GameScreen,
        MapView,
		MapPreView,    
		GameOverScene,
		Flappy_Dragon,               
		MinigameDialogScene,    
		RepairMinigame,
	],
};

// Crear el juego
const game = new Phaser.Game(config);