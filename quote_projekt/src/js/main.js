const test = document.querySelector("#test");
const test2 = document.querySelector("#test2");
const beszeljgomb = document.querySelector("#beszelj")


function callQuote(){

  fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'))
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data.contents); 
      const quoteText = parsedData[0].q;
      const author = parsedData[0].a;
  
      test.innerHTML = quoteText;
      test2.innerHTML = author;
    })
    .catch(error => console.error('Error fetching quote:', error));
}








