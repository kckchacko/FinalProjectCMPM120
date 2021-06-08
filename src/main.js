//Cult Corporate was produced by Kevin Chacko and Noor Haider 
//credits to Trevor Lentz for "Do Not Run" (the bgm)

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
    scene: [Load, Menu, Play, Level2, Level3, Level4, Story, End, Credits, GameOver],
};

let game = new Phaser.Game(config);

let centerY = game.config.height/2;
let centerX = game.config.weight/2;
let w = game.config.width;
let h = game.config.height;