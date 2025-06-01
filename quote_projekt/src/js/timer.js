const medmusic = document.querySelector("#medmusic")
const bgmusic = document.querySelector("#bgmusic")
const gongmusic = document.querySelector("#gongmusic")

const timerInput1 = document.querySelector("#setTimer1");
const timerInput2 = document.querySelector("#setTimer2");
const timerInput3 = document.querySelector("#setTimer3");
const timerDisplay = document.querySelector("#timerDisplay");
const timerBtn = document.querySelector("#timerBtn");
const stopBtn = document.querySelector("#stopBtn");
let stopMeditationElement = document.querySelector("#seged");
const timerInputs = document.querySelector(".inputGroup");
const timerLabel = document.querySelector("#timerLabel");
const rootDiv = document.querySelector("#rootDiv");
stopBtn.style.display = "none";

//favágó megoldás
let stopMeditation = false;
const test = document.querySelector("#test");
const test2 = document.querySelector("#test2");

let firstclick = true;
window.addEventListener("click", ()=>{
    if(firstclick){

        bgmusic.play()
    }
    firstclick = false;
})

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

stopBtn.addEventListener("click", async () => {
    stopMeditation = true;
})

timerBtn.addEventListener("click", async () => {
    let timerValue = (timerInput1.value*60) + Number(timerInput2.value) + (timerInput3.value / 60);
    if(timerValue <= 1){
        alert("1 percnél nagyobb értéket adjon meg!");
        return;
    }
    if(timerValue >= 1000){
        alert("1000 percnél kisebb értéket adjon meg!");
        return;
    }
    bgmusic.pause()
    bgmusic.currentTime = 0;

    document.querySelector(".inputGroup").style.display = "none";


    //időzítő indul
    stopMeditationElement.innerHTML = "";
    timerLabel.style.display = "none";
    timerBtn.style.display = "none";
    timerDisplay.style.display = "inline";
    stopBtn.style.display = "inline";
    bgmusic.pause()
    bgmusic.currentTime = 0
    medmusic.play()
    medmusic.volume = 0.6
    for(let i = timerValue*60; i > -1; i--){
        const hour = String(Math.floor(i / 3600)).padStart(2, '0');
        const min = String(Math.floor((i % 3600) / 60)).padStart(2, '0');
        const sec = String(i % 60).padStart(2, '0');

        timerDisplay.innerHTML = `${hour}:${min}:${sec}`;

        if(stopMeditation){
            stopMeditationElement.innerHTML = "stop";

            gongmusic.currentTime = 0;
            gongmusic.play()

            medmusic.pause()
            medmusic.currentTime = 0
            bgmusic.play()
            bgmusic.volume = 0.3

            timerLabel.style.display = "inline";
            timerDisplay.style.display = "none";
            stopBtn.style.display = "none";
            test.style.display = "none";
            test2.style.display = "none";
            timerInputs.style.display = "inline";
            timerBtn.style.display = "inline";
            rootDiv.style.backgroundImage = "";

            stopMeditation = false;

            break;
        }

        await wait(1000);

    }

    stopMeditationElement.innerHTML = "stop";

    gongmusic.currentTime = 0;
    gongmusic.play()

    medmusic.pause()
    medmusic.currentTime = 0
    bgmusic.play()
    bgmusic.volume = 0.3

    timerLabel.style.display = "inline";
    timerDisplay.style.display = "none";
    stopBtn.style.display = "none";
    timerInputs.style.display = "inline";
    timerBtn.style.display = "inline";
    rootDiv.style.backgroundImage = "";
});