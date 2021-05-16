export default class Enemy extends Phaser.Physics.Arcade.Sprite{

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
        const {W,A,S,D,Q} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            w: W, //up 
            a: A, //left
            s: S, //down
            d: D, //right
            q: Q //dash
            // e: E, //slash
            // c: C  //interact (items)
        })
    }


    //function to create animations for the player sprite 
    createAnims(){

    }


    update(){
        super.update();

        this.body.setVelocity(0)

        //============Movement================================
            //walking, incorporate set speed later 
            // if(this.keys.w.isDown){
            //     this.body.setVelocityY(-200);
            // }else if(this.keys.s.isDown){
            //     this.body.setVelocityY(200);
            // }

            // if(this.keys.a.isDown){
            //     this.body.setVelocityX(-200);
            // }else if(this.keys.d.isDown){
            //     this.body.setVelocityX(200);
            // }

            // //dashing/dodge roll 
            // if(this.keys.q.justDown){
            //     this.dashing = true; 
            //     this.invlunerable = true;
                
            // }
        //============Movement End============================
            // //slash
            // if(keys.e.justDown){

            // }
            
            // //interact 
            // if(keys.c.justDown){

            // }
    
    }


}