class Key extends Phaser.Physics.Arcade.Sprite{

    init(){

    }

    constructor(scene, x,y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this); 
        //set speed for enemy
        this.body.onCollide = true; 
    }

    
    //function to create animations for the player sprite 
    createAnims(){

    }


    update(){
        // super.update();
        this.check_blocked(this, this.type);
    
    }

    check_blocked(enemy, enem_type ){
        switch(enem_type){
            case 'horiz':
                if(enemy.body.blocked.left){
                    enemy.speed = -this.speed 
                    enemy.body.setVelocityX(this.speed);
                }
                if(enemy.body.blocked.right ){
                    enemy.speed = -this.speed 
                    enemy.body.setVelocityX(this.speed);
                    // console.log("hello");
        
                }
                break;
            case 'verti':
                break;
            default:
                return;
        }
        
    }

}
