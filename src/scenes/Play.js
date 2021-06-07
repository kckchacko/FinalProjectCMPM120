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
    init(props) {
        const {level = 0} = props;
        this.currentLevel = level;
    }
    preload(){
        this.load.path = "./assets/"; 
        switch(this.currentLevel) {
            case 0:
                this.load.tilemapTiledJSON('Level', "tilesheets/LOne.json");
                break;
            case 1: 
                this.load.tilemapTiledJSON('Level', "tilesheets/LTwo.json");
                break;
            case 2:
                this.load.tilemapTiledJSON('Level', "tilesheets/LThree.json");
                break;
            case 3:
                this.load.tilemapTiledJSON('Level', "tilesheets/LFour.json");
                break;
            default:
                this.load.tilemapTiledJSON('Level', "tilesheets/LOne.json");
                break;
        }
        this.load.image('microtileset', 'tilesheets/wallsfloor2.png');
        this.load.image('stair', 'tilesheets/stair.png');
        this.load.image('heartEmpty', 'UI/heartDead.png');
        this.load.image('heartHalf', 'UI/heartHalf.png');
        this.load.image('heartFull', 'UI/heartFull.png');
        this.load.image('INTERN_Label','UI/Intern.png');
        this.load.image('DASH_Label', 'UI/Dash.png');
        this.load.image('dashEmpty','UI/DashEmpty.png');
        this.load.image('dashFull','UI/DashFull.png');
        this.load.image('level1Label', 'UI/Level_1label.png')
    }
    create(){ 
        document.getElementById('description').innerHTML = '<h2>Play.js</h2><br>WASD to move, E to attack, V to go to menu';
        this.keyCount = 0;
        const map = this.add.tilemap('Level');
        const tileset = map.addTilesetImage('wallsfloor2','microtileset'); 
        //const backgroundlayer = map.createLayer('Walls', tileset, 0, 0); 
        const cam_offset = 73;
        const groundLayer = map.createLayer("floor", tileset, 0, cam_offset);
        const propLayer = map.createLayer("props", tileset, 0, cam_offset);
        const stairLayer = map.createLayer("stairs", tileset, 0, cam_offset);
        propLayer.setScale(2.5);
        groundLayer.setScale(2.5);
        stairLayer.setCollisionByProperty({
            collides: true
        });  
        propLayer.setCollisionByProperty({
            collides: true
        });  
        groundLayer.setCollisionByProperty({
            collides: true
        });     

        this.cameras.main.setBackgroundColor(0x00000);
        this.cameras.main.height = 1000
        this.cameras.main.width = 1024
        this.cameras.main.setPosition(-100,0);

        //adding UI to scale
        this.add.sprite(225,20,'INTERN_Label').setScale(2);
        this.heartFull = this.add.sprite(225,60, 'heartFull').setScale(2);
        this.heartHalf = this.add.sprite(225,60, 'heartHalf').setScale(2);
        this.heartEmpty = this.add.sprite(225,60, 'heartEmpty').setScale(2);
        this.heartHalf.visible = false;
        this.heartEmpty.visible = false;
        this.add.sprite(325, 20, 'DASH_Label').setScale(2);
        this.dashFull = this.add.sprite(325, 60, 'dashFull').setScale(2);
        this.dashEmpty = this.add.sprite(325, 60, 'dashEmpty').setScale(2);
        this.dashEmpty.visible = false;
        this.add.sprite(700, 50, 'level1Label').setScale(2.5);

        this.hero = new Hero(this, 200, 150 + cam_offset,'hero',2, 'down').setScale(1.5);
        this.hero.body.setSize(this.hero.width * 0.48, this.hero.height *0.68); //set collision
        this.heroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            dash: new DashState(),
            hurt: new HurtState(),
        }, [this, this.hero]);

        this.enemy = new Enemy(this, 500, 500 + cam_offset, 'temp_enem',200,'horiz').setScale(1.5);
        this.key = new Key(this, 622, 165 + cam_offset, 'key',200,'hoariz').setScale(1.7); //add the key
        this.stair = new Stair(this, 860, 180 + cam_offset, 'stair').setScale(1.7).setImmovable();  //add stairs
        this.stair.setScale(2.7);

        this.enemy.body.setSize(this.hero.width * 0.48, this.enemy.height *0.53); //set collision

        this.physics.add.collider(this.enemy, groundLayer);
        this.physics.add.collider(this.enemy, propLayer);
        this.physics.add.collider(this.enemy, stairLayer);
        this.physics.add.collider(this.key, groundLayer);
        this.physics.add.collider(this.key, propLayer);

        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(this.hero, groundLayer);
        this.physics.add.collider(this.hero, propLayer);
        this.physics.add.collider(this.hero, stairLayer);

        this.physics.add.collider(this.hero,this.enemy, this.handlePlayerEnemyCollision,null,this);
        this.physics.add.collider(this.hero,this.key, this.handlePlayerKeyCollision,null,this); //key collision
        this.physics.add.collider(this.hero,this.stair, this.handlePlayerStairCollision,null, this);
        this.cameras.main.startFollow(this.hero, true, 0.8, 0.8)


        this.swap = this.input.keyboard.addKey('V');


        this.bgm = this.sound.add('temp_bgm',{volume: 0.1, loop: true});
        // this.bgm.play();
        
    }
    update(time, delta){
        // this.hero.update();
        this.heroFSM.step();
        this.enemy.update();
        // this.weapon.update();
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            //this.scene.restart({ level: this.currentLevel + 1 });
            //this.scene.start('menuScene');
            this.scene.start('Level2');
            this.bgm.stop();
        }
        this.updateHealthUI(this.hero,this.heartFull, this.heartEmpty, this.heartHalf);
        this.updateDashUI(this.hero, this.dashFull, this.dashEmpty)
         
    }
    handlePlayerKeyCollision(player, key){
        this.keyCount++;
        this.key.destroy();
        console.log("Key Collected", this.keyCount);
    }

    handlePlayerStairCollision(player){
        console.log("touching stair", this.keyCount);
        if(this.keyCount == 1) { 
            this.scene.start('Level2');
        }
    }
    handlePlayerEnemyCollision(player, enemy){
        // if(!enemy.alreadyOverlapp)
        if(player.tookDMG == false){
            player.health -= 1; 
        }
        player.tookDMG = true; 
        player.body.setVelocityX(enemy.speed * 2);
        console.log("player health=",player.health);
        this.cameras.main.shake(100, 0.005);
    }
  
    handleEnemyWallCollision(enemy){
        // enemy.body.setVelocityX(-enemy.speed);
        enemy.speed= -enemy.speed;
    }
    updateHealthUI(hero, full, empty, half ){
        if(hero.health == 2){
            full.visible = true;
            half.visible = false;
            empty.visible = false;
        }
        if(hero.health == 1 && hero.tookDMG == false){   
            full.visible = false;
            half.visible = true;
            empty.visible = false;
        }
        if(hero.health == 0 && hero.tookDMG == false){
            full.visible = false; 
            half.visible = false; 
            empty.visible = true;
        }
    }
    updateDashUI(hero, full, empty){
        if(hero.canDash == true){
            full.visible = true;
            empty.visible = false;
        }
        if(hero.canDash == false){
            full.visible = false;
            empty.visible = true;
        }
    }
}

