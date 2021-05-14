import Phaser from '../lib/phaser.js'

import Preloader from './scenes/Preloader'
import Menu from './scenes/Menu.js'
import Load from './scenes/Load.js'
import Play from './scenes/Play.js';


//game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 1024,
	height: 768,
    scale:{ 
        autoCenter: Phaser.Scale.CENTER_HORIZONTAL,
      },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    },
    scene: [Load, Menu, Play],
};

const game = new Phaser.Game(config);
