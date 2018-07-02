
// Create a list that holds all of your cards
// Create a list that holds all the images
// Four auxiliary variables that will be used as needed
let cards = document.querySelectorAll('#masterCards li');
let myNodelist = document.querySelectorAll('#masterCards li .fa');
let selectedCards = [];
let card_1_val;
let card_2_val;
let noMovements = 0;
let firstMovement = false;
let score = 0;
let firstSelectionIndex = 0;
let sec = 0;
let lista;
let finalScore;

function initialize (){ // Display the cards on the page with class="card"
    for (let card= 0; card < cards.length; card++){
        cards[card].className = 'card'; // load class = card to Notelist elements
        cards[card].setAttribute('is_matched', 0);
    }
}

function shuffle(array) {// shuffle the list of cards using the provided "shuffle" function from http://stackoverflow.com/a/2450976
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let clock;
function timer() { // create counter time
    if (firstMovement == false) {
    firstMovement = true;
    clock = setInterval(function() {
    sec++;
    //console.log('sec'); this line print timer in console
    document.getElementById('timer').innerHTML = 'Time: ' + sec;
    }, 1000); // set interval per second (s)
    return sec
    }
    else 
    {}
}


function stopTimer() {
      clearInterval(clock);
      document.location = document.location;
    }

function stopTimer2() {
      clearInterval(clock);
    }

function addingCardListener(){ //Add a listener on each card
    for (let card= 0; card < cards.length; card++){
        cards[card].addEventListener('click', {//Add an event listener to each card
            handleEvent: function (event) {
            flip(card); //
            }
        });
    }
}

function displayingNewSimbol(){ //assign and display a new picture on each card 
    for (let card= 0; card < cards.length; card++){
        //console.log(cards[card].childElementCount, "--", card, cards[card].getElementsByClassName('fa'), "nodo");  //print picture as a child 
        let a =cards[card].getElementsByClassName('fa'); //select card from deeck Note: class = 'fa'
        //console.log(a); //print card assigned on let a
        //console.log(a[0],"original"); //print cards BEFORE function shuffle() 
        //console.log(shuffleArray[card],"new"); //print cards AFTER function shuffle()

        if(cards[card].childElementCount > 0) {//replace card picture and append
            a[0].parentNode.replaceChild(shuffleArray[card],a[0]);
            a[0].parentNode.add;
            }

        if(cards[card].childElementCount<1) { //apped AFTER schuffle card when there is not picture as a child
            cards[card].appendChild(shuffleArray[card]);
            //console.log(cards[card].appendChild(shuffleArray[card]),"append"); // print card append
            }
    //console.log(a[0],"new node", card); //print card append to cards deck
    }
}

function addingCardtoList(card){ //function addingCardtoList add a card to list
    selectedCards.push(card[cards]);
}

function matchVerification(card){ //verify if a matched occured
    card_2_val=cards[card].getElementsByClassName('fa')[0].className;
    if (card_1_val==card_2_val) {
    //console.log(card_1_val,"matched",card_2_val);
        cards[card].setAttribute("is_matched",1);
        cards[firstSelectionIndex].setAttribute("is_matched",1);
        selectedCards = [];
        score++;
    return true;
    }
    else return false;
}

function matchVerificationFailed(){ //NO matched
    //reset first selection index
    firstSelectionIndex = 0;
    }

function flip (card){ //flip card and verify if matched ocurred
    if (cards[card].className == 'card' && selectedCards.length < 2 ){
    cards[card].className = 'card open show';// Flip card
    addingCardtoList(card);

    if (selectedCards.length === 1) {card_1_val=cards[card].getElementsByClassName('fa')[0].className;
    firstSelectionindex=card;
    console.log(card_1_val,'--',firstSelectionIndex);}
    else if (selectedCards.length === 2) { 
    if(matchVerification(card)==true){  //verifying if a match has occured
    moveCounter();
    //scoreVerification();
    }   
    
    else { //if match NOT occured - to do 
    matchVerificationFailed();
    moveCounter();
    }
  }
}

else if (cards[card].className == 'card open show' && selectedCards.length <= 2 && cards[card].getAttribute('is_matched')==0 ) { //flip down card
    cards[card].className='card';
    selectedCards.pop();
    }
}



function scoreVerification(){ //Cound 8 pair and cheer user
    if (noMovements == 2){
        lista = document.getElementsByClassName('fa-star');   // Get the <ul> element with id="myList"
        lista[0].parentNode.parentNode.removeChild(lista[0].parentElement);
    }
    if (noMovements == 5){
        lista = document.getElementsByClassName('fa-star');   // Get the <ul> element with id="myList"
        lista[0].parentNode.parentNode.removeChild(lista[0].parentElement);
    }
    if (noMovements == 7){
        lista = document.getElementsByClassName('fa-star');   // Get the <ul> element with id="myList"
        lista[0].parentNode.parentNode.removeChild(lista[0].parentElement);
    }
    if(score == 8) {
        alert("You won in " + sec + " secondes your score is " + finalScore + " do you want to taka another chance");
        } 
    else if (score > 1 && noMovements == 5) {
        alert("Keep going");
        }
    else if (score < 8 && noMovements == 8) {
            alert("what's happen!");
        }
    }

function moveCounter() { //Count movements to complete game
    noMovements++;
    document.getElementById('moves').innerHTML = noMovements;
    console.log('#: ' + noMovements + ' score :' + score);
    scoreVerification();
    fscore();
    timer();
    return noMovements;
    }

function fscore (){
    if (noMovements == 8){
        finalScore = "Excellent";
    }
    else if (noMovements > 8 && noMovements < 15){
        finalScore = "Average";
    }
    else if (noMovements > 15){
        finalScore = "Poor";
    }
}

console.log(firstMovement);


window.onload = function() { //Run function initialize since page is load
    initialize();
}

let myArray = Array.apply(null, myNodelist); //Define and array from the node list

let startTimer = document.getElementById('newGame');
let runTimer = startTimer.addEventListener('click', timer); //Add time eventlistener

let restart = document.getElementById('restart');
let stopClock = restart.addEventListener('click', stopTimer);

let shuffleArray = shuffle(myArray); //Shuffle cards deck

addingCardListener(); //Call cards listener

displayingNewSimbol(); //Assigning a new image of each card

/* done 
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */