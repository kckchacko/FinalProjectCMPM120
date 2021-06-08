class Level3 extends Phaser.Scene{  
    constructor(){
        super('Level3');
    }
    init(props) {
        const {level = 2} = props;
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
                this.load.tilemapTiledJSON('Level3', "tilesheets/LThree.json");
            case 3:
                this.load.tilemapTiledJSON('Level', "tilesheets/LFour.json");
            default:
                this.load.tilemapTiledJSON('Level', "tilesheets/LOne.json");
        }
    
    }
    create(data){ 

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        document.getElementById('description').innerHTML = '<h2>Play.js</h2><br>333WASD to move, E to attack, V to go to menu';
        this.keyCount = 0;
        this.totalKeys = 1;
        const map = this.add.tilemap('Level3');
        const tileset = map.addTilesetImage('wallsfloor2','microtileset'); 
        //const backgroundlayer = map.createLayer('Walls', tileset, 0, 0); 
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
        this.UImanager = new GameUI(this, 'level3Label');

        this.hero = new Hero(this, 200, 140+cam_offset,'hero',2 , 'down').setScale(1.5);
        this.heroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            dash: new DashState(),
            hurt: new HurtState(),
        }, [this, this.hero]);

        this.enemy = new Enemy(this, 500, 500+ cam_offset, 'stapler_enem',200,'horiz').setScale(1.5);
        this.enemy1 = new Enemy(this, 650, 500 + cam_offset, 'pencil_enem',200,'verti').setScale(1.25);
        this.enemy2 = new Enemy(this, 500, 500 + cam_offset, 'printer_enem',200,'crazy').setScale(1.5);
        this.enemy3 = new Enemy(this, 300, 100 + cam_offset, 'printer_enem',200,'crazy').setScale(1.5);
        this.key = new Key(this, 220, 485 + cam_offset, 'key',200,'horiz').setScale(1.7); //add the key
        this.stair = new Stair(this, 860, 180 + cam_offset, 'stair').setScale(1.7).setImmovable();  //add stairs
        this.stair.setScale(2.7);

        this.enemy.body.setSize(this.hero.width * 0.48, this.enemy.height *0.53); //set collision
        this.enemy1.body.setSize(this.enemy1.width * 0.34, this.enemy1.height *0.8); //set collision
        this.enemy2.body.setSize(this.enemy2.width * 0.68, this.enemy2.height *0.56);
        this.enemy3.body.setSize(this.enemy3.width * 0.68, this.enemy3.height *0.56);

        this.physics.add.collider(this.enemy, groundLayer);
        this.physics.add.collider(this.enemy, propLayer);
        this.physics.add.collider(this.enemy, stairLayer);

        this.physics.add.collider(this.enemy1, groundLayer);
        this.physics.add.collider(this.enemy1, propLayer);
        this.physics.add.collider(this.enemy1, stairLayer);

        this.physics.add.collider(this.enemy2, groundLayer);
        this.physics.add.collider(this.enemy2, propLayer);
        this.physics.add.collider(this.enemy2, stairLayer);

        this.physics.add.collider(this.enemy3, groundLayer);
        this.physics.add.collider(this.enemy3, propLayer);
        this.physics.add.collider(this.enemy3, stairLayer);

        this.physics.add.collider(this.key, groundLayer);
        this.physics.add.collider(this.key, propLayer);
        
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(this.hero, groundLayer);
        this.physics.add.collider(this.hero, propLayer);
        this.physics.add.collider(this.hero, stairLayer);

        this.physics.add.collider(this.hero,this.enemy, this.handlePlayerEnemyCollision,null,this);
        this.physics.add.collider(this.hero,this.enemy1, this.handlePlayerEnemyCollision,null,this);
        this.physics.add.collider(this.hero,this.enemy2, this.handlePlayerEnemyCollision,null,this);
        this.physics.add.collider(this.hero,this.enemy3, this.handlePlayerEnemyCollision,null,this);

        this.physics.add.collider(this.hero,this.key, this.handlePlayerKeyCollision,null,this); //key collision
        this.physics.add.collider(this.hero,this.stair, this.handlePlayerStairCollision,null, this);
        this.cameras.main.startFollow(this.hero, true, 0.8, 0.8)


        this.swap = this.input.keyboard.addKey('V');


        this.dash_sfx = this.sound.add('dash_sfx', {loop: false});
        this.dmg_sfx = this.sound.add('take_damage_sfx',{loop: false});
        this.footsteps = this.sound.add('footsteps_sfx',{volume: 0.3, loop: false});
        this.lose_sfx = this.sound.add('lose_sfx',{volume: 0.3, loop: false});
        this.bgm = data.music;
        this.restarted = data.restart;
        if(this.restarted){
            this.bgm.play();
        }
        
    }
    update(time, delta){
        
        this.heroFSM.step();
        this.enemy.update();
        this.enemy1.update();
        this.enemy2.update();
        this.enemy3.update();
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            this.scene.start('Level4');
            //this.bgm.stop();
        }
        this.UImanager.updateHealthUI(this.hero,this.heartFull, this.heartEmpty, this.heartHalf);
        this.UImanager.updateDashUI(this.hero, this.dashFull, this.dashEmpty)
        this.stair.update();
    }
    handlePlayerKeyCollision(player, key){
        this.keyCount++;
        this.key.destroy();
        if(this.keyCount >= this.totalKeys){
            this.stair.locked = false;
        }
        console.log("Key Collected", this.keyCount);
    }

    handlePlayerStairCollision(player){
        console.log("touching stair", this.keyCount);
        if(this.keyCount == 1) { 
            this.scene.start('Level4',{music: this.bgm} );
        }
    }
    handlePlayerEnemyCollision(player, enemy){
        if(player.tookDMG == false){
            this.dmg_sfx.play();
            player.health -= 1; 
            player.tookDMG = true;
            if(player.health == 0) {
                this.bgm.stop();
                this.lose_sfx.play();
                this.scene.start('goScene',{music: this.bgm, level: 'third'});
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