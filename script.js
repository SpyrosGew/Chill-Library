// Function to be executed when the div is clicked
function goClicked() {
    alert('You searched for a book');
}

function createClicked(){
    alert('you added a book');
}

function dataDivSpawner(title, author, price, genre) {
    for (let i = 0; i < 3; i++) {
        let newDiv = document.createElement("div");
        newDiv.className = "newDiv"; // Set the class name

        let titleElem = document.createElement("div");
        titleElem.textContent = "Title: " + title;

        let authorElem = document.createElement("div");
        authorElem.textContent = "Author: " + author;

        let priceElem = document.createElement("div");
        priceElem.textContent = "Price: " + price;

        let genreElem = document.createElement("div");
        genreElem.textContent = "Genre: " + genre;

        newDiv.appendChild(titleElem);
        newDiv.appendChild(authorElem);
        newDiv.appendChild(priceElem);
        newDiv.appendChild(genreElem);

        var place = document.getElementById("results");
        place.appendChild(newDiv);
    }
}


let go = document.getElementById('go');
go.addEventListener('click', goClicked);

let create = document.getElementById('create');
create.addEventListener('click', createClicked);

dataDivSpawner();
