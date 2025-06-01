const test = document.querySelector("#test");
const test2 = document.querySelector("#test2");
const beszeljgomb = document.querySelector("#beszelj");
const startGomb = document.querySelector("#timerBtn");
let quoteList = [];
let isFirstQuote = true;

//favágó megoldás
let stopMeditation = document.querySelector("#seged");

const timerInput1 = document.querySelector("#setTimer1");
const timerInput2 = document.querySelector("#setTimer2");
const timerInput3 = document.querySelector("#setTimer3");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function getQuotes() {
  quoteList = [];
  const url = 'https://api.codetabs.com/v1/proxy/?quest=https://zenquotes.io/api/quotes';

  try {
    const response = await fetch(url);
    const parsedData = await response.json();

    parsedData.forEach(item => {
      const quoteEntry = `${item.q};${item.a}`;
      quoteList.push(quoteEntry);
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
}

async function startQuotes(){
  let timerValue = (Number(timerInput1.value)*3600) + (Number(timerInput2.value)*60) + Number(timerInput3.value );
  if(timerValue <= 60) return;

  test.style.display = "inline";
  test2.style.display = "inline";

  await getQuotes();
  isFirstQuote = true;
  let quoteIndex = 0;
  for(let i = 0; i < Math.floor(timerValue/10)  ;i++){
    console.log(Math.floor(timerValue));
    const quoteData = quoteList[quoteIndex];

    const [actQuoteText, actQuoteAuthor] = quoteData.split(";");

    test.innerHTML = actQuoteText;
    test2.innerHTML = actQuoteAuthor;

    speakQuoteWhenVoicesLoaded(actQuoteText, actQuoteAuthor);

    quoteIndex++;
    if(quoteIndex == 50) quoteIndex = 0;

    if(stopMeditation.innerHTML == "stop"){
      test.style.display = "none";
      test2.style.display = "none";
      break;
    }
    await wait(10000);
  }
  test.style.display = "none";
  test2.style.display = "none";
}

function underline(s) {
    var arr = s.split('');
    s = arr.join('\u0332');
    if (s) s = s + '\u0332';
    return s;
}

// Válassza a Google UK English Male (en-GB) voice-ot, ha elérhető, különben fallback
function getEnglishMaleVoice() {
  const voices = window.speechSynthesis.getVoices();

  // 1. Próbáljuk pontosan a "Google UK English Male [en-GB]" hangot választani
  let maleVoice = voices.find(v => v.name === "Google UK English Male" && v.lang === "en-GB");

  // 2. Ha nincs ilyen, keressünk bármilyen angol voice-ban 'male' szóra
  if (!maleVoice) {
    maleVoice = voices.find(v =>
      v.lang.startsWith('en') && v.name.toLowerCase().includes('male')
    );
  }

  // 3. Ha nincs, válasszunk bármilyen angol voice-ot
  let enVoice = maleVoice || voices.find(v => v.lang.startsWith('en'));

  // 4. Ha semmi sincs, fallback: első voice
  if (!enVoice) {
    var undszab = underline("Mikrosoft Szabolcs");
    if(isFirstQuote){
      alert(`Nincs angol TTS hang telepítve ezen a gépen! A felolvasás magyarul fog történni, vagy nem lesz természetes az angol kiejtés.\n\nElérhető felolvasó: ${undszab}\n\nTelepítés Windows-on:\n1. Gépház -> Idő és nyelv -> Beszéd\n2. „Hangok hozzáadása”\n3. Válassz „English (United States)” vagy más angol hangot\n4. Böngésző újraindítása\n\nMac-en: System Settings > Accessibility > Spoken Content > System Voice \n és ajánlott edge/firefox/google(néha működik) használata`);
      isFirstQuote = false;
    }
    // alert(`Nincs angol TTS hang telepítve ezen a gépen! A felolvasás magyarul fog történni, vagy nem lesz természetes az angol kiejtés.\n\nElérhető felolvasó: ${undszab}\n\nTelepítés Windows-on:\n1. Gépház -> Idő és nyelv -> Beszéd\n2. „Hangok hozzáadása”\n3. Válassz „English (United States)” vagy más angol hangot\n4. Böngésző újraindítása\n\nMac-en: System Settings > Accessibility > Spoken Content > System Voice \n és ajánlott edge/firefox/google(néha működik) használata`);
    enVoice = voices[0];
  }
  return enVoice;
}

// Mindig friss idézet lekérése, cache elkerülése érdekében
function callQuoteAndRead() {
  // const url = 'https://api.allorigins.win/get?url=' +
  //   encodeURIComponent('https://zenquotes.io/api/random') +
  //   `&t=${Date.now()}`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     const parsedData = JSON.parse(data.contents);
  //     const quoteText = parsedData[0].q;
  //     const author = parsedData[0].a;
  //     test.innerHTML = quoteText;
  //     test2.innerHTML = author;
  //     speakQuoteWhenVoicesLoaded(quoteText, author);
  //   })
  //   .catch(error => console.error('Error fetching quote:', error));

    speakQuoteWhenVoicesLoaded();
}

function speakQuoteWhenVoicesLoaded(quote, author) {
  function speak() {
    const text = `${quote}`;
    const utterance = new window.SpeechSynthesisUtterance(text);
    // Lassabb tempó, hangsúlyosabb előadás
    utterance.rate = 0.8;      // Lassabb (alap: 1.0)
    utterance.pitch = 0.65;     // Mélyebb és hangsúlyosabb (alap: 1.0)
    utterance.volume = 1.2;    // Maximális hangerő
    const voice = getEnglishMaleVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang; // fontos!
    }
    window.speechSynthesis.speak(utterance);
  }
  // Ha már betöltött a hanglista, azonnal szólj
  if (window.speechSynthesis.getVoices().length > 0) {
    speak();
  } else {
    window.speechSynthesis.onvoiceschanged = speak;
  }
}

// beszeljgomb.addEventListener('click', callQuoteAndRead);
startGomb.addEventListener('click', startQuotes);

// Hanglista debugolásra (nem kötelező)
window.speechSynthesis.onvoiceschanged = function() {
  const voices = window.speechSynthesis.getVoices();
  console.log("Elérhető hangok:", voices.map(v => `${v.name} [${v.lang}]`));
};