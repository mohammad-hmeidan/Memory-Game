let duration=1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
if (window.sessionStorage.getItem("name")) {
    document.querySelector(".control-buttons").remove()
    document.querySelector(".info-container .name span").innerHTML = window.sessionStorage.getItem("name")
    window.sessionStorage.numberGame = parseInt(window.sessionStorage.numberGame)+1
    document.querySelector(".info-container .game span").innerHTML = `${window.sessionStorage.getItem("numberGame")}st`
    blocks.forEach((e)=>{e.classList.add("is-flipped")})
    setTimeout(()=>{
        blocks.forEach((e)=>{e.classList.remove("is-flipped")})
    },1500)
}else{
    window.sessionStorage.setItem("numberGame",1);
    document.querySelector(".control-buttons span").onclick = function (){
        let yourname = prompt("what's your name");
        if (yourname==null || yourname==""){
            document.querySelector(".info-container .name span").innerHTML = "Unknown"
        }else{
            document.querySelector(".info-container .name span").innerHTML = yourname
            window.sessionStorage.setItem("name",yourname)
        }
        document.querySelector(".control-buttons").remove()
        blocks.forEach((e)=>{e.classList.add("is-flipped")})
        setTimeout(()=>{
            blocks.forEach((e)=>{e.classList.remove("is-flipped")})
        },1500)
    }
}


shuffle(orderRange);
// let orderRange = Array.from(Array(blocks.length).keys())
blocks.forEach((block,index)=>{
    block.style.order = orderRange[index];
    block.addEventListener("click",function(){
        flipblock(block)
    })
})
document.getElementById("return-game").onclick = function(){
    window.location.reload();
}
document.getElementById("end-game").onclick = function(){
    window.sessionStorage.clear()
    window.location.reload();
}
function flipblock(selectblock){
    selectblock.classList.add("is-flipped")
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"))
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
    let allHasMatch = blocks.filter(HasMatch => HasMatch.classList.contains("has-match"));
    if (allHasMatch.length === blocks.length) {
        document.querySelector(".win").style.display = "flex";
        document.querySelector(".win .info span").innerHTML = document.querySelector(".tries span").innerHTML
    }
}
function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking");
    },duration);
}
function checkMatchedBlocks(firstBlock,secondBlock){
    let triesElement = document.querySelector(".tries span")
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")
        firstBlock.classList.add("has-match")
        secondBlock.classList.add("has-match")
        document.getElementById("sucess").play()
    }else{
        setTimeout(()=>{
            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")
        },duration)
        // triesElement.innerHTML-=-1
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1
        document.getElementById("fail").play()
    }
}
function shuffle(array){
    let current = array.length,
        temp,
        random;
    while (current>0) {
        random = Math.floor(Math.random()*current);
        current--;
        temp = array[current];
        array[current]=array[random];
        array[random]=temp;
    }
    return array;
}
