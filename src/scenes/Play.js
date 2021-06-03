// import Hero from '../prefabs/Hero.js'
// import Enemy from '../prefabs/Enemy.js'
// import Weapon from '../prefabs/Weapon.js'
// import IdleState from '../prefabs/Hero.js'
// import MoveState from '../prefabs/Hero.js'

// export default class Play extends Phaser.Scene{
class Play extends Phaser.Scene{    
    constructor(){
        super('playScene');
    }

    preload(){
        this.load.path = "./assets/"; 
        this.load.tilemapTiledJSON('tilemapJSON', "tilesheets/LOne.json");
        this.load.image('microtileset', 'tilesheets/wallsfloor2.png');
    }
    create(){ 
        document.getElementById('description').innerHTML = '<h2>Play.js</h2><br>WASD to move, E to attack, V to go to menu';
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('wallsfloor2','microtileset'); 
        //const backgroundlayer = map.createLayer('Walls', tileset, 0, 0); 
        const groundLayer = map.createLayer("floor", tileset, 0, 0);
        const propLayer = map.createLayer("props", tileset, 0, 0);
        propLayer.setScale(2.5);
        groundLayer.setScale(2.5);
        propLayer.setCollisionByProperty({
            collides: true
        });  
        groundLayer.setCollisionByProperty({
            collides: true
        });     
        
        this.cameras.main.setBackgroundColor(0x4169e1)
        this.cameras.main.height = 768
        this.cameras.main.width = 1024
        this.cameras.main.setPosition(0,0)

        this.hero = new Hero(this, 200, 140,'hero',100 , 'down').setScale(1.5);
        this.hero.body.setSize(this.hero.width * 0.5, this.hero.height *0.7);
        this.heroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            dash: new DashState(),
            hurt: new HurtState(),
        }, [this, this.hero]);

        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.hero, groundLayer);
        this.physics.add.collider(this.hero, propLayer);
        this.cameras.main.startFollow(this.hero, true, 0.8, 0.8)


        // this.enemy = new Enemy(this, 500, 368, 'temp_enem', 100, 100).setScale(1.5);
        // this.weapon = new Weapon(this, 220,120,'weapon' );
        // this.cameras.main.startFollow(this.hero, true, 0.8, 0.8);
        //this.hero.body.setCollideWorldBounds(true);
        //this.enemy.body.setCollideWorldBounds(true);
        // this.weapon.body.setImmovable(true);
        // this.physics.add.collider(this.hero, this.enemy, this.handlePlayerEnemyCollision,null, this );
        // this.physics.add.collider(this.weapon, this.enemy, this.handleWeaponEnemyCollision,null, this);
        // this.physics.add.overlap(this.weapon, this.enemy, this.handleWeaponEnemyCollision)
        // this.physics.add.collider(this.player, worldLayer); 



        this.swap = this.input.keyboard.addKey('V');


        this.bgm = this.sound.add('temp_bgm',{volume: 0.1, loop: true});
        this.bgm.play();
        
    }
    update(time, delta){

        // this.hero.update();
        this.heroFSM.step();
        // this.enemy.update();
        // this.weapon.update();
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            this.scene.start('menuScene');
            this.bgm.stop();
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
            // slash_sfx.play;
        }
        
    }
}

