// Mock server URL
const serverURL = 'https://jsonplaceholder.typicode.com/posts';

// Array to store quotes
let quotes = JSON.parse(localStorage.getItem('quotes'))[
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" }
];

// function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// function to populate category filter dynamically
function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset options
    const categories = [...new Set(quotes.map(quote => quote.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// fucntion to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = quotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);
    
    displayQuotes(filteredQuotes);
    localStorage.setItem('selectedCategory', selectedCategory);
}

// fucntion to display quotes
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('categoryFilter').value = savedCategory;
    populateCategoryFilter();
    filterQuotes();
});

// function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        populateCategoryFilter();
        filterQuotes();
    }
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes;
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to show a random quote
function showRandomQuote() {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>Category: ${randomQuote.category}</em></p>`;

    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
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
        saveQuotes();

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

// Function to export quotes to JSON file
function exportToJsonFile() {
    const jsonString = JSON.stringify(quotes);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        showRandomQuote(); // Refresh displayed quote
    };
    fileReader.readAsText(event.target.files[0]);
}

//function to fetch quotes form the server
async function fetchQuotesFromServer(params) {
    try {
        const response = await fetch(serverURL);
        const serverQuotes = await response.json();
        const newQuotes = serverQuotes.filter(sq => !quotes.some(lq => lq.text === sq.text && lq.category === sq.category));
        if (newQuotes.length > 0) {
            quotes.push(...newQuotes);
            saveQuotes();
            console.log('New quotes fetched and saved locally:', newQuotes);
        }
    } catch (error) {
        console.error('Error fetching quotes from the server:', error);
    }
}

// function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
    });
    const newQuote = await response.json();
    console.log('Quote posted to server:', newQuote);
    } catch (error) {
        console.error('Error posting quote to the server:', error);
    }
}

// fucntion to resolve conflicts (server data takes precedence)
fucntion resolveConflicts(localQuotes, serverQuotes){
    const resolvedQuotes = serverQuotes.map(sq => {
        const conflictingLocalQuote = localQuotes.find(lq => lq.text === sq.text && lq.category === sq.category);
        return conflictingLocalQuote ? sq : conflictingLocalQuote;
    });
    return resolvedQuotes;
}

// Event listener to show a random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    createAddQuoteForm();
    populateCategoryFilter();
    filterQuotes();
    showRandomQuote();

    // Load the last viewed quote from session storage if available
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>${lastViewedQuote.text}</p><p><em>Category: ${lastViewedQuote.category}</em></p>`;
    }
});
