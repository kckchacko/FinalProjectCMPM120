// export default class Load extends Phaser.Scene{
class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        this.load.path = './assets/'; 

        //load atlases,images, and spritesheets and audio here
        // assets/tilesheets/testTiledMap.json
        // this.load.image('hero', 'characters/hero_idle_0.png');
        //this.load.image('tiles', '../assets/tilesheets/officeImage.png')
        this.load.image('weapon','weapons/mani_weapon.png');
        this.load.image('temp_enem', 'enemies/enem_stapler_0.png');
        //this.load.tilemapTiledJSON('office','tilesheets/testTiledMap.json');
        // this.load.spritesheet('hero_idle','characters/hero_idle.png', {
        //     frameWidth: 15,
        //     frameHeight: 19,
        //     startFrame: 1,
        //     endFrame: 4
        // } );
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