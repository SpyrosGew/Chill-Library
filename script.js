
function createClicked(){
    alert('you added a book');
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

    // Maximum number of visible elements before pagination
    var maxVisibleElements = 4;

    if (childSum >= maxVisibleElements) {
        // Hide previous elements to implement pagination
        results.style.overflowY = "scroll";
    }

    results.appendChild(newDiv);
}

let go = document.getElementById('go');
go.addEventListener('click', function() {
    dataDivSpawner("Lord of the rings", "JRR Tolkien", "19.99", "Adventure");
});

let create = document.getElementById('create');
create.addEventListener('click', createClicked);
