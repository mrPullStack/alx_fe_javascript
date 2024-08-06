// Array to store quotes
let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" }
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>Category: ${randomQuote.category}</em></p>`;
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Show the newly added quote
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>${newQuote.text}</p><p><em>Category: ${newQuote.category}</em></p>`;
        
        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Event listener to show a random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm();
    showRandomQuote();
});
