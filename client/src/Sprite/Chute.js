import {TiledImage} from "../TiledImage"

export default class Chute{
    constructor(x,y,ctx,canvas){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.speed = 4;
        let columnCount = 3;
		let rowCount = 1;
		let refreshDelay = 50;
		let scale = 4;
        let loopColumn = true;

        this.sprite = new TiledImage("./img/NES - The Legend of Zelda - Chute.png",
        columnCount, rowCount, refreshDelay , loopColumn, scale); 
        this.sprite.looped = false;
        this.sprite.setPaused(false);
        
        this.loopTime = 0;
        
    }
    
    tick(deltaTick){
        let alive = true;
        
        this.y += (this.speed * deltaTick * 100);

        this.sprite.tick(this.x, this.y,this.ctx);

        if(this.y == canvas.height + 64){
            alive = false;
        }
        return alive;
    }
}