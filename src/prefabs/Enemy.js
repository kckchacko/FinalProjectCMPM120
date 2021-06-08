 class Enemy extends Phaser.Physics.Arcade.Sprite{

    init(){

    }
     
    constructor(scene, x,y, texture,speed,type){
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        //set speed for enemy
        this.speed = speed; 
        this.type = type;
        this.body.onCollide = true; 
        switch(type){
            case 'horiz':
                this.body.setVelocityX(this.speed);
                break;
            case 'verti':
                this.body.setVelocityY(this.speed);
                break;
            case 'crazy' :
                this.body.setVelocity(this.speed, this.speed);
                break;
            default:
                return;
        }
        this.body.setImmovable(true);

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
                    enemy.flipX = false;
                    enemy.body.setVelocityX(this.speed);
                }
                if(enemy.body.blocked.right ){
                    enemy.speed = -this.speed 
                    enemy.flipX = true;
                    enemy.body.setVelocityX(this.speed);
                    // console.log(enemy.body.blocked);
        
                }
                break;
            case 'verti':
                if(enemy.body.blocked.up){
                    enemy.speed = -this.speed 
                    // enemy.flipX = false;
                    enemy.body.setVelocityY(this.speed);
                }
                if(enemy.body.blocked.down){
                    enemy.speed = -this.speed 
                    // enemy.flipX = true;
                    enemy.body.setVelocityY(this.speed);
                    // console.log("hello");
        
                }
                break;
            case 'crazy':
                if(enemy.body.blocked.left){
                    enemy.speed = -this.speed 
                    enemy.flipX = false;
                    enemy.body.setVelocityX(this.speed);
                }
                if(enemy.body.blocked.right ){
                    enemy.speed = -this.speed 
                    enemy.flipX = true;
                    enemy.body.setVelocityX(this.speed);
                    
                }
                if(enemy.body.blocked.up){
                    enemy.speed = -this.speed 
                    // enemy.flipX = false;
                    enemy.body.setVelocityY(this.speed);
                }
                if(enemy.body.blocked.down){
                    enemy.speed = -this.speed 
                    // enemy.flipX = true;
                    enemy.body.setVelocityY(this.speed);
                    // console.log("hello");
        
                }
            default:
                return;
        }
        
    }

}
// function handleWallCollision(enemy){
//     enemy.body.setVelocityX(-this.speed);
// }