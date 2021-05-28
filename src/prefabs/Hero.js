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
        this.hurtCD = 500; //also in ms 
        this.invlunerable = false; 
        this.body.setCollideWorldBounds(true);
        
       
        //add movement keys 
        const {W,A,S,D,Q,E} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            w: W, //up 
            a: A, //left
            s: S, //down
            d: D, //right
            q: Q, //dash
            e: E, //slash
            // c: C  //interact (items)
        })

        const anims = scene.anims; 
        //create animations
        this.createAnims(anims); //currently not implemented



        // this.footsteps = this.time.addEvent({
        //     duration: 500,
        //     repeat: -1,
        //     callbackScope: this,
        //     callback: function () {
        //       if(this.player.isWalking) {
        //         this.sound.play('playerStep');
        //       }
        //     }
        //   });
    }


    //function to create animations for the player sprite 
    createAnims(anims){
        //idle animations 
        anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        });
        anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        });
        anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
        });
        anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
        });

        // hero animations (swinging)
        anims.create({
            key: 'swing-down',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 16, end: 19 }),
        });
        anims.create({
            key: 'swing-up',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 20, end: 23 }),
        });
        anims.create({
            key: 'swing-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 24, end: 27 }),
        });
        anims.create({
            key: 'swing-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 28, end: 31 }),
        });

    }


    update(scene, hero){
        
        // super.update();

        // this.body.setVelocity(0)

        // //============Movement================================
        //     //walking, incorporate set speed later 
        //     if(this.keys.w.isDown){
        //         this.body.setVelocityY(-200);
        //     }else if(this.keys.s.isDown){
        //         this.body.setVelocityY(200);
        //     }

        //     if(this.keys.a.isDown){
        //         this.body.setVelocityX(-200);
        //     }else if(this.keys.d.isDown){
        //         this.body.setVelocityX(200);
        //     }

        //     //dashing/dodge roll 
        //     if(this.keys.q.justDown){
        //         this.dashing = true; 
        //         this.invlunerable = true;
        //     }
        //============Movement End============================
            // //slash
            // if(keys.e.justDown){

            // }
            
            // //interact 
            // if(keys.c.justDown){

            // }
    
    }


}

 class IdleState extends State{
    enter(scene,hero){
        hero.body.setVelocity(0);
        hero.anims.play(`walk-${hero.direction}`);
        hero.anims.stop();
    }
    execute(scene,hero){
        if(Phaser.Input.Keyboard.JustDown(hero.keys.e)){
            this.stateMachine.transition('swing');
            return;
        }

        if(Phaser.Input.Keyboard.JustDown(hero.keys.q)){
            this.stateMachine.transition('dash');
            return;
        }
        if(hero.keys.w.isDown || hero.keys.d.isDown || hero.keys.s.isDown || hero.keys.a.isDown ) {
            this.stateMachine.transition('move');
            return;
        }
    }
}

 class MoveState extends State {
    execute(scene, hero) {
        // use destructuring to make a local copy of the keyboard object
        // const { left, right, up, down, space, shift } = scene.keys;
        // const HKey = scene.keys.HKey;

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(hero.keys.e)) {
            this.stateMachine.transition('swing');
            return;
        }

        // transition to dash if pressing shift
        if(Phaser.Input.Keyboard.JustDown(hero.keys.q)) {
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

        // handle animation
        hero.anims.play(`walk-${hero.direction}`, true);
    }
}
class SwingState extends State {
    enter(scene, hero) {
        hero.body.setVelocity(0);
        hero.anims.play(`swing-${hero.direction}`);
        hero.once('animationcomplete', () => {
            this.stateMachine.transition('idle');
        });
    }
}

class DashState extends State {
    enter(scene, hero) {
        hero.body.setVelocity(0);
        hero.anims.play(`swing-${hero.direction}`);
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

        // set a short delay before going back to idle
        scene.time.delayedCall(hero.dashTime, () => {
            this.stateMachine.transition('idle');
        });
    }
}

 class HurtState extends State {
    enter(scene, hero) {
        hero.body.setVelocity(0);
        hero.anims.play(`walk-${hero.direction}`);
        hero.anims.stop();
        hero.setTint(0xFF0000);     // turn red

        // set recovery timer
        scene.time.delayedCall(hero.hurtCD, () => {
            hero.clearTint();
            this.stateMachine.transition('idle');
        });
    }
}