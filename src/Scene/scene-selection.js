import UIdata from "../UI-data.json" with {type:"json"}
import SubmarineData from "../Submarine/submarine-data.json" with {type:"json"}
export class SelectionMenu extends Phaser.Scene{

    constructor(config){
        super({key:"SelectionMenu"})
        this.config = config;
    }

    init(){}

    create(config){
        this.screenWidth = this.cameras.main.width;   // 800
        this.screenHeight = this.cameras.main.height; // 600

        let data = JSON.parse(JSON.stringify(SubmarineData));

        this.leftBG = this.add.rectangle(0,0,this.screenWidth,this.screenHeight,0x1c2e4a,1).setOrigin(0,0).setDepth(-1);
        this.add.existing(matrix);
        matrix.setVisible(true);   
        matrix.setAlpha(1);
    }
}