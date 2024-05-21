function storeABook(){
    // Get the values from the input fields
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let genre = document.getElementById("genre").value;

    // Check if any of the fields are empty
    if (!title || !author || !price || !genre) {
        alert("Please fill in all of the fields");
        return; // Exit the function if any field is empty
    }

    if (!price) {
        price = "0.00";
    } else {
        // If price doesn't match the pattern, display an alert and exit the function
        let pricePattern = /^\d+(\.\d{2})?$/;
        if (!pricePattern.test(price)) {
            alert("Wrong price format. Price should be in the format 'nn.nn'");
            return;
        }

        // If price is a whole number, append ".00" to it
        if (!price.includes(".")) {
            price += ".00";
        }
    }

    //send values to backend

    //if all went well print a success message
    
    // Clear the input fields
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("price").value = '';
    document.getElementById("genre").value = '';
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
go.addEventListener('click', function() {
    dataDivSpawner("Lord of the rings", "JRR Tolkien", "19.99", "Adventure");
});

let create = document.getElementById('create');
// Pass a reference to the storeABook function, not the result of calling it
create.addEventListener('click', storeABook);
