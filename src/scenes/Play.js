export default class Play extends Phaser.scene{
    constructor(){
        super('playScene');
    }

    preload(){
        
    }
    create(){
        
        this.hero = new Hero(this, 200, 120, 'unicorn', 100).setScale(0.5)
        this.cameras.main.startFollow(this.hero, true, 0.8, 0.8)
        this.hero.body.setCollideWorldBounds(true)
        
    }
    update(time, delta){

    }
}