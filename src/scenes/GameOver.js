class GameOver extends Phaser.Scene{
    constructor(){
        super('goScene');
    }

    preload(){
        
    }
    create(data){
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        //create animations he
        // this.scene.start('playScene')
        //fade in the credits screen 
        //fade out the credits screen 
        //fade in the title screen 
        //allow for user to press start and fade out title screen into 
        //backstory screen, then go into the play screen 
        document.getElementById('description').innerHTML = '<h2>Menu.js</h2><br>V: Next Scene';
        this.add.image(0, 0, 'gameOverScreen').setOrigin(0, 0);
        this.restart_level = this.input.keyboard.addKey('R');
        this.goto_title = this.input.keyboard.addKey('SPACE');
        this.re_level = data.level;
        this.bgm = data.music;
        console.log(this.re_level);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.restart_level)){
            switch(this.re_level){
                case 'first':
                    this.scene.start('playScene', {restart: true, music: this.bgm});
                    break;
                case 'second':
                    this.scene.start('Level2', {restart: true, music: this.bgm});
                    break;
                case 'third' :
                    this.scene.start('Level3', {restart: true, music: this.bgm});
                    break;
                case 'fourth':
                    this.scene.start('Level4', {restart: true, music: this.bgm});
                    break;
                default:
                    this.scene.start('menuScene');
                    return;
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.goto_title)){
            this.scene.start('menuScene');
        }

    }
}