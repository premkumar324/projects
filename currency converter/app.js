const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
let dropdowns=document.querySelectorAll(".dropdown select");
btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const result=document.querySelector("#result");
for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        if(select.name=="from"&&currcode=="USD"){
            newoption.selected="selected";
        }
        else if(select.name=="to"&&currcode=="INR"){
            newoption.selected="selected";
        }
        select.append(newoption); 
       
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
let updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let src=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=src;
} 
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("#ipcur");
    let amtVal=amount.value;
    if(amtVal==""||amtVal<1){
        amtVal=1;
        amount.value="1";        
    }
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data=await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let convertedAmt=(amtVal*rate).toFixed(2);
    result.innerText = `${amtVal} ${fromcurr.value} = ${convertedAmt} ${tocurr.value}`;
    
});

