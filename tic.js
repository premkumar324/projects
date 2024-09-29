let boxes=document.querySelectorAll(".box");
let resett=document.querySelector("#reset-btn");
let newgame=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg");
let turnO=true;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");    
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if (turnO){
            box.textContent="O";
        }
        else box.textContent="X";
        turnO=!turnO;
        box.disabled=true;
        checkWinner();
    });
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    };
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.textContent="";
        
    };


};
const showWinner =(winner)=>{
    msg.textContent="Congratulations ,Winner is "+winner;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner =()=>{
          for(pattern of winPatterns){
            let pos1val=boxes[pattern[0]].textContent;
            let pos2val=boxes[pattern[1]].textContent;
            let pos3val=boxes[pattern[2]].textContent;
            if(pos1val!=""){
                if(pos1val==pos2val&&pos2val==pos3val){
                    showWinner(pos1val);
                }
            }
          }  
};
resett.addEventListener("click",()=>{
    resetGame();
});
newgame.addEventListener("click",resetGame);