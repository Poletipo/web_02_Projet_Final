import {signin} from './chat-api';

let titleScreen = new Image();
let canvas = null;
let ctx = null;


window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    titleScreen.src = "./img/NES - The Legend of Zelda - Title Screen.png";
    //titleScreen.width = 1920 + "px";
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    
    console.log("doot");
    
    
    window.requestAnimationFrame(tick);
});


const tick = evt =>{
    if(titleScreen.complete){
        ctx.drawImage(titleScreen,0,0, canvas.width, canvas.height);
    }
    
    
    window.requestAnimationFrame(tick);
}