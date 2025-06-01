const timerInput1 = document.querySelector("#setTimer1");
const timerInput2 = document.querySelector("#setTimer2");
const timerInput3 = document.querySelector("#setTimer3");
const timerDisplay = document.querySelector("#timerDisplay");
const timerBtn = document.querySelector("#timerBtn");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

timerBtn.addEventListener("click", async () => {
    let timerValue = (timerInput1.value*60) + Number(timerInput2.value) + (timerInput3.value / 60);
    if(timerValue <= 0){
        alert("0 percnél nagyobb értéket adjon meg!");
        return;
    }
    if(timerValue >= 1000){
        alert("1000 percnél kisebb értéket adjon meg!");
        return;
    }

    document.querySelector(".timerInputs").style.display = "none";


    //időzítő indul
    timerDisplay.style.display = "inline";
    for(let i = timerValue*60; i > -1; i--){
        await wait(1000);

        const hour = String(Math.floor(i / 3600)).padStart(2, '0');
        const min = String(Math.floor((i % 3600) / 60)).padStart(2, '0');
        const sec = String(i % 60).padStart(2, '0');

        timerDisplay.innerHTML = `${hour}:${min}:${sec}`;
    }
    timerDisplay.style.display = "none";
    document.querySelector(".timerInputs").style.display = "inline";
});