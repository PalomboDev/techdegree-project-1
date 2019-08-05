var quotes = [];
var interval;
var timerRadio = document.querySelector('input[name = "timerRadio"]:checked').value;

// These next 3 functions are so incase a user clicks the button and the interval was about to switch it, 
// it won't and now they can read the quote at full interval length.
// -------------------------
function addTimer() {
 interval = setInterval(function() {
   printQuote();
 }, 20000);
}

function removeTimer() {
 clearInterval(interval);
}

function newQuoteTimer() {
 removeTimer();
 addTimer();
}
//-------------------------

//https://stackoverflow.com/questions/2534803/use-of-string-format-in-javascript
String.format = function() {
  var string = arguments[0];

  for (var i = 0; i < arguments.length - 1; i++) {       
      var reg = new RegExp("\\{" + i + "\\}", "gm");             
      string = string.replace(reg, arguments[i + 1]);
  }

  return string;
};

//Get a random color code
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

//Set background and button color randomly
function randomBackgroundAndButtonColor() {
  var randomColor = getRandomColor();

  document.getElementsByTagName("BODY")[0].style.backgroundColor = randomColor;
  document.getElementById("loadQuote").style.backgroundColor = randomColor;
}

//Function to make creating a quote object easier and adds it to the quotes array.
function addQuote(quote, source, sourceProfession, citation, year, tags) {
  var newQuote = {
      quote: quote,
      source: source,
      sourceProfession: sourceProfession,
      citation: citation,
      year: year,
      tags: tags
  };

  quotes.push(newQuote);
}

//Create and add quotes to array
function registerQuotes() {
   addQuote(
     "Some days are just bad days, that's all. You have to experience sadness to know happiness, and I remind myself that not every day is going to be a good day, that's just the way it is!",
     "Dita Von Teese",
     "Dancer",
     "BrainyQuote",
     "1989",
     ["Bad Days", "Sadness", "Remind"]
   );

   addQuote(
     "I don't go by or change my attitude based on what people say. At the end of the day, they, too, are judging me from their perspective. I would rather be myself and let people accept me for what I am than be somebody who I am not, just because I want people's approval.",
     "Karan Patel",
     "Actor",
     "BrainyQuote",
     "1995",
     ["Accept", "Approval", "Rather"]
   );

   addQuote(
     "Every day I feel is a blessing from God. And I consider it a new beginning. Yeah, everything is beautiful.",
     "Prince",
     "Musician",
     "BrainyQuote",
     "1978",
     ["Beautiful", "Blessing", "Baby Jesus"]
   );

   addQuote(
     "I am happy every day, because life is moving in a very positive way.",
     "Lil Yachty",
     "Musician",
     "BrainyQuote",
     "2017",
     ["Postive", "Good", "Happy"]
   );

   addQuote(
     "Nobody on this earth is perfect. Everybody has their flaws; everybody has their dark secrets and vices.",
     "Juice WRLD",
     "God",
     "BrainyQuote",
     "2018",
     ["Secrets", "Jesus", "Flaws"]
   );
}

function getRandomQuote() {
  var randomIndex = Math.floor(Math.random() * quotes.length);
  var randomQuote = quotes[randomIndex];

  return randomQuote;
}

function printQuote() {
  var randomQuote = getRandomQuote();

  var paragraphHtml = '';
  var quote = randomQuote.quote;
  var source = randomQuote.source;
  var sourceProfession = randomQuote.sourceProfession;
  var citation = randomQuote.citation;
  var year = randomQuote.year;
  var tags = randomQuote.tags;
  var tagsString = tags.join(", ");

  paragraphHtml += '<p class="quote"> {0} </p>';
  paragraphHtml += '<p class="source"> {1} ({2})';
  paragraphHtml += '  <span class="citation"> {3} </span>'; 
  paragraphHtml += '  <span class="year"> {4} </span>';
  paragraphHtml += '<br>';
  paragraphHtml += '  <span class="tags"> Tags: {5} </span>';
  paragraphHtml += '</p>';

  var formatedHtml = String.format(paragraphHtml, quote, source, sourceProfession, citation, year, tagsString);

  document.getElementById("quote-box").innerHTML = formatedHtml;

  randomBackgroundAndButtonColor();

  if (timerRadio === "yes") {
    newQuoteTimer();
  }
}

function updateTimerRadio() {
  var newTimerRadio = document.querySelector('input[name = "timerRadio"]:checked').value;

  if (timerRadio === newTimerRadio) {
    return;
  }

  if (newTimerRadio === "yes") {
    printQuote();
  } else {
    removeTimer();
  }

  timerRadio = newTimerRadio;

}

//Initialization
addTimer();
registerQuotes();
printQuote();

//Button click event listeners
document.getElementById("loadQuote").addEventListener("click", printQuote, false);
document.getElementById("timerRadioYes").addEventListener("click", updateTimerRadio, false);
document.getElementById("timerRadioNo").addEventListener("click", updateTimerRadio, false);
