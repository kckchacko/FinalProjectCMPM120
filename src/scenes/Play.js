import Hero from '../prefabs/Hero.js'
import Enemy from '../prefabs/Enemy.js'
import Weapon from '../prefabs/Weapon.js';
export default class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }

    preload(){
        this.load.image('tiles', '../assets/tilesheets/officeImage.png')
        // this.load.tilemapTiledJSON('map', '../scripts/purpleMapObjectsVideo.json')
    }
    create(){
        document.getElementById('description').innerHTML = '<h2>Play.js</h2><br>WASD to move, E to attack, V to go to menu';
       
        this.add.image(512,384, 'tiles'); //placeholder image 
       
       
        // const map = this.make.tilemap({key: 'office'});
        // const tileset = map.addTilesetImage('office','testMap'); //error here 
        // map.createStaticLayer('Ground', tileset);
        // const wallsLayer = map.createStaticLayer('Walls', tileset);
        // wallsLayer.Layer.setCollisionByProperty({collides: true});
        // map.createStaticLayer()

    
        this.cameras.main.setBackgroundColor(0x4169e1)

        this.cameras.main.height = 600
        this.cameras.main.width = 600
        this.cameras.main.setPosition(32,32)



        this.hero = new Hero(this, 200, 120,'hero_idle',100 , 100).setScale(1.5);
        this.cameras.main.startFollow(this.hero, true, 0.8, 0.8)

        this.enemy = new Enemy(this, 500, 368, 'temp_enem', 100, 100).setScale(1.5);
        this.weapon = new Weapon(this, 220,120,'weapon' );
        // this.cameras.main.startFollow(this.hero, true, 0.8, 0.8);
        this.hero.body.setCollideWorldBounds(true);
        this.enemy.body.setCollideWorldBounds(true);
        this.weapon.body.setImmovable(true);
        this.physics.add.collider(this.hero, this.enemy, this.handlePlayerEnemyCollision,null, this );
        this.physics.add.collider(this.weapon, this.enemy, this.handleWeaponEnemyCollision,null, this);
        this.physics.add.overlap(this.weapon, this.enemy, this.handleWeaponEnemyCollision)
        // this.physics.add.collider(this.player, worldLayer); 



        this.swap = this.input.keyboard.addKey('V');

        
    }
    update(time, delta){

        this.hero.update();
        this.enemy.update();
        this.weapon.update();
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            this.scene.start('menuScene');
        }
    }
    handlePlayerEnemyCollision(player, enemy){
        // if(!enemy.alreadyOverlapp)
        player.health -= 1; 
        console.log("player health=",player.health);
        this.cameras.main.shake(100, 0.05);
    }
    handleWeaponEnemyCollision(weapon,enemy){
        if(weapon.activeCheck){
            enemy.health -=2;
            console.log("enemy health=",enemy.health);
            slash_sfx.play;
        }
        
    }
}