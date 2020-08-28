import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';
import ChatIntro from "./Sprite/ChatIntro";
import Transition from "./Sprite/Transition"
import Link from './Sprite/Link';
import Monster from './Sprite/Monster';
import Collision from './Sprite/Collision';

let spriteList = [];

let canvas = null;
let ctx = null;

let background = new Image();
let introDone = false;

window.addEventListener("load", () => {
    document.querySelector("textarea").onkeyup = function (evt) {
        sendMessage(evt, this)
    };
    document.querySelector("#sign-out-btn").onclick = signout;
    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();
    
    /*-----------MY PART-----------*/

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    
    background.src = "./img/NES - The Legend of Zelda - Cave.png"
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    
    spriteList.push(new ChatIntro(ctx, canvas));

    spriteList.push(new Collision(576, 224, 500, 320,ctx));
    
    spriteList.push(new Collision(0, 224, 64, 1000,ctx));
    spriteList.push(new Collision(0, 224, 1000, 64,ctx));
    spriteList.push(new Collision(0, 780, 1200, 224,ctx));
    spriteList.push(new Collision(900, 224, 128, 1000,ctx));
    
    spriteList.push(new Collision(0, 224, 448, 128,ctx));
    spriteList.push(new Collision(192, 224, 66, 128+64,ctx));
    spriteList.push(new Collision(192-64, 224, 66, 128+128,ctx));
    spriteList.push(new Collision(0, 224, 66+64, 1000,ctx));
    

    window.requestAnimationFrame(tick);
})

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {
    //console.log(fromUser, message, isPrivate);

    let templateHTML = document.querySelector("#chat-template").innerHTML;

    let chatContainer = document.querySelector("#chat-container");

    let div = document.createElement("div");
    div.className = "chat-text";
    div.innerHTML = templateHTML;
    div.querySelector("h4").innerHTML = fromUser + ":  ";
    div.querySelector("p").innerHTML = message;
    chatContainer.appendChild(div);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
// connectés dans votre interface.
const memberListUpdate = members => {
    
    if(OnlyOnce){
        for(let i = 0; i < members.length ; i++){
            let existingName = false;
            for(let j = 0; j < spriteList.length ; j++){
                if(members[i] == spriteList[j].PlayerName){
                    existingName = true;
                }
                
                    let disconected = true;
                    if(spriteList[j].PlayerName != null){
                        for(let k = 0;k < members.length ; k++){
                            if(spriteList[j].PlayerName == members[k]){
                                disconected = false;
                            }
                        }
                    }else{
                        disconected = false;
                    }
                    if(disconected){
                        spriteList.splice(j, 1);
                        j--;   
                    }
                }
                
                if(!existingName){
                    spriteList.push(new Monster(members[i], ctx, canvas));
                }
        }
    }
}

let lastTime = 0;
let deltaTick = 0;
let OnlyOnce = false;

const tick = timeSpan =>{
    deltaTick =  (timeSpan - lastTime) / 1000;
    lastTime = timeSpan;

    ctx.drawImage(background,0,0, 1024, 896);
    
    if(introDone && !OnlyOnce){
        spriteList.push(new Transition(500));
        background.src = "./img/NES - The Legend of Zelda - FirstLevel.png"
        spriteList.push(new Link(288,400, ctx, 0, spriteList));

        let music = new Audio("./sound/02 - Overworld.mp3");
        music.addEventListener("ended", () =>{
        music.currentTime = 0;
        music.play();
    })
    music.play();
        introDone = false;
        OnlyOnce = true;



    }

    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(deltaTick, spriteList);
    
        if(spriteList[i].name == "ChatIntro" && !alive){
            introDone = true;
        }


        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}
