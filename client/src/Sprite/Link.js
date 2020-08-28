import {TiledImage} from "../TiledImage"
export default class Link{
    constructor(x, y, ctx, currentRow){
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.ctx = ctx;

        this.inputEnabled = true;

        let columnCount = 2;
		let rowCount = 4;
		let refreshDelay = 100;
		let scale = 4;
        let loopColumn = true;

        this.upArrowOn = false; 
        this.downArrowOn = false; 
        this.leftArrowOn = false; 
        this.rightArrowOn = false; 
        
        this.sprite = new TiledImage("./img/NES - The Legend of Zelda - Link - SpriteSheet.png",
        columnCount, rowCount, refreshDelay , loopColumn, scale);
        
        this.sprite.imageCurrentRow = currentRow;
        
        document.addEventListener("keydown", key =>{
            this.InputPressed(key);
        })
        
        document.addEventListener("keyup", key =>{
            this.InputReleased(key);
        })

    }
    
    
    
    tick(deltaTick){
        let alive = true;
        
        if (this.rightArrowOn) {
			this.sprite.changeRow(1);
            this.sprite.setFlipped(false);
			this.x +=(this.speed * deltaTick * 100);
		}
		if (this.leftArrowOn) {
			this.sprite.changeRow(1);
			this.sprite.setFlipped(true);
			this.x-=(this.speed * deltaTick * 100);
        }
        if (this.upArrowOn) {
			this.sprite.changeRow(2);
			this.sprite.setFlipped(false);
			this.y-=(this.speed * deltaTick * 100);
        }
        if (this.downArrowOn) {
			this.sprite.changeRow(0);
			this.sprite.setFlipped(false);
			this.y+=(this.speed * deltaTick * 100);
		}

		if (!this.rightArrowOn && !this.leftArrowOn && !this.downArrowOn && !this.upArrowOn) {
			this.sprite.setPaused(true);
		}
		else {
			this.sprite.setPaused(false);
        }
    
        this.sprite.tick(this.x, this.y,this.ctx );

        return alive;
    }


    Move(x, y){
        if(x !=0){
            x < 0 ? this.leftArrowOn = true : this.rightArrowOn = true;
            this.speed = Math.abs(x);
        }
        if(y !=0){
            y < 0 ? this.upArrowOn = true : this.downArrowOn = true;
            this.speed = Math.abs(y);
        }
    }

    Stop(){
        this.downArrowOn = false;
        this.leftArrowOn = false;
        this.upArrowOn = false;
        this.rightArrowOn = false;

        this.speed = 4;
    }


    InputPressed(key){
        if(this.inputEnabled){
            if(key.which == 37){
                this.leftArrowOn = true;

                this.upArrowOn = false;
                this.rightArrowOn = false;
                this.downArrowOn = false;
            } 
            else if(key.which == 38){
                this.upArrowOn = true;

                this.leftArrowOn = false;
                this.rightArrowOn = false;
                this.downArrowOn = false;
            }
            else if(key.which == 39){
                this.rightArrowOn = true;

                this.leftArrowOn = false;
                this.upArrowOn = false;
                this.downArrowOn = false;
            }
            else if(key.which == 40){
                this.downArrowOn = true;

                this.leftArrowOn = false;
                this.upArrowOn = false;
                this.rightArrowOn = false;
            }
        }
    }

    InputReleased(key){
        
            if(key.which == 37){
                this.leftArrowOn = false;
            } 
            else if(key.which == 38){
                this.upArrowOn = false;
            }
            else if(key.which == 39){
                this.rightArrowOn = false;
            }
            else if(key.which == 40){
                this.downArrowOn = false;
            }
    }


}