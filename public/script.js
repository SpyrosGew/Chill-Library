class Book {
    constructor(title, author, genre, price) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
    }
}

async function storeABook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let genre = document.getElementById("genre").value;

    if (!title || !author || !price || !genre) {
        alert("Please fill in all of the fields");
        return;
    }

    if (!price) {
        price = "0.00";
    } else {
        let pricePattern = /^\d+(\.\d{2})?$/;
        if (!pricePattern.test(price)) {
            alert("Wrong price format. Price should be in the format 'nn.nn'");
            return;
        }
        if (!price.includes(".")) {
            price += ".00";
        }
    }

    const url = 'http://localhost:3000/books';
    const book = new Book(title, author, genre, price);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
    
        console.log('Response:', response); // Log the response object
        
        if (!response.ok) {
            throw new Error('Failed to store book');
        }
        console.log('Book stored successfully:');
        alert("Book stored successfully");
    
    } catch (error) {
        console.error('Error storing book:', error.message);
        alert("Failed to store book. Please try again later.");
    }
    
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("price").value = '';
    document.getElementById("genre").value = '';
}

async function searchBooks() {
    let string = document.getElementById("search-book").value;
    if (!string) { // Simplified check for an empty or undefined value
        alert('Please enter a valid keyword');
        return;
    }

    const url = `http://localhost:3000/books/${encodeURIComponent(string)}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        const books = await response.json(); // Parse the JSON response
        console.log(books);

        var pastPrints = document.getElementById("results");
        while (pastPrints.firstChild) {
            pastPrints.removeChild(pastPrints.firstChild);
        }
        // Iterate over the books array and log each book object
        for (let book of books) {
            dataDivSpawner(book.title,book.author,book.price,book.genre);
        }
    
    } catch (err) {
        console.error('Error getting results from the database:', err);
        alert('Error getting results');
    }
}



function dataDivSpawner(title, author, price, genre) {
    let newDiv = document.createElement("div");
    newDiv.className = "newDiv"; // Set the class name

    let titleElem = document.createElement("div");
    titleElem.textContent = title;
    titleElem.className = "result-title";

    let authorElem = document.createElement("div");
    authorElem.textContent = "Author: " + author;
    authorElem.className = "result-author";

    let priceElem = document.createElement("div");
    priceElem.textContent = "Price: " + price;
    priceElem.className = "result-price";

    let genreElem = document.createElement("div");
    genreElem.textContent = "Genre: " + genre;
    genreElem.className = "result-genre";

    newDiv.appendChild(titleElem);
    newDiv.appendChild(authorElem);
    newDiv.appendChild(priceElem);
    newDiv.appendChild(genreElem);

    addToResults(newDiv);
}

function addToResults(newDiv){

    var results = document.getElementById("results");
    var childSum = results.childElementCount;

    if (childSum >= 4) {
        results.style.overflowY = "scroll";
    }

    results.appendChild(newDiv);
}

let go = document.getElementById('go');
go.addEventListener('click', searchBooks);

let create = document.getElementById('create');
// Pass a reference to the storeABook function, not the result of calling it
create.addEventListener('click', storeABook);
