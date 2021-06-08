class Credits extends Phaser.Scene{
    constructor(){
        super('creditScene');
    }

    preload(){
        
    }
    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        //create animations he
        // this.scene.start('playScene')
        //fade in the credits screen 
        //fade out the credits screen 
        //fade in the title screen 
        //allow for user to press start and fade out title screen into 
        //backstory screen, then go into the play screen 
        document.getElementById('description').innerHTML = '<h2>Menu.js</h2><br>V: Next Scene';
        this.add.image(0, 0, 'credits').setOrigin(0, 0);
        this.swap = this.input.keyboard.addKey('R');
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.swap)){
            this.scene.start('menuScene');
        }
    }
}