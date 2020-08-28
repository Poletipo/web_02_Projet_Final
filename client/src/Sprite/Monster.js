import {TiledImage} from "../TiledImage"
export default class Monster{
    constructor(name, ctx, canvas){
        this.x = Math.random() * 800 +128;
        this.y =  Math.random() * 500 + 300;
        this.PlayerName  = name;

        this.tag = "Monster";

        this.time = Math.random() * 1000; 
        this.ctx = ctx;
        this.alive = true;
        this.speedX = Math.random() * 4 -2;
        this.speedY = -Math.random() * 5 - 1;
        this.gravity = 9;
        this.jumping = false;

        this.loopTime = 0;

        this.previousX = this.x;
        this.previousY = this.y;

        let columnCount = 2;
		let rowCount = 2;
		let refreshDelay = 300;
		let scale = 4;
        let loopColumn = true;

        this.image = "./img/NES - The Legend of Zelda - Ennemies.png";
        if(Math.random() < 0.5){
            this.image = "./img/NES - The Legend of Zelda - Ennemies_02.png";
        }
        
        this.sprite = new TiledImage(this.image,
        columnCount, rowCount, refreshDelay , loopColumn, scale);
        this.sprite.setPaused(false);

    }

    tick(deltaTick){

        this.loopTime += deltaTick *1000;
        if(this.jumping){
            if(this.x <= 128 || this.x >= canvas.width - 128){
                this.speedX = -this.speedX;
            }
            if(this.y <= 300){
                this.speedY = 2;
            }
            if(this.y >= canvas.height - 128){
                this.speedY = -4;
            }
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity * deltaTick;
            this.sprite.changeRow(1);
        }
        else{
            this.sprite.changeRow(0);
        }

        if(this.loopTime > this.time && !this.jumping){
            this.jumping = true;
            this.time = Math.random() * 1000 + 500;
            this.loopTime = 0;
        }else if(this.loopTime > this.time && this.jumping){
            this.jumping = false;
            this.time = Math.random() * 1000 + 1000;
            this.loopTime = 0;
            this.speedX = Math.random() * 4 -2;
            this.speedY = -Math.random() * 5 - 1;
        }


        this.sprite.tick(this.x, this.y, this.ctx);
        this.ctx.fillStyle = "red";
        this.ctx.font = "24px Open Sans"
        this.ctx.fillText(this.PlayerName, this.x - (this.PlayerName.length * 12), this.y - 32);

        return this.alive;
    }
    
}