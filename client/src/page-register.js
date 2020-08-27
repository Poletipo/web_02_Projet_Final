import {register} from './chat-api';
import Selector from "./Sprite/Selector"
let spriteList = [];

let background = null;
window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return register(this);
    }
    
    background = document.createElement("div");
    background.className = "register-overlay";
    document.querySelector("body").appendChild(background);
    
    spriteList.push(new Selector(background));


    window.requestAnimationFrame(tick);
})
let lastTime = 0;
let deltaTick = 0;
const tick = timeSpan =>{
    deltaTick =  (timeSpan - lastTime) / 1000;
    lastTime = timeSpan;

    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(deltaTick);
    
        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    //console.log(deltaTick);



    window.requestAnimationFrame(tick);
}



