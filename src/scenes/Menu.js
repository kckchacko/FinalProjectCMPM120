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
        //fade in the credits screen 
        //fade out the credits screen 
        //fade in the title screen 
        //allow for user to press start and fade out title screen into 
        //backstory screen, then go into the play screen 
        document.getElementById('description').innerHTML = '<h2>Menu.js</h2><br>V: Next Scene';
        this.swap = this.input.keyboard.addKey('V');
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            this.scene.start('playScene');
        }
    }
}