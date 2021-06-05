class Level2 extends Phaser.Scene{  
    constructor(){
        super('Level2');
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
                this.load.tilemapTiledJSON('Level', "tilesheets/LFour.json");
            default:
                this.load.tilemapTiledJSON('Level', "tilesheets/LOne.json");
        }
        this.load.image('microtileset', 'tilesheets/wallsfloor2.png');
    }
    create(){ 
        document.getElementById('description').innerHTML = '<h2>Play.js</h2><br>222WASD to move, E to attack, V to go to menu';
        const map = this.add.tilemap('Level2');
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
        this.hero.body.setSize(this.hero.width * 0.48, this.hero.height *0.68); //set collision
        this.heroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            dash: new DashState(),
            hurt: new HurtState(),
        }, [this, this.hero]);

        this.enemy = new Enemy(this, 500, 500, 'temp_enem',200,'horiz').setScale(1.5);
        this.enemy.body.setSize(this.hero.width * 0.48, this.enemy.height *0.53); //set collision
        this.physics.add.collider(this.enemy, groundLayer);
        this.physics.add.collider(this.enemy, propLayer);
        
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.hero, groundLayer);
        this.physics.add.collider(this.hero, propLayer);
        this.physics.add.collider(this.hero,this.enemy, this.handlePlayerEnemyCollision,null,this);
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
            this.scene.start('Level3');
            this.bgm.stop();
        }
    }
    handlePlayerEnemyCollision(player, enemy){
        // if(!enemy.alreadyOverlapp)
        player.health -= 1; 
        player.body.setVelocityX(-enemy.speed * 2);
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
    handleEnemyWallCollision(enemy){
        // enemy.body.setVelocityX(-enemy.speed);
        enemy.speed= -enemy.speed;
    }
}