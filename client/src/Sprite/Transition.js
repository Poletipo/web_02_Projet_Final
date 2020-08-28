export default class Transition{
    constructor(time){
        this.black = document.createElement("div");
        this.black.className = "transition";
        document.querySelector("body").appendChild(this.black);
        this.alive = true;
        this.time = time;
        setTimeout(()=>{this.alive = false; console.log("Doot");}, this.time);
    }

    tick(){


        if(!this.alive){
            this.black.remove();
        }
        
        return this.alive;
    }



}