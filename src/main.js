// import Phaser from '../lib/phaser.js'
// import Menu from './scenes/Menu.js'
// import Load from './scenes/Load.js'
// import Play from './scenes/Play.js'


//game config
let config = {
    parent: 'phaser-game',
    type: Phaser.WebGL,
    render: { 
        pixelArt: true
    },
    width: 920,
	height: 700,
    scale:{ 
        // zoom: 2,
        autoCenter: Phaser.Scale.CENTER_HORIZONTAL, 
        
      },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        }
    },
    scene: [Load, Menu, Play, Level2, Level3, Level4],
};

const game = new Phaser.Game(config);

let centerY = game.config.height/2;
let centerX = game.config.weight/2;
let w = game.config.width;
let h = game.config.height;