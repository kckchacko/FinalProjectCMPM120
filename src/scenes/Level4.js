class Level4 extends Phaser.Scene{  
    constructor(){
        super('Level4');
    }
    init(props) {
        const {level = 1} = props;
        this.currentLevel = level;
    }
    preload(){
        this.load.path = "./assets/"; 
        switch(this.currentLevel) {
            case 0:
                this.load.tilemapTiledJSON('Level', "tilesheets/LOne.json");
            case 1: 
                this.load.tilemapTiledJSON('Level2', "tilesheets/LTwo.json");
            case 2:
                this.load.tilemapTiledJSON('Level', "tilesheets/LThree.json");
            case 3:
                this.load.tilemapTiledJSON('Level4', "tilesheets/LFour.json");
            default:
                this.load.tilemapTiledJSON('Level', "tilesheets/LOne.json");
        }
        this.load.image('microtileset', 'tilesheets/wallsfloor2.png');
        this.load.image('microtileset', 'tilesheets/stair.png');
        

    }
    create(){ 
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // document.getElementById('description').innerHTML = '<h2>Play.js</h2><br>4444WASD to move, E to attack, V to go to menu';
        this.keyCount = 0;
        const map = this.add.tilemap('Level4');
        const tileset = map.addTilesetImage('wallsfloor2','microtileset'); 
        
        const cam_offset = 73;
        const groundLayer = map.createLayer("floor", tileset, 0, cam_offset);
        const propLayer = map.createLayer("props", tileset, 0, cam_offset);
        const stairLayer = map.createLayer("stairs", tileset, 0, cam_offset);
        stairLayer.setScale(2.5);
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
        this.cameras.main.setPosition(-60,0);

        //adding UI 
        this.UImanager = new GameUI(this, 'level4Label');

        this.hero = new Hero(this, 200, 140+ cam_offset,'hero',2 , 'down').setScale(1.5);
        this.hero.body.setSize(this.hero.width * 0.48, this.hero.height *0.68); //set collision
        this.heroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            dash: new DashState(),
            hurt: new HurtState(),
        }, [this, this.hero]);

        this.enemy = new Enemy(this, 500, 500+cam_offset, 'stapler_enem',200,'horiz').setScale(1.5);
        this.key = new Key(this, 735, 560+ cam_offset, 'key',200,'horiz').setScale(1.7); //add the key
        this.key2 = new Key(this, 380, 150+ cam_offset, 'key',200,'horiz').setScale(1.7);
        this.stair = new Stair(this, 860, 180+ cam_offset, 'weapon').setScale(1.8).setImmovable();  //add stairs

        this.enemy.body.setSize(this.hero.width * 0.48, this.enemy.height *0.53); //set collision

        this.physics.add.collider(this.enemy, groundLayer);
        this.physics.add.collider(this.enemy, propLayer);
        this.physics.add.collider(this.enemy, stairLayer);
        this.physics.add.collider(this.key, groundLayer);
        this.physics.add.collider(this.key, propLayer);
        this.physics.add.collider(this.key2, groundLayer);
        this.physics.add.collider(this.key2, propLayer);
        

        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(this.hero, groundLayer);
        this.physics.add.collider(this.hero, propLayer);
        this.physics.add.collider(this.hero, stairLayer);

        this.physics.add.collider(this.hero,this.enemy, this.handlePlayerEnemyCollision,null,this);
        this.physics.add.collider(this.hero,this.key, this.handlePlayerKeyCollision,null,this); //key collision
        this.physics.add.collider(this.hero,this.key2, this.handlePlayerKeyCollision,null,this); //key collision
        this.physics.add.collider(this.hero,this.stair, this.handlePlayerStairCollision,null, this);
        this.cameras.main.startFollow(this.hero, true, 0.8, 0.8)

        this.swap = this.input.keyboard.addKey('V');


        this.bgm = this.sound.add('final_bgm',{volume: .7, loop: true});
        this.dash_sfx = this.sound.add('dash_sfx', {loop: false});
        this.dmg_sfx = this.sound.add('take_damage_sfx',{loop: false});
        this.footsteps = this.sound.add('footsteps_sfx',{volume: 0.3, loop: false});
    }
    update(time, delta){
        // this.hero.update();
        this.heroFSM.step();
        this.enemy.update();
        // this.weapon.update();
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            //this.scene.restart({ level: this.currentLevel + 1 });
            //this.scene.start('menuScene');
            this.scene.start('playScene');
            this.bgm.stop();
        }
        this.UImanager.updateHealthUI(this.hero,this.heartFull, this.heartEmpty, this.heartHalf);
        this.UImanager.updateDashUI(this.hero, this.dashFull, this.dashEmpty)
    }
    handlePlayerKeyCollision(player, key){
        this.keyCount++;
        key.destroy();
        console.log("Key Collected", this.keyCount);
    }

    handlePlayerStairCollision(player){
        console.log("touching stair", this.keyCount);
        if(this.keyCount == 2) { 
            this.scene.start('endScene');
        }
    }
    handlePlayerEnemyCollision(player, enemy){
        // if(!enemy.alreadyOverlapp)
        if(player.tookDMG == false){
            this.dmg_sfx.play();
            player.health -= 1; 
            player.tookDMG = true;
            if(player.health == 0) {
                this.scene.start('goScene');
                this.bgm.stop();
            } 
            // player.body.setVelocityX(enemy.speed * 2);
            console.log("player health=",player.health);
            this.cameras.main.shake(100, 0.005);
        }
        
        
    }
   
    handleEnemyWallCollision(enemy){
        // enemy.body.setVelocityX(-enemy.speed);
        enemy.speed= -enemy.speed;
    }
   
}