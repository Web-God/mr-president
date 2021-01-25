import { medals } from '/president/assets/js/medals.js';
import { imgPresident } from '/president/assets/js/president.js';

try {

} catch (error) {

}


document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";

  /**
   * @param {array} array
   * @description shuffles cards
   * @description Fisher-Yates
   */
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

  // Declare variables buttons
  const btnStart = document.querySelector('.start');
  const btnReset = document.querySelector('.reset');
  const btnClose = document.querySelector('.btn-close');
  const rules = document.querySelector('.rules');
  const clock = document.querySelector('.timer');
  // Form Lucky
  const lucky = document.querySelector('.leftside_btn-tips');
  const luckyInput = document.querySelector('#lucky');
  const luckySubmit = document.getElementById('lucky-submit');
  const luckyForm = document.getElementById('lucky-form');
  const luckyError = document.getElementById('error');
  const luckyGreets = document.getElementById('greets');

  // Shuffle cards and President's photos
  let shuffledCards = shuffle(medals);
  let shufflePresident = shuffle(imgPresident);
  const fotoPresident = document.getElementById('center');
  const tips = document.querySelector('.tips');

  // Declare variables Title for President's names
  const title = document.querySelector('.title_president');
  const titleName = document.querySelector('.title_president-name');
  const titleMandat = document.querySelector('.title_president-mandat');

  // Declare variable for images
  const cardImage = document.getElementsByClassName("card_img");

  // Init variables
  let stockId = [];
  let timeoutMatch;
  let timeoutUnMatch;
  let timerId;
  let clockId;
  let closeId;
  let countEven = 0;
  let cardNumber = 14;
  let second = 0;
  let minute = 0;
  let hour = 0;
  let shuffleTips;
  let lenObjectTips;
  let randomTips;
  /**
   * @param {number} alpha
   * @param {number} p
   * @description Display random photo of Presidents
   */

  function displayPhotoPres(alpha, p, t) {
    const stylesPres = {
      backgroundImage : "url(" + shufflePresident[p].src + ")",
      backgroundSize : "cover",
      backgroundRepeat : "no-repeat",
      backgroundColor : "rgba(255, 255, 255," + alpha + ")"
    }
    Object.assign(fotoPresident.style, stylesPres);

    // Display title
    titleName.innerHTML = shufflePresident[p].name;
    titleMandat.innerHTML = shufflePresident[p].mandat;

    // Display Tips
    shuffleTips = shuffle([Object.values(shufflePresident[p].indice)]);//undefined L:218
    lenObjectTips = Object.keys(imgPresident[p].indice).length;
    randomTips = Math.floor(Math.random() * lenObjectTips);
    tips.innerHTML = shuffleTips[p][randomTips];
    // console.log("Alpha: ", alpha, "Prest: ", p, "Tips: ", t)
    // console.log("Random Tips: ", randomTips)
    // console.log("Mandat", Object.values(shufflePresident[p].shuffleTips[t]))
  }


  // ON LOAD
  let closeRules=()=>{
    rules.classList.add('fade-out');
    closeId = setTimeout(() => {
      rules.classList.add('close');
    }, 1900);
  }
  // window.onload()
  displayPhotoPres(0.6, 0, 0);
  // console.log("Shuffletips: ", shuffleTips[0][0])
  // Close rules
  btnClose.addEventListener('click', closeRules);


  /**
   * @description display Match
   * @description If cards matched
   */
  function match() {
    let matchCard = document.getElementsByClassName('back');
    let copyMatchCard = [...matchCard];
    copyMatchCard.forEach(function (rm) {
      rm.parentNode.classList.add("remove-card");
    });
  }

  function delayedMatched() {
    timeoutMatch = window.setTimeout(match, 3000);
  }
  function clearTimerMatch() {
    window.clearTimeout(timeoutMatch);
  }

  //reset Chrono
  let resetTimer=()=>{
    second = 0;
    minute = 0;
    hour = 0;
    clearInterval(clockId);
    clock.innerHTML = hour + 'h ' + minute + "m " + second + 's';
    luckyInput.value = "";
  }




  /**
   * @description start Chrono
   */
  function startChrono() {
    clockId = setInterval(() => {
      second++
      if (second > 59) {
        minute += 1;
        second = 0
      }
      if (minute > 59) {
        hour += 1;
        minute = 0;
        second = 0;
      }
      clock.innerHTML = hour + 'h ' + minute + "m " + second + 's'
    }, 1000);
  }

  function luckyTrySubmit(e) {
    e.preventDefault();
    // luckyForm.setAttribute('hidden', '');
    luckyGreets.removeAttribute('hidden');
    // if(e.target.value === shufflePresident.name){
    // }

    console.log('Félicitations', shufflePresident.name)
  }
  luckySubmit.addEventListener('click', luckyTrySubmit);
  // luckySubmit.onsubmit = luckyTrySubmit;

  // ON CLICK COMMENCER
  btnStart.addEventListener('click', (p)=>{
    //Remove classes hide from cards
    btnReset.classList.remove('hide');
    lucky.classList.remove('hide');
    tips.classList.remove('hide');
    closeRules();
    disabledBtn();
    function disabledBtn(){
      btnStart.classList.add('disabled');
      clearTimerMatch();
    }

    // Display deck of cards
    for (let i = 0; i < cardNumber; i++) {
      let cardHtml = '<div class="card"><img src="' + shuffledCards[i].url + '" card_id="' + shuffledCards[i].id + '" alt="' + shuffledCards[i].title + '" class="card_img" title="' + shuffledCards[i].title + '"></div>';
      document.getElementById('container__cards').innerHTML += cardHtml;
    }
      // Make a shallow copy of cardImage
    let cards = [...cardImage];
    // If cards unmatched
    function unMatched() {
      for (let i = 0; i < cards.length; i++) {
        const removeCard = cards[i];
        removeCard.classList.remove('back');
      }
    }
    unMatched();
    function clearTimerUnmatch() {
      window.clearTimeout(timeoutUnMatch);
    }

    cards.forEach(function (mask) {
      mask.addEventListener('click', function () {
        if (stockId.length <= 2) {
          let cardId = this.getAttribute("card_id");
          this.classList.add('back');
          stockId.push(cardId);
        }
        function delayedAfterUnmatched() {
          timeoutUnMatch = window.setTimeout(unMatched, 1000);
        }
        // Matched
        if (stockId.length === 2) {
          if (stockId[0] === stockId[1]) {
            delayedMatched()
            stockId = [];
            countEven++;
            if (countEven === 7) {
              title.classList.add('show');
            }
          }
          // Unmatched
          else if (stockId[0] !== stockId[1]) {
            delayedAfterUnmatched();
            stockId = [];
          }
        }
      });
    });
    startChrono();
    // displayPhotoPres(1, 1, 2);
    // console.log('Random Tips: ', shuffleTips[0][1]);
    // tips.innerHTML = shuffleTips[1][1];
  });
  btnReset.addEventListener('click', resetTimer);

});
