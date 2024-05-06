// Function to be executed when the div is clicked
function goClicked() {
    alert('You clicked the div!');
}

let go = document.getElementById('go');

go.addEventListener('click', goClicked);
