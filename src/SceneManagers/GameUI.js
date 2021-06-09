class GameUI {
    
    constructor(scene, level){
        scene.add.sprite(225,20,'INTERN_Label').setScale(2);
        scene.heartFull = scene.add.sprite(225,60, 'heartFull').setScale(2);
        scene.heartHalf = scene.add.sprite(225,60, 'heartHalf').setScale(2);
        scene.heartEmpty = scene.add.sprite(225,60, 'heartEmpty').setScale(2);
        scene.heartHalf.visible = false;
        scene.heartEmpty.visible = false;
        scene.add.sprite(325, 20, 'DASH_Label').setScale(2);
        scene.dashFull = scene.add.sprite(325, 60, 'dashFull').setScale(2);
        scene.dashEmpty = scene.add.sprite(325, 60, 'dashEmpty').setScale(2);
        scene.dashEmpty.visible = false;
        scene.add.sprite(700, 50, level).setScale(2.5);
    }
    
    updateHealthUI(hero, full, empty, half ){
        if(hero.health == 2){
            full.visible = true;
            half.visible = false;
            empty.visible = false;
        }
        if(hero.health == 1 && hero.tookDMG == false){   
            full.visible = false;
            half.visible = true;
            empty.visible = false;
        }
        if(hero.health <= 0 && hero.tookDMG == false){
            full.visible = false; 
            half.visible = false; 
            empty.visible = true;
        }
    }
    updateDashUI(hero, full, empty){
        if(hero.canDash == true){
            full.visible = true;
            empty.visible = false;
        }
        if(hero.canDash == false){
            full.visible = false;
            empty.visible = true;
        }
    }

    
}