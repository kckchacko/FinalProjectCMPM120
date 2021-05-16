import Hero from '../prefabs/Hero.js'
import Enemy from '../prefabs/Enemy.js'
export default class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }

    preload(){
        this.load.image('tiles', '../assets/tilesheets/officeImage.png')

        // this.load.tilemapTiledJSON('map', '../scripts/purpleMapObjectsVideo.json')
    }
    create(){
        document.getElementById('description').innerHTML = '<h2>Play.js</h2><br>WASD to move, E to slash, V to go to menu';
       
        this.add.image(512,384, 'tiles'); //placeholder image 
       
       
        // const map = this.make.tilemap({key: 'office'});
        // const tileset = map.addTilesetImage('office','testMap'); //error here 
        // map.createStaticLayer('Ground', tileset);
        // const wallsLayer = map.createStaticLayer('Walls', tileset);
        // wallsLayer.Layer.setCollisionByProperty({collides: true});
        // map.createStaticLayer()

    




        this.hero = new Hero(this, 200, 120,'hero_idle',100 , 100).setScale(1.5);
        this.enemy = new Enemy(this, 500, 368, 'temp_enem', 100, 100).setScale(1.5);
        // this.cameras.main.startFollow(this.hero, true, 0.8, 0.8);
        this.hero.body.setCollideWorldBounds(true);
        this.enemy.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.hero, this.enemy, this.handlePlayerEnemyCollision,null, this );
        // this.physics.add.collider(this.player, worldLayer); 



        this.swap = this.input.keyboard.addKey('V');

        
    }
    update(time, delta){
        this.hero.update();
        this.enemy.update();

        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            this.scene.start('menuScene');
        }
    }
    handlePlayerEnemyCollision(player, enemy){
        // if(!enemy.alreadyOverlapp)
        player.health -= 1; 
        console.log(player.health);
    }
}