import {TiledImage} from "../TiledImage"
import Flash from "./Flash"
export default class Sword{
    constructor(x, y, dir, ctx, spriteList){
        this.x = x;
        this.y = y;
        this.speed = 8;
        this.dir = dir; 
        this.ctx = ctx;
        this.spriteList = spriteList;

        let columnCount = 2;
		let rowCount = 3;
		let refreshDelay = 25;
		let scale = 4;
        let loopColumn = true; 
        
        this.sprite = new TiledImage("./img/NES - The Legend of Zelda - AnimatedSword.png",
        columnCount, rowCount, refreshDelay , loopColumn, scale);
        this.sprite.looped = true;
        this.sprite.setPaused(false);

        setTimeout(() =>{

        }, 1000)

    }


    tick(deltaTick, spriteList){
        let alive = true;

        if(this.dir == 0){
            this.y -= this.speed * deltaTick*100;
            this.sprite.changeRow(0);
			this.sprite.setFlipped(false);
        }else if(this.dir ==1){
            this.x += this.speed * deltaTick*100;
            this.sprite.changeRow(1);
			this.sprite.setFlipped(false);
        }else if(this.dir == 2){
            this.y += this.speed* deltaTick*100;
            this.sprite.changeRow(2);
			this.sprite.setFlipped(false);
        }else{
            this.x-= this.speed * deltaTick*100;
            this.sprite.changeRow(1);
			this.sprite.setFlipped(true);
        }
        
        this.sprite.tick(this.x, this.y , this.ctx);

        for(let i = 0; i < spriteList.length ; i++){
            if(spriteList[i].tag == "Monster"){
                if(Math.abs(this.x - spriteList[i].x) < 64 &&
                Math.abs(this.y - spriteList[i].y) < 64){
                    alive = false;
                    new Audio("./sound/LOZ_Enemy_Die.wav").play();
                    spriteList.push(new Flash(spriteList[i].x, spriteList[i].y, -1, -1, this.ctx));
                    spriteList.push(new Flash(spriteList[i].x, spriteList[i].y, -1, 1, this.ctx));
                    spriteList.push(new Flash(spriteList[i].x, spriteList[i].y, 1, -1, this.ctx));
                    spriteList.push(new Flash(spriteList[i].x, spriteList[i].y, 1, 1, this.ctx));
                    spriteList[i].alive = false;
                }
            }
        }

        if(this.x <= 0 || this.x >= 1024 || this.y <= 224 || this.y >= 896){
            alive = false;
                    spriteList.push(new Flash(this.x, this.y, -1, -1, this.ctx));
                    spriteList.push(new Flash(this.x, this.y, -1, 1, this.ctx));
                    spriteList.push(new Flash(this.x, this.y, 1, -1, this.ctx));
                    spriteList.push(new Flash(this.x, this.y, 1, 1, this.ctx));
        }
        
        return alive;
    }
}