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
        this.body.setVelocityX(this.speed);
        // scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, handleWallCollision(this));
        //createAnims(); currently not implemented
       
        //add movement keys 
        // const {W,A,S,D,Q} = Phaser.Input.Keyboard.KeyCodes
        // this.keys = scene.input.keyboard.addKeys({
        //     w: W, //up 
        //     a: A, //left
        //     s: S, //down
        //     d: D, //right
        //     q: Q //dash
        //     // e: E, //slash
        //     // c: C  //interact (items)
        // })
    }

    
    //function to create animations for the player sprite 
    createAnims(){

    }


    update(){
        // super.update();
        this.check_blocked(this, this.type);
        // if(this.)
        // console.log(this.body.blocked)
        // if(this.type = "horiz"){
            
        // }
        // if(this.type = "verti"){
        //     this.body.setVelocityY(this.speed);
        // }
        // this.body.setVelocity(0);
        
        
    
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
function handleWallCollision(enemy){
    enemy.body.setVelocityX(-this.speed);
}