import {TiledImage} from "../TiledImage"

export default class Sword{
    constructor(x,y, dirX, dirY, ctx){
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.speed = 2;

        this.deathTime = 0;

        this.ctx = ctx;

        let columnCount = 2;
		let rowCount = 2;
		let refreshDelay = 25;
		let scale = 4;
        let loopColumn = true; 
        
        this.sprite = new TiledImage("./img/NES - The Legend of Zelda - Flash.png",
        columnCount, rowCount, refreshDelay , loopColumn, scale);
        this.sprite.looped = true;
        this.sprite.setPaused(false);
    }

tick(deltaTick){

    let alive = true;

    this.deathTime += deltaTick;
    if(this.dirX < 0){
        this.sprite.setFlipped(false);
    }else{
        this.sprite.setFlipped(true);
    }
    if(this.dirY > 0){
        this.sprite.changeRow(1);
    }


    if(this.deathTime >= 0.3){
        alive = false;
    }

    this.x += this.dirX * deltaTick *100 * this.speed;
    this.y += this.dirY * deltaTick *100 * this.speed;

    this.sprite.tick(this.x, this.y, this.ctx);


    return alive;
}
}