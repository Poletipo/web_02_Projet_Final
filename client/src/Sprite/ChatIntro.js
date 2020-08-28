import Link from "./Link"
export default class ChatIntro{
    constructor(ctx, canvas){
        this.ctx = ctx;
        this.canvas = canvas;
        this.name = "ChatIntro";

        this.oldMan = new Image();
        this.oldMan.src = "./img/NES - The Legend of Zelda - OldMan.png"

        this.fire = new Image();
        this.fireSide = 1;
        this.fireAnim();

        this.sword = new Image();
        this.sword.src = "./img/NES - The Legend of Zelda - BrownSword.png"
        this.swordPosX = this.canvas.width/2 - 16;
        this.swordPosY = 592;

        this.swordTaken = false;

        this.link = new Link(this.canvas.width/2, this.canvas.height - 32, this.ctx,2, []);
        this.link.inputEnabled = false;

        this.text = "IT'S DANGEROUS TO GO ALONE! TAKE THIS.";
        this.textTowrite1 = "I";
        this.textTowrite2 = "";
        this.countForText = 0;
        this.textLoop = 0;
    }
    
    tick(deltatick){
        let alive = true;
        if(this.oldMan != null){
            this.ctx.drawImage(this.oldMan, this.canvas.width/2 - 32, 496, 64, 64);
        }
        if(this.sword != null){
            this.ctx.drawImage(this.sword, this.swordPosX, this.swordPosY, 28,64);
        }
        this.link.tick(deltatick);
        this.ctx.drawImage(this.fire,280,496, 64,64);
        this.ctx.drawImage(this.fire,672,496, 64,64);
        
        if(this.textLoop >= 0.1 && this.countForText < 38){
            this.countForText++;
            if(this.countForText < 21){
                this.textTowrite1 += this.text[this.countForText];
            }else if(this.countForText < 38){
                this.textTowrite2 += this.text[this.countForText];
            }
            this.textLoop = 0;
        }else if(this.countForText == 38 && !this.swordTaken){
            if(this.link.y - this.swordPosY > 64){
                this.link.Move(0,-2);
            }
            else{
                this.link.Stop();
                this.link.sprite.imageCurrentRow = 3;
                this.link.sprite.imageCurrentCol = 0;
                this.swordPosY -= 32;
                this.swordPosX -= 16;
                this.swordTaken = true;

                new Audio("./sound/LOZFDS_Fanfare.wav").play();
                new Audio("./sound/LOZ_Get_Item.wav").play();

                setTimeout(() =>{
                    this.oldMan = null;
                }, 1200);
                setTimeout(() =>{
                    this.link.Move(0, 2)
                    this.sword = null;
                }, 2300);
            }
        }

        this.textLoop += deltatick;

        if(!this.swordTaken){
            this.ctx.fillStyle = "white";
            this.ctx.font = "32px Open Sans"
            this.ctx.fillText(this.textTowrite1, 192 ,420);
            this.ctx.fillText(this.textTowrite2, 256 ,456);
        }
        
        if(this.link.y > this.canvas.height){
            alive = false;
        }

        return alive;
    }

    fireAnim(){
        setTimeout(()=>{
            this.fireSide = -this.fireSide;
            if(this.fireSide < 0){
                this.fire.src = "./img/NES - The Legend of Zelda - Fire.png"
            }else{
                this.fire.src = "./img/NES - The Legend of Zelda - FireFlip.png"
            }
            this.fireAnim();
        }, 100);
    }
}