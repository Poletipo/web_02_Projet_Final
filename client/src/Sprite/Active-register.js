export default class Active{
    constructor(){
        this.x = 4*112 ;//+ 4*16;
        this.y = 4*155;//+ 4*16;
        this.size = 64;

        this.square = document.createElement("div");
        this.square.className = "selector";

        document.querySelector(".input-register").appendChild(this.square);

        this.square.style.top = this.y + "px";
        this.square.style.left = this.x + "px";
        this.activeElement = null;

        this.loopTime = 0;
        this.opacity = 1;
    }
    
    
    tick(deltaTick){
        let alive = true;
        
        this.loopTime += deltaTick;
        
        if(this.loopTime >= 0.15){
            if(this.opacity == 1){
                this.opacity = 0;
                this.square.style.opacity = this.opacity ;
            }
            else{
                this.opacity = 1;
                this.square.style.opacity = this.opacity;
            }
            this.loopTime = 0;
        }

        this.activeElement = document.activeElement;
        this.y = this.activeElement.offsetTop;

        if(this.activeElement.tagName == "INPUT"){
            this.square.style.display = "block";
        }else{
            this.square.style.display = "none";
        }
        this.square.style.top = this.y + 4 + "px";

         return alive;
    }
}