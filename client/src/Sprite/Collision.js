export default class Collision{
    constructor(x,y, width, height, ctx){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tag = "collision";

        this.visible = false;
        
        this.ctx = ctx;

    }



    tick(){
        let alive = true;
        
        if(this.visble){
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        return alive;
    }

}