// export default class Load extends Phaser.Scene{
class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 
            loadingBar.fillStyle(0xFFFFFF, 1);                  
            loadingBar.fillRect(0, centerY, w * value, 5);  
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/'; 

        this.load.image('credits','screens/Credits.png');
        this.load.image('titleScreen', 'screens/Title.png');
        this.load.image('gameOverScreen', 'screens/Game Over.png');
        this.load.image('winScreen', 'screens/EndScreen.png');
        this.load.image('story', 'screens/Story.png');
        
        this.load.image('weapon','weapons/mani_weapon.png');
        this.load.image('key','weapons/key.png');
        this.load.image('temp_enem', 'enemies/enem_stapler_0.png');

        //load ui images
        this.load.image('microtileset', 'tilesheets/wallsfloor2.png');
        this.load.image('stair', 'tilesheets/stair.png');
        this.load.image('heartEmpty', 'UI/heartDead.png');
        this.load.image('heartHalf', 'UI/heartHalf.png');
        this.load.image('heartFull', 'UI/heartFull.png');
        this.load.image('INTERN_Label','UI/Intern.png');
        this.load.image('DASH_Label', 'UI/Dash.png');
        this.load.image('dashEmpty','UI/DashEmpty.png');
        this.load.image('dashFull','UI/DashFull.png');
        this.load.image('level1Label', 'UI/Level_1label.png')
        this.load.image('level2Label', 'UI/Level_2label.png')
        this.load.image('level3Label', 'UI/Level_3label.png')
        this.load.image('level4Label', 'UI/Level_4label.png')
       
        //load the spritesheet
        this.load.spritesheet('hero', 'characters/hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        // this.load.atlas('hero_run_atlas', 'characters/hero_run.png', 'characters/hero_run.json');

        this.load.audio('dash_sfx', 'sfx/dash.wav');
        this.load.audio('deal_damage_sfx', 'sfx/deal_damage.wav');
        this.load.audio('slash_sfx', 'sfx/deal_damage.wav');
        this.load.audio('take_damage_sfx', 'sfx/take_damage.wav');
        this.load.audio('temp_bgm', 'sfx/finalProjTempbgm.mp3')
    }
    create(){
        //create animations here
        this.scene.start('menuScene')
    }
}