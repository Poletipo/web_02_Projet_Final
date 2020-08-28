import {signin} from './chat-api';
import Chute from './Sprite/Chute';
import {TiledImage} from "./TiledImage"
import Transition from './Sprite/Transition';

let spriteList = [];

let titleScreen = new Image();
let canvas = null;
let ctx = null;
let chuteTop = null;

let introCountdown = 0;
let inCutScene = false;
let transition = null;


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
    
    chuteTop = new TiledImage("./img/NES - The Legend of Zelda - ChuteTop.png",
    2, 1, 150, true, 4);
    chuteTop.setPaused(false);

    ChuteAnim();
    
    /*let music = new Audio("./sound/01 - Intro.mp3");
    music.addEventListener("ended", () =>{
        music.currentTime = 0;
        music.play();
    })
    music.play();*/

    window.addEventListener("keypress",ResetStory)
    window.addEventListener("mousemove",ResetStory)

    window.requestAnimationFrame(tick);
});


let lastTime = 0;
let deltaTick = 0;

const tick = timeSpan =>{
    deltaTick =  (timeSpan - lastTime) / 1000;
    lastTime = timeSpan;
    

    introCountdown += deltaTick; 
    if(introCountdown > 5 && !inCutScene){
        inCutScene = true;
        transition = new Transition(999999); 
        FadeToBlack(0, 0.6);
    }

    if(titleScreen.complete){
        ctx.drawImage(titleScreen,0,0, canvas.width, canvas.height);
    }
    chuteTop.tick(384, 688, ctx);

    if(transition !=null){
        transition.tick();
    }

    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(deltaTick);
        
        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    
    window.requestAnimationFrame(tick);
}

const ChuteAnim = () =>{
    spriteList.push(new Chute(384, 720, ctx, canvas));
    setTimeout(ChuteAnim, 150);
}

const FadeToBlack = (op, limit) =>{
    op += 0.2;
    transition.black.style.opacity = op.toString();
    if(op <= limit){
        setTimeout(() =>{FadeToBlack(op, limit);}, 100);
    }else if(op < 1){
        setTimeout(() =>{FadeToBlack(op, 1);}, 1000);
    }

    
}


const ResetStory = () =>{
    introCountdown = 0;
    inCutScene = false;
    if(transition !=null){
        transition.alive = false;
    }
}