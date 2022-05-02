const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

function showLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }
}

// Hide showLoadingSpinner

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Show new quotes
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author exist
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check for quote length to determnine style
  if (quote.text.length > 120) {
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set the quote, hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}
// Get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
  }
}

// Tweet quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// Event listener

newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);
// On load
getQuotes();
