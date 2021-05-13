import Phaser from '../lib/phaser.js'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameUI from './scenes/GameUI'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
    scale:{ 
        autoCenter: Phaser.Scale.CENTER_HORIZONTAL,
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: [Preloader, Game, GameUI],
	scale: {
		zoom: 2
	}
})