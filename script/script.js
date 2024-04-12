const images = [
    "images/jssss.jpg",
    "images/jsss.jpg",
    "images/jss.jpg",
   "images/js.jpg",
   "images/j.jpg",
    "images/alayn.jpg",
    "images/maskiti.jpg",
    "images/centrum.jpg",
    "images/dessert.jpg",
    "images/Eskilstuna.jpg",
    "images/jap.jpg",
    "images/japan.jpg",
    " images/jungle.jpg",
    "images/new.jpg",
    "images/newyork.jpg",
    "images/palmtree.jpg",
    "images/skyskaper.jpg",
    "images/somer.jpg",
    "images/stock.jpg",
    "images/stockholm.jpg",
    "images/sunset.jpg",
     "images/treehouse.jpg",
    "images/waterfall.jpg",
    "images/zombie.jpg",
    "images/jk.jpg"
     
];

const url = "https://api.api-ninjas.com/v1/quotes?category=";

const joke = document.getElementById("Quotes");

const apikey = "eCIktBEmS8MxWK3C30XSkTBIKQEbMOGKAwguFqYe";

const quotesDiv = document.getElementById("Quotes");

let currentImageIndex = 0;
let gameEnded = false;
let playerscore = 0;

function updatePlayerScore() {
    document.getElementById("scorevalue").textContent = playerscore;
}

function reshuffleImages() {
    images.sort(() => Math.random() - 0.5);
}

function startgame() {
    document.getElementById("startbutton").style.display = "none"; 
    playerscore = 0;
    updatePlayerScore();
    updateImage();
    drawMap();
    gameEnded = false;
}

function drawMap() {
    let map = document.getElementById('spelplanen');
    map.innerHTML = ''; 

    let gridSize = 5;
    let count = 0;

    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        for (let j = 0; j < gridSize; j++) {
            let position = document.createElement('span');
            if (count === currentImageIndex) {
                position.textContent = 'X'; 
            } else {
                position.textContent = 'O'; 
            }
            row.appendChild(position);
            count++;
        }
        map.appendChild(row);
    }

    if (images[currentImageIndex] === "images/jk.jpg") {
        playerscore++;
        updatePlayerScore();
        document.getElementById("catmessage").textContent = "Well done!";
       
        setTimeout(function(){
            document.getElementById("catmessage").textContent = "";
            reshuffleImages();
        }, 9000);
    
        fetch(url, {
            headers: {
                "X-Api-Key": apikey 
            }
        })
        .then(response => response.json())    
        .then(data => {
            quotesDiv.innerHTML = "";
            data.forEach(quote => {
                const quoteElement = document.createElement('p');
                quoteElement.textContent = quote.quote;
                quotesDiv.appendChild(quoteElement);
            });
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
        });

        setTimeout(function(){
            quotesDiv.textContent = "";
        }, 9000);
    } else if (images[currentImageIndex] === "images/zombie.jpg" && playerscore === 0) {
        document.getElementById("zombiemessage").textContent = "Game Over, You Caught";
        gameEnded = true;
        reshuffleImages();
        setTimeout(() => {
            document.getElementById("zombiemessage").textContent = "";
        }, 6000);
    } else if (images[currentImageIndex] === "images/zombie.jpg" && playerscore > 0) {
        playerscore--;
        updatePlayerScore();
        document.getElementById("zombiemessage").textContent = "OOPS your caught, ";
        
        setTimeout(() => {
            document.getElementById("zombiemessage").textContent = "";
            reshuffleImages();
        }, 6000);
    }
}

function GetQuotes() {
    
}

function updateImage() {
    const imgElement = document.getElementById('currentImage');
    imgElement.src = images[currentImageIndex];
}

function playerPositionNorth() {
    if (!gameEnded && currentImageIndex >= 5) {
        currentImageIndex -= 5;
        drawMap();
        updateImage();
    }
}

function playerPositionEast() {
    if (!gameEnded && (currentImageIndex + 1) % 5 !== 0) {
        currentImageIndex++;
        drawMap();
        updateImage();
    }
}

function playerPositionSouth() {
    if (!gameEnded && currentImageIndex < 20) {
        currentImageIndex += 5;
        drawMap();
        updateImage();
    }
}

function playerPositionWest() {
    if (!gameEnded && currentImageIndex % 5 !== 0) {
        currentImageIndex--;
        drawMap();
        updateImage();
    }
}

GetQuotes();
reshuffleImages();
updateImage();
drawMap();
