class Hero extends Phaser.Physics.Arcade.Sprite{

    init(){
        
    }


    constructor(scene, x,y, key, frame){
        super(scene, x, y, key, frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);


        
    }


    update(time, delta){
        super.update();
    }


}