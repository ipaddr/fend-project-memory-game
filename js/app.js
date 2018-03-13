/*
 * Create a list that holds all of your cards
 */
const cards =["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
             "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
             "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
             "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

let newCard = [];
let tempCard = [];
let openCards = [];

let counter;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function createshuffleCardsOnHtml(){
    newCard = shuffle(cards.slice());
    tempCard = newCard.slice();
    let content;
    $(".card").each(function( index, value ) {
        content = '<i class="' + newCard.pop() + '"></i>';
        $(this).empty();
        $(this).attr('class', 'card');
        $(this).append(content);
    });
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 $('.card').on("click", function(e){
    const clickedCard = $(e.currentTarget).attr('class');
    console.log(clickedCard);
    if (clickedCard !== 'card match' && clickedCard !== 'card open show' ) {
        console.log("tempCard.length", tempCard.length);
        displayCardSymbol(e);
        addToOpenCardList(e);
        checkCard(e);
        incrementStep();
    }
 });

 // refersh the card
 $('.restart').on("click", function(){
    console.log("click restart");
    restart();
 });

 /*
 * Function to restart
 */
 function restart(){
    newCard = [];
    tempCard = [];
    openCards = [];
    createshuffleCardsOnHtml();
    $('.moves').text("0");
    counter = parseInt($('.moves').text());
    resetStart();
    resetTime();
 }

/*
 * Function to show a card
 */
 function displayCardSymbol(e){
    $(e.currentTarget).attr('class', 'card open show');
 }

 /*
 * Function to hide a card
 */
 function hideCardSymbol(e){
    $(e.currentTarget).attr('class', 'card');
 }

 /*
 * Function to match a card
 */
 function matchCardSymbol(e){
    $(e.currentTarget).attr('class', 'card match');
 }

 /*
  * Function to add new card to open cards
  */
 function addToOpenCardList(e){
    openCards.push(e);
 }

 /*
  * Function to remove card to open cards
  */
 function removeFromOpenCardList(stringCard){
    const index = openCards.indexOf(stringCard);
    if (index > -1) {
        openCards.splice(index, 1);
    }
 }

 /*
  * Function to remove card to open cards
  */
 function removeFromTempCardList(stringCard){
    const index = tempCard.indexOf(stringCard);
    if (index > -1) {
        tempCard.splice(index, 1);
    }
 }

 /*
  * Function to check if all card match
  */
 function checkFinish(){
    if(tempCard.length === 0){
        clearInterval(timeInterval);
        showModal();
    }
 }

 /*
  * Function to show modal
  */
 function showModal(){
    const starts = $('.stars').children().length;
    const modal = $('#myModal');
    // When the user clicks anywhere outside of the modal, close it
    modal.on('click', function() {
        $(this).css('display', 'none');
    });

    const span = $('.close').first();
    // When the user clicks on <span> (x), close the modal
    span.on('click', function() {
        $(this).css('display', 'none');
    });

    const buttonPlayAgain = $('.button-play-again');
    buttonPlayAgain.on('click', function(){
        modal.css('display', 'none');
        restart();
    });

    modal.css('display', 'block');
    const message = 'with ' + counter + ' moves and ' + starts + ' Start.';
    $('.modal-text').text(message);
 }

 /*
  * Function to check are there cards match?
  */
 function checkCard(e){
    if (openCards.length > 1 && openCards.length % 2 === 0) {
        const openCard = openCards[openCards.length-2];
        const currentCard = e;
        console.log("openCard : ", openCard);
        console.log("currentCard : ", currentCard);

        const openCardClass = $(openCard.currentTarget.children).attr('class');
        const currentCardClass = $(currentCard.currentTarget.children).attr('class');
        console.log("openCardClass : ", openCardClass);
        console.log("currentCardClass : ", currentCardClass);

        setTimeout(checkCardMatch, 500, openCard, currentCard, openCardClass, currentCardClass);
    }
 }


 /*
  * Function to check are two cards match?
  */
 function checkCardMatch(openCardEvent, currentCardEvent, openCardClass, currentCardClass){
    console.log("calling checkCardMatch");
    console.log("openCardEvent : ", openCardEvent);
    console.log("currentCardEvent : ", currentCardEvent);
    console.log("openCardClass : ", openCardClass);
    console.log("currentCardClass : ", currentCardClass);
    if (openCardClass === currentCardClass) {
        console.log("sama");
        matchCardSymbol(currentCardEvent);
        matchCardSymbol(openCardEvent);
        removeFromOpenCardList(currentCardClass);
        removeFromTempCardList(currentCardClass);
        removeFromOpenCardList(openCardClass);
        removeFromTempCardList(openCardClass);
        setTimeout(checkFinish(), 500);
    } else {
        console.log("beda");
        hideCardSymbol(currentCardEvent);
        hideCardSymbol(openCardEvent);
        openCards.pop();
        openCards.pop();
    }
 }

 /*
  * Function to incremen steps?
  */
 function incrementStep(){
    counter = parseInt($('.moves').text());
    counter++;
    $('.moves').text(counter);
    console.log($('.moves').text());
    decrementStart();
 }

  /*
  * Function to decrement start
  */
 function decrementStart(){
    if (counter % 15 === 0) {
        $('.stars').children().first().remove();
    }
 }

 /*
  * Function reset start start
  */
 function resetStart(){
    $('.stars').empty();
    for(let i = 0; i < 3; i++){
        $('.stars').append('<li><i class="fa fa-star"></i></li>');
    }
 }

 // A $( document ).ready() block.
$('document').ready(function() {
    restart();
});

/*
 *
 */
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let timeInterval = setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function resetTime() {
  totalSeconds = 0;
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

