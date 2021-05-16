export default class Weapon extends Phaser.Physics.Arcade.Sprite{



    constructor(scene, x,y, key){
        super(scene, x, y, key);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //set health for player

    }


    //function to create animations for the player sprite 
    createAnims(){

    }


    update(){
        super.update();

        this.body.setVelocity(0)

        //============Movement================================
            //walking, incorporate set speed later 
            if(this.keys.w.isDown){
                this.body.setVelocityY(-200);
            }else if(this.keys.s.isDown){
                this.body.setVelocityY(200);
            }

            if(this.keys.a.isDown){
                this.body.setVelocityX(-200);
            }else if(this.keys.d.isDown){
                this.body.setVelocityX(200);
            }

            //dashing/dodge roll 
            // if(this.keys.q.justDown){
            //     this.dashing = true; 
            //     this.invlunerable = true;
                
            // }

        //============Movement End============================
            //slash
            if(keys.e.justDown){

            }
            
            // //interact 
            // if(keys.c.justDown){

            // }
    
    }


}