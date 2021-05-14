export default class Load extends Phaser.scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        this.load.path = './assets/';

        //load atlases,images, and spritesheets and audio here
    }
    create(){
        //create animations he
        this.scene.start('menuScene')
    }
}