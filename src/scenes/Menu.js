export default class Menu extends Phaser.scene{
    constructor(){
        super('menuScene');
    }

    preload(){
        
    }
    create(){
        //create animations he
        this.scene.start('playScene')
    }
}