var dealerSum= 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true;

function buildDeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types= ["C","D","H","S"];
     deck=[];

     for (let i=0; i<types.length; i++){
        for (let j=0; j<values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
     }

    console.log(deck);

}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame () {
    hidden = deck.pop();
    dealerSum += getValue(hidden);    
    // console.log(hidden);
    // console.log(dealerSum);
    while(dealerSum<17){
        let cardImg = document.createElement("img");
        cardImg.style.display="inline";
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        cardImg.style.display="inline";
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click",hit);
    document.getElementById("stay").addEventListener("click",stay);

}








function hit() {
    if(!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    cardImg.style.display="inline";
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);

        if (reduceAce(yourSum,yourAceCount)>21) {
            canHit = false;
        }
}

function stay() {
    dealerSum = reduceAce(dealerSum,dealerAceCount);
    yourSum = reduceAce(yourSum,yourAceCount);
    canHit = false;
    document.getElementById("hidden").src = "./cards/"+ hidden + ".png"

    let message= ""
        if (yourSum>21) {
            message = "You Lose!";
        }
        else if (dealerSum > 21) {
            message = "You Win!";
        }
        else if (yourSum == dealerSum){
            message = "Tie!";
        }
        else if (yourSum > dealerSum) {
            message = "You Win!";
        }
        else if (yourSum < dealerSum) {
            message = "You Lose!";
        }

        document.getElementById("results").style.display = 'inline';
        document.getElementById("results").innerText = message;
        document.getElementById('playagain').style.display = 'inline';
 
  document.getElementById('playagain').style.display = 'inline';






}


function getValue(card){
    let data = card.split("-"); // "4-C" -> ["4","C"]
    let value = data[0];

    if(isNaN(value)) { // FOR THE CARDS A,J,Q,K
        if (value=="A") {
             return 11;
         }
            return 10;
    }
        return parseInt(value);

}

function checkAce(card) {
    if (card[0]=="A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0 ) {
        playerSum-=10;
        playerAceCount -=1;
    }
    return playerSum;



}

function playG() {
    // document.getElementById("your-cards").innerHTML = "";
    // document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById('play').style.display = 'none';
    document.getElementById('stay').style.display = 'inline';
    document.getElementById('hit').style.display = 'inline';
    document.getElementById('dealer-cards').style.display = "inline";
    document.getElementById('your-cards').style.display = 'inline';
    document.getElementById('results').style.display = 'none';
    document.getElementById('hidden').style.display = 'inline';
    var titles = document.getElementsByClassName("title");

        for (var i = 0; i < titles.length; i++) {
        titles[i].style.display = "block";
        }

    buildDeck();
    shuffleDeck();
    startGame();
}

function playAgain() {
    document.getElementById('playagain').style.display = 'none';
    document.getElementById('play').style.display = 'inline';
    document.getElementById('stay').style.display = 'none';
    document.getElementById('hit').style.display = 'none';
    document.getElementById('dealer-cards').style.display = "none";
    document.getElementById('your-cards').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('hidden').style.display = 'none';
    var titles = document.getElementsByClassName("title");

        for (var i = 0; i < titles.length; i++) {
        titles[i].style.display = "none";
        }

        dealerSum= 0;
        yourSum = 0;

        dealerAceCount = 0;
        yourAceCount = 0;

        hidden;
        deck;

        canHit = true;

    
   


    // // Get the parent div
    // var dealerCardsDiv = document.getElementById("your-cards");

    // // Get all img elements inside the div
    // var imgElements = dealerCardsDiv.getElementsByTagName("img");

    // // Loop through each img element and remove it
    // for (var i = imgElements.length - 1; i >= 0; i--) {
    //     dealerCardsDiv.removeChild(imgElements[i]);
    // }

//         const parent = document.getElementById("dealer-cards")
//         while (parent.firstChild) {
//             parent.firstChild.remove()
//         }
//         const parent2 = document.getElementById("your-cards")
//         while (parent2.firstChild) {
//             parent.firstChild.remove()
//         }

            // const myNode = document.getElementById("dealer-cards");
            // while (myNode.lastElementChild) {
            // myNode.removeChild(myNode.lastElementChild);

            window.location.reload();
}