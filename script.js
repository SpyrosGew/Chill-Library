// Function to be executed when the div is clicked
function goClicked() {
    alert('You searched for a book');
}

function createClicked(){
    alert('you added a book');
}

let go = document.getElementById('go');
go.addEventListener('click', goClicked);

let create = document.getElementById('create');
create.addEventListener('click', createClicked);

