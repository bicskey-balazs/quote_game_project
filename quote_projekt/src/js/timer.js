const timerInput = document.querySelector("#setTimer");
const timerDisplay = document.querySelector("#timerDisplay");
const timerBtn = document.querySelector("#timerBtn");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

timerBtn.addEventListener("click", async () => {
    let timerValue = timerInput.value;
    if(timerValue <= 0){
        alert("0-nál nagyobb értéket adjon meg!");
        return;
    }
    if(timerValue >= 1000){
        alert("1000-nél kisebb értéket adjon meg!");
        return;
    }

    for(let i = timerValue*60; i > -1; i--){
        await wait(1000);

        const hour = String(Math.floor(i / 3600)).padStart(2, '0');
        const min = String(Math.floor((i % 3600) / 60)).padStart(2, '0');
        const sec = String(i % 60).padStart(2, '0');

        timerDisplay.innerHTML = `${hour}:${min}:${sec}`;
    }
    timerDisplay.innerHTML = "időzítő lejárt";
});