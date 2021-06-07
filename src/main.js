// import Phaser from '../lib/phaser.js'
// import Menu from './scenes/Menu.js'
// import Load from './scenes/Load.js'
// import Play from './scenes/Play.js'


//game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: { 
        pixelArt: true
    },
    width: 840,
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
