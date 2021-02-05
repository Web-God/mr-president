import * as presidentJs from '/president/assets/js/president.js';
import { medals } from '/president/assets/js/medals.js';
document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";
  // Init Variables
  const GAME_STATUS = {
    INIT: "INIT",
    STARTING: "STARTING",
    PLAYING: "PLAYING",
    RESETTING: "RESETTING",
    FINISHED: "FINISHED"
  };
  const CARD_STATUS = {
    SELECTED: "SELECTED",
    MATCHED: "MATCHED",
    HIDDEN: "HIDDEN"
  };


  let userGuess;
  let cardId;
  let cardNumber = 14;
  let countEven = 0;
  let btnDisabledId;
  let clockId;
  let timerId;
  let second = 0;
  let minute = 0;
  let hour = 0;
  let timerOn = false;

  let total;
  let pscore = 1000;

  let closeId;

  // Declare variables buttons
  let btnStart = document.querySelector('.start');
  let btnStartAgain = document.getElementById('start-again');
  let btnReset = document.querySelector('.reset');
  let scoreDisplay = document.querySelector('.score');
  let clock = document.querySelector('.timer');
  let btnClose = document.querySelector('.btn-close');
  let rules = document.querySelector('.rules');

  let fotoPresident = document.getElementById('center');
  let tips1 = document.querySelector('.tips1');
  let tips2 = document.querySelector('.tips2');
  let tips3 = document.querySelector('.tips3');
  let tips4 = document.querySelector('.tips4');

  // Declare variables Title for President's names
  let title = document.querySelector('.title_president');
  let titleName = document.querySelector('.title_president-name');
  let titleMandat = document.querySelector('.title_president-mandat');
  let tipsArray = {};

  // Form Lucky
  const lucky = document.querySelector('.leftside_btn-tips');
  const luckyInput = document.querySelector('#lucky');
  const luckySubmit = document.getElementById('lucky-submit');
  const luckyForm = document.getElementById('lucky-form');
  const luckyError = document.getElementById('error');
  const luckyGreets = document.getElementById('greets');


  let shufflePresident = shuffle(presidentJs.imgPresident);
  let shuffledCards = shuffle(medals);
  let num;



  // Declare variables for images
  let stockId = [];
  const containerCards = document.getElementById('container__cards');
  const card = document.getElementsByClassName('card');
  const cardImage = document.getElementsByClassName('card_img');


  /**
     * @param {array} array
     * @description shuffles cards & photos
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


  // Shuffle President's Pic
  let shufflePhotosPresident = () => {

    num = Math.floor(Math.random() * 25);
    let shufflePresidentData = shufflePresident[num];
    // display photo
    const stylesPres = {
      backgroundImage: "url(" + shufflePresidentData.src + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "rgba(255, 255, 255, 1)"
    }
    Object.assign(fotoPresident.style, stylesPres);

    // Display title
    titleName.innerHTML = shufflePresidentData.name;
    titleMandat.innerHTML = shufflePresidentData.mandat;

    // Display indice
    tipsArray = Object.values(shufflePresidentData.indice);
    tips1.innerHTML = shufflePresidentData.indice.tip1;
  }


  // Display deck of cards
  let displayDeck = () => {
    for (let i = 0; i < cardNumber; i++) {
      let cardHtml = '<div class="card"><img src="' + shuffledCards[i].url + '" data-id="' + shuffledCards[i].id + '" alt="' + shuffledCards[i].title + '" class="card_img" title="' + shuffledCards[i].title + '"></div>';
      containerCards.innerHTML += cardHtml;
    }
  }


  // Rules
  let closeRules = () => {
    rules.classList.add('fade-out');
    closeId = setTimeout(() => {
      rules.classList.add('close');
    }, 1500);
  }
  btnClose.addEventListener('click', closeRules);

  /**
 * @description start Timer
 */
  let startTimer = () => {
    const clock = document.querySelector('.timer');
    clockId = setInterval(() => {
      second++;
      pscore--;
      if (second > 59) {
        minute += 1;
        second = 0
      }
      if (minute > 59) {
        hour += 1;
        minute = 0;
        second = 0;
      }
      clock.innerHTML = hour + 'h ' + minute + "m " + second + 's';
      scoreTotal();
    }, 1000);
  }

  function clearTimer() {
    window.clearTimeout(clockId);
  }


  // Score
  function scoreTotal() {
    total = pscore + " points";
    scoreDisplay.innerHTML = total;
  }

  // Enable Buttons
  let enableBtn = () => {
    //Remove classes hide
    btnReset.classList.remove('hide');
    luckySubmit.classList.remove('disabled');
    lucky.classList.remove('hide');
  }
  // Disabled Start button
  let disabledBtnStart = () => {
    btnDisabledId = setTimeout(() => {
      btnStart.classList.add('disabled');
      btnStart.disabled = true;
    }, 1000);
  }

  // If President's name mathed
  let resetWin = () => {
    title.classList.remove('hide');
    luckyGreets.removeAttribute('hidden');
    btnStartAgain.classList.remove('hide');
    luckySubmit.classList.add('disabled');
    luckyInput.disabled = true;
    timerId = setTimeout(() => {
      luckyGreets.setAttribute('hidden', '')
    }, 5000);
    luckyError.setAttribute('hidden', '');
    clearInterval(clockId);
    countEven = 0;
    tips1.classList.remove('hide');
    tips1.innerHTML = tipsArray[0];
    tips2.classList.remove('hide');
    tips2.innerHTML = tipsArray[1];
    tips3.classList.remove('hide');
    tips3.innerHTML = tipsArray[2];
  }

  // After click, check if input equal president's name
  let luckyTrySubmit = (e, n) => {
    e.preventDefault();
    n = num;
    userGuess = String(luckyInput.value).toLowerCase();
    let namePres = shufflePresident[n].name.toLowerCase();
    let lastNamePres = shufflePresident[n].lastName.toLowerCase();
    // luckyForm.setAttribute('attr', 'value');
    // console.log("Target: ", e.target.previousElementSibling.value)
    if (userGuess.includes(namePres) || userGuess.includes(lastNamePres)) {
      resetWin();
      luckyError.setAttribute('hidden', '');
      // Make a shallow copy of card
      let copyCard = [...card];
      copyCard.map(function (c) {
        c.classList.add('remove-card');
      })
    }
    else if (userGuess === "" || userGuess !== (shufflePresident[n].name).toLowerCase()) {
      luckyError.removeAttribute('hidden');
      pscore = pscore - 50;
    }
  }


  let resetGame = () => {
    num = Math.floor(Math.random() * 25);
    resetTimer();
    resetBtn();
    countEven = 0;
    pscore = 1000;
    scoreTotal();

    btnReset.classList.add('hide');
    lucky.classList.add('hide');
    btnStart.classList.remove('disabled');

    shufflePhotosPresident();
    let copyCard = [...card];
    copyCard.map((c) => c.classList.remove('remove-card', 'matched'));
    containerCards.innerHTML = "";
  }


  //reset Chrono
  let resetTimer = () => {
    second = 0;
    minute = 0;
    hour = 0;
    clearInterval(clockId);
    clock.innerHTML = hour + 'h ' + minute + "m " + second + 's';
    userGuess = "";

  }


  let resetBtn = () => {
    btnStartAgain.classList.add('hide');
    title.classList.add('hide');
    tips1.classList.add('hide');
    tips2.classList.add('hide');
    tips3.classList.add('hide');
    luckyError.setAttribute('hidden', '');
  }

  function Game() {
    this.gameStatus = GAME_STATUS;
    this.pscore = 1000;
    this.resetTimer();

  }

  Game.prototype.init = function () {
    this.gameStatus = GAME_STATUS.INIT;
    shufflePhotosPresident();

  }
  let gameInit = new Game();
  gameInit.init();


  Game.prototype.startGame = function () {
    this.gameStatus = GAME_STATUS.STARTING;
    btnReset.addEventListener('click', resetGame);
    btnStart.addEventListener('click', () => {
      closeRules();
      if (!timerOn) {
        startTimer();
      }
      timerOn = true;
      enableBtn();
      shufflePhotosPresident();
      disabledBtnStart();
      displayDeck();
      clickCard();
      scoreTotal();
      luckySubmit.addEventListener('click', luckyTrySubmit);
    });

  }
  let start = new Game();
  start.startGame();

  /**
   * @description display Match
   * @description If cards matched
   */
  function match() {
    let numRandomTips = Math.floor(Math.random() * 5);
    switch (numRandomTips) {
      case 0:
        tips1.classList.remove('hide');
        tips1.innerHTML = tipsArray[0];
        break;
      case 1:
        tips2.classList.remove('hide');
        tips2.innerHTML = tipsArray[1];
        break;
      case 2:
        tips3.classList.remove('hide');
        tips3.innerHTML = tipsArray[2];
        break;
      default:
    }

    // total ?  !970 : pscore + 30;
    if (total > 500) {
      console.log("Total", total)
      pscore = pscore + 30;
    }

    let copyStockId = [...stockId];
    for (let i = 0; i < copyStockId.length; i++) {
      let attrCard = document.querySelectorAll(`img[data-id="${stockId[i]}"]`);
      attrCard[i].parentNode.classList.add('matched');
    }
  }


  let removeClassBack = () => {
    // Make a shallow copy of cardImage
    let cards = [...cardImage];
    for (let i = 0; i < cards.length; i++) {
      const removeCard = cards[i];
      removeCard.classList.remove('back');
    }
  }


  function delayedAfterUnmatched() {
    timeoutUnMatch = window.setTimeout(unMatched, 1000);
  }

  let disabledCardOverThree = false;
  let clickCard = () => {
    // Make a shallow copy of cardImage to add classes back
    let cards = [...cardImage];
    if (!disabledCardOverThree) {
      cards.forEach(function (mask) {
        mask.addEventListener('click', function () {
          if (stockId.length <= 2) {
            disabledCardOverThree = false;
            cardId = this.getAttribute("data-id");
            this.classList.add('back');
            stockId.push(cardId);
          }

          // Matched
          if (stockId.length === 2) {
            disabledCardOverThree = true;

            mask.disabled = true;
            let firstStatus;
            let secondStatus;
            const first = stockId[0];
            const second = stockId[1];
            let firstCard = document.querySelector(`img[data-id="${stockId[0]}"]`);
            let secondCard = document.querySelector(`img[data-id="${stockId[1]}"]`);
            if (first === second) {
              firstStatus = CARD_STATUS.MATCHED;
              secondStatus = CARD_STATUS.MATCHED;
              match();
              stockId = [];
              countEven++;
              if (countEven === 7) {
                resetWin();
              }
            }

            // Unmatched
            else if (first !== second) {
              firstStatus = CARD_STATUS.HIDDEN;
              secondStatus = CARD_STATUS.HIDDEN;
              timerId = setTimeout(() => {
                removeClassBack();
              }, 1000);
              stockId = [];
              pscore = pscore - 30;
            }
          }
        });
      });
    }
  }




  Game.prototype.startAgain = function () {
    this.gameStatus = GAME_STATUS.FINISHED;
    btnStartAgain.addEventListener('click', () => {
      // pscore = 1000;
      resetTimer();
      resetBtn();
      disabledBtnStart();
      containerCards.innerHTML = "";
      shuffle(medals);
      displayDeck();
      clickCard();
      startTimer();
      luckyInput.value = "";
      luckySubmit.classList.remove('disabled');
      luckyInput.focus();
      luckyInput.disabled = false;
    })
    btnStartAgain.addEventListener('click', shufflePhotosPresident);

  }
  let playAgain = new Game();
  playAgain.startAgain();
  // END
});
