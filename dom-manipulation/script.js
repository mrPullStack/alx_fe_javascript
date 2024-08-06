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

// Function to create the add quote form using createElement and appendChild
function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');

    // Clear the form container
    formContainer.innerHTML = '';

    // Create input elements for the new quote and category
    const newQuoteInput = document.createElement('input');
    newQuoteInput.setAttribute('id', 'newQuoteText');
    newQuoteInput.setAttribute('type', 'text');
    newQuoteInput.setAttribute('placeholder', 'Enter a new quote');

    const newCategoryInput = document.createElement('input');
    newCategoryInput.setAttribute('id', 'newQuoteCategory');
    newCategoryInput.setAttribute('type', 'text');
    newCategoryInput.setAttribute('placeholder', 'Enter quote category');

    // Create the "Add Quote" button
    const addQuoteButton = document.createElement('button');
    addQuoteButton.setAttribute('id', 'addQuoteBtn');
    addQuoteButton.textContent = 'Add Quote';

    // Append the input elements and button to the form container
    formContainer.appendChild(newQuoteInput);
    formContainer.appendChild(newCategoryInput);
    formContainer.appendChild(addQuoteButton);

    // Add event listener to the "Add Quote" button
    addQuoteButton.addEventListener('click', addQuote);
}

// Function to add a new quote using innerHTML and appendChild
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Create a new paragraph element for the quote text
        const quoteTextP = document.createElement('p');
        quoteTextP.textContent = newQuote.text;

        // Create a new paragraph element for the quote category
        const quoteCategoryP = document.createElement('p');
        quoteCategoryP.innerHTML = `<em>Category: ${newQuote.category}</em>`;

        // Clear the current quote display and append the new quote elements
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = ''; // Clear the current quote
        quoteDisplay.appendChild(quoteTextP);
        quoteDisplay.appendChild(quoteCategoryP);

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
