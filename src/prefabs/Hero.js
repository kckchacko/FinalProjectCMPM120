class Hero extends Phaser.Physics.Arcade.Sprite{

    init(){

    }


    constructor(scene, x,y, key, frame, health, speed){
        super(scene, x, y, key, frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        //set health for player
        this.health = health; 
        //set speed for player
        this.speed = speed; 
        
        this.dashing = false; 
        this.invlunerable = false; 
        //createAnims(); currently not implemented
       
        //add movement keys 
        const {W,A,S,D} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            w: W, //up 
            a: A, //left
            s: S, //down
            d: D, //right
            q: Q, //dash
            e: E, //slash
            c: C  //interact (items)
        })
    }


    //function to create animations for the player sprite 
    createAnims(){

    }


    update(time, delta){
        super.update();


        //============Movement================================
            //walking 
            if(keys.w.isDown){
                this.body.setVelocityY(speed);
            }else if(keys.s.isDown){
                this.body.setVelocityY(-speed);
            }

            if(keys.a.isDown){
                this.body.setVelocityX(-speed);
            }else if(keys.d.isDown){
                this.body.setVelocityX(speed);
            }

            //dashing/dodge roll 
            if(keys.q.justDown){
                this.dashing = true; 
                this.invlunerable = true;
                
            }
        //============Movement End============================
            //slash
            if(keys.e.justDown){

            }
            
            //interact 
            if(keys.c.justDown){

            }
        
    }


}