export default class Weapon extends Phaser.Physics.Arcade.Sprite{



    constructor(scene, x,y, key){
        super(scene, x, y, key);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.slash_sfx = scene.sound.add('slash_sfx');

        //set health for player
        const {W,A,S,D,E} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            w: W, //up 
            a: A, //left
            s: S, //down
            d: D, //right
            e: E //slash
        })
        this.activeCheck = false;
    }


    //function to create animations for the player sprite 
    createAnims(){

    }


    update(){
        super.update();

        this.body.setVelocity(0)

        //============Move weapon with player================================
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
            if(this.keys.e.isDown){
                console.log('slash!');
                this.slash_sfx.play;
                this.setActive(true);
                this.setVisible(true);
                this.activeCheck = true;
            }else{
                this.activeCheck = false;
                this.setActive(false);
                this.setVisible(false);
            }

           
        //============Movement End============================
            //slash
            
            
            // //interact 
            // if(keys.c.justDown){

            // }
    
    }


}