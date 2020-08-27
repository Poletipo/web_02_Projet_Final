export default class Selector{

    
    constructor(background){
        this.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'
                    , 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
                    , 'W', 'X', 'Y', 'Z', '-', '.', ',', '!', '\'', '&', '.'
                    , '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' '];

        this.x = 4*48 ;//+ 4*16;
        this.y = 4*155;//+ 4*16;
        this.size = 4*8;
        
        this.square = document.createElement("div");
        this.square.className = "selector";
        document.querySelector("body").appendChild(this.square);
        this.square.style.top = this.y + "px";
        this.square.style.left = background.offsetLeft + this.x + "px";

        this.selected = null;
        
        document.addEventListener("keyup", key => {
            this.Write(key, this.selected);
        })
        
        this.background = background;
        this.loopTime = 0;
        this.opacity = 1;
        this.index = 0;
        this.row = 0;
        this.column = 0;
    }
    
    tick(deltaTick){
        let alive = true;
        this.selected = document.activeElement;
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
       
        return alive;
    }


    Write(key){

        //up key
        if(key.which == 38){
            this.y -= 4*16;
            this.index -= 11;
            if(this.letters[this.index] == null){
                this.y = 4*155 +(4*48);
                this.index += 44;
            }
        }
        //down key
        if(key.which == 40){
            this.y += 4*16;
            this.index += 11;
            if(this.letters[this.index] == null){
                this.y = 4*155;
                this.index -= 44;
            }
        }
        //left key
        if(key.which == 37){
            this.x -= (4*16);
            this.index--;
            this.column--;
            if(this.column < 0){
                this.y -= 4*16;
                this.x = 4*(16*13);
                this.column = 10;
            }
        }
        //right key
        if(key.which == 39){
            this.x += (4*16);
            this.index++;
            this.column++;
            if(this.column > 10){
                this.y += 4*16;
                this.x = 4*48;
                this.column = 0;
            }
        }
 
        if(this.index == -1 ){
            this.index += 44;
            this.x = 4*(16*13);
            this.y = 4*155 +(4*48);
            this.column = 10; 
            this.row = 3; 
            console.log("doot");
        }
        if(this.index == 44 ){
            this.index -= 44;
            this.x = 4*48;
            this.y = 4*155;
            this.column = 0; 
            this.row = 0; 
        }
        
        if(key.which == 17){
            this.selected.value += this.letters[this.index];
        }
        console.log(this.column, this.row, this.letters[this.index], this.index);
        console.log(key.which);
        
        this.square.style.left = this.background.offsetLeft + this.x + "px";
        this.square.style.top = this.y + "px";

    }


}