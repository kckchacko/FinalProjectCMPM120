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



    update(){
    
    }

}
