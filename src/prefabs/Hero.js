// export default class Hero extends Phaser.Physics.Arcade.Sprite{
class Hero extends Phaser.Physics.Arcade.Sprite{
    init(){

    }


    constructor(scene, x,y, texture, health, direction){
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //set health for player
        this.health = health; 
        //set speed for player
        this.direction = direction; 
        this.heroVel = 200; //in pixels  
        this.dashTime = 300; //in ms 
        this.dashCD = 2000; 
        this.canDash = true;
        this.hurtCD = 500; //also in ms 
        this.invlunerable = false; 
        this.body.setCollideWorldBounds(true);
        this.tookDMG = false;
        this.footsteps_played = false;
        this.footsteps_cd = 700;
        //add movement keys 
        const {W,A,S,D,SPACE} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            w: W, //up 
            a: A, //left
            s: S, //down
            d: D, //right
            space: SPACE
        })
        this.body.setSize(this.width * 0.5, this.height *0.7); //set collision
        this.body.setOffset(-1.25,7.5);
        const anims = scene.anims; 
        //create animations
        this.createAnims(anims); 

    }


    

    createAnims(anims){
        //idle animations 
        anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero_blonde', { start: 0, end: 3 }),
        });
        anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero_blonde', { start: 0, end: 3 }),
        });
        anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero_blonde', { start: 0, end: 3 }),
        });
        anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero_blonde', { start: 4, end: 7 }),
        });
        anims.create({
            key: 'idle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero_blonde', { start: 8, end: 11 }),
        });
    

    }
    update(scene, hero){
        
    
    }


}

 class IdleState extends State{
    enter(scene,hero){
        hero.body.setVelocity(0);
        // hero.anims.play(`walk-${hero.direction}`);
        hero.anims.play('idle');
        hero.anims.stop();
        scene.footsteps.stop();
    }
    execute(scene,hero){
       
        if(Phaser.Input.Keyboard.JustDown(hero.keys.space) && hero.canDash){
            this.stateMachine.transition('dash');
            return;
        }
        if(hero.keys.w.isDown || hero.keys.d.isDown || hero.keys.s.isDown || hero.keys.a.isDown ) {
            this.stateMachine.transition('move');
            return;
        }
        if(hero.tookDMG == true){
            this.stateMachine.transition('hurt');
            return;
        }
    }
}

 class MoveState extends State {
    execute(scene, hero) {
        
        // transition to dash if pressing shift
        if(Phaser.Input.Keyboard.JustDown(hero.keys.space) && hero.canDash) {
            
            this.stateMachine.transition('dash');
            return;
        }


        // transition to idle if not pressing movement keys
        if(!(hero.keys.w.isDown || hero.keys.d.isDown || hero.keys.s.isDown || hero.keys.a.isDown)) {
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        hero.body.setVelocity(0);
        if(hero.footsteps_played == false){
            hero.footsteps_played = true;
            scene.footsteps.play();
            scene.time.delayedCall(hero.footsteps_cd, () => {
                hero.footsteps_played = false;
            });
        }
        if(hero.keys.w.isDown) {
            hero.body.setVelocityY(-hero.heroVel);
            hero.direction = 'up';
        } else if(hero.keys.s.isDown) {
            hero.body.setVelocityY(hero.heroVel);
            hero.direction = 'down';
        }
        if(hero.keys.a.isDown) {
            hero.body.setVelocityX(-hero.heroVel);
            hero.direction = 'left';
        } else if(hero.keys.d.isDown) {
            hero.body.setVelocityX(hero.heroVel);
            hero.direction = 'right';
        }
        if(hero.tookDMG == true){
            this.stateMachine.transition('hurt');
            return;
        }
        // handle animation
        hero.anims.play(`walk-${hero.direction}`, true);
    }
}

class DashState extends State {
    enter(scene, hero) {
        hero.body.setVelocity(0);
        scene.dash_sfx.play();
        hero.canDash = false;
        hero.anims.play(`walk-${hero.direction}`);
        
        switch(hero.direction) {
            case 'up':
                hero.body.setVelocityY(-hero.heroVel * 3);
                break;
            case 'down':
                hero.body.setVelocityY(hero.heroVel * 3);
                break;
            case 'left':
                hero.body.setVelocityX(-hero.heroVel * 3);
                break;
            case 'right':
                hero.body.setVelocityX(hero.heroVel * 3);
                break;
        }
        if(hero.tookDMG == true){
            this.stateMachine.transition('hurt');
            return;
        }
        
        

        // set a short delay before going back to idle
        scene.time.delayedCall(hero.dashTime, () => {
            this.stateMachine.transition('idle');
        });
        scene.time.delayedCall(hero.dashCD, () => {
            hero.canDash = true;
        });

    }
}

 class HurtState extends State {
    enter(scene, hero) {
        switch(hero.direction) {
            case 'up':
                hero.body.setVelocity(hero.heroVel,hero.heroVel);
                break;
            case 'down':
                hero.body.setVelocity(-hero.heroVel,-hero.heroVel);
                break;
            case 'left':
                hero.body.setVelocity(hero.heroVel,hero.heroVel);
                break;
            case 'right':
                hero.body.setVelocity(-hero.heroVel,-hero.heroVel);
                break;
        }
        // hero.body.setVelocity(hero.heroVel,hero.heroVel);
        // hero.body.setVelocityX(hero.heroVel * 4);

        hero.anims.play(`walk-${hero.direction}`);
        hero.anims.stop();
        hero.setTint(0xff0000);     // turn red
        hero.setImmovable(true);
        console.log("took damage");
        // set recovery timer
        scene.time.delayedCall(hero.hurtCD, () => {
            hero.tookDMG = false;
            hero.clearTint()
            hero.setImmovable(false);
            this.stateMachine.transition('idle');
        });
        if(hero.keys.w.isDown || hero.keys.d.isDown || hero.keys.s.isDown || hero.keys.a.isDown ) {
            this.stateMachine.transition('move');
            return;
        }
    }
}