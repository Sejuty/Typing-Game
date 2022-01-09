const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timer = document.getElementById("timer");

quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const inputValue = quoteInput.value.split("");
  let correct = true;
  arrayQuote.forEach((charSpan, index) => {
    const char = inputValue[index];
    //haven't typed yet
    if (char == null) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
      correct = false;
    } else if (char === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.remove("correct");
      charSpan.classList.add("incorrect");
      correct = false
    }
  });
  if(correct) renderNewQuote();
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplay.innerHTML = "";
  //split each char
  quote.split("").forEach((element) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = element;
    quoteDisplay.appendChild(charSpan);
  });
  quoteInput.value = null;  
  start();
  
}

let startTime;

const start = ()=> 
{
  timer.innerText =0;
  startTimer = new Date();
  setInterval(()=>{
      timer.innerText = getTime();
  },1000);
}

function getTime()
{
    return Math.floor((new Date() - startTimer)/1000);
}
renderNewQuote();
