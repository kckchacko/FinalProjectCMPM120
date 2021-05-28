// export default class Menu extends Phaser.Scene{
class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }

    preload(){
        
    }
    create(){
        //create animations he
        // this.scene.start('playScene')
        document.getElementById('description').innerHTML = '<h2>Menu.js</h2><br>V: Next Scene';
        this.swap = this.input.keyboard.addKey('V');
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            this.scene.start('playScene');
        }
    }
}