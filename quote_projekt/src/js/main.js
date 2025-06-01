const test = document.querySelector("#test");
const test2 = document.querySelector("#test2");
const beszeljgomb = document.querySelector("#beszelj");

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
    alert(`Nincs angol TTS hang telepítve ezen a gépen! A felolvasás magyarul fog történni, vagy nem lesz természetes az angol kiejtés.\n\nElérhető felolvasó: ${undszab}\n\nTelepítés Windows-on:\n1. Gépház -> Idő és nyelv -> Beszéd\n2. „Hangok hozzáadása”\n3. Válassz „English (United States)” vagy más angol hangot\n4. Böngésző újraindítása\n\nMac-en: System Settings > Accessibility > Spoken Content > System Voice \n és ajánlott edge/firefox/google(néha működik) használata`);
    enVoice = voices[0];
  }
  return enVoice;
}

// Mindig friss idézet lekérése, cache elkerülése érdekében
function callQuoteAndRead() {
  const url = 'https://api.allorigins.win/get?url=' +
    encodeURIComponent('https://zenquotes.io/api/random') +
    `&t=${Date.now()}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data.contents);
      const quoteText = parsedData[0].q;
      const author = parsedData[0].a;
      test.innerHTML = quoteText;
      test2.innerHTML = author;
      speakQuoteWhenVoicesLoaded(quoteText, author);
    })
    .catch(error => console.error('Error fetching quote:', error));
}

function speakQuoteWhenVoicesLoaded(quote, author) {
  function speak() {
    const text = `${quote} — ${author}`;
    const utterance = new window.SpeechSynthesisUtterance(text);
    // Lassabb tempó, hangsúlyosabb előadás
    utterance.rate = 0.8;      // Lassabb (alap: 1.0)
    utterance.pitch = 0.8;     // Mélyebb és hangsúlyosabb (alap: 1.0)
    utterance.volume = 1.0;    // Maximális hangerő
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

beszeljgomb.addEventListener('click', callQuoteAndRead);

// Hanglista debugolásra (nem kötelező)
window.speechSynthesis.onvoiceschanged = function() {
  const voices = window.speechSynthesis.getVoices();
  console.log("Elérhető hangok:", voices.map(v => `${v.name} [${v.lang}]`));
};