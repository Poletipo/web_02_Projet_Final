export default class Story{
    constructor(canvas){
        this.x = 0;
        this.y = canvas.height;
        this.speed = -1;
        this.story = document.createElement("div");
        this.story.className = "index-story";
        this.story.style.top = this.y + "px";
        document.querySelector("#index-overflow").appendChild(this.story);
        this.alive = true;
        
    }
    
    
    tick(deltaTick){

        if(this.y >= 0){
            this.y += this.speed * deltaTick * 100;
        }
        this.story.style.top = this.y + "px";
        
        if(!this.alive){
            this.story.remove();
        }

        return this.alive;
    }
}