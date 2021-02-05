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
  let containerCards = document.getElementById('container__cards');
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


  // Rules
  let closeRules = () => {
    rules.classList.add('fade-out');
    closeId = setTimeout(() => {
      rules.classList.add('close');
    }, 1500);
  }





  function clearTimer() {
    window.clearTimeout(clockId);
  }



  function Game() {
    this.gameStatus = GAME_STATUS;
    this.pscore = 1000;
    //reset Chrono
    let resetTimer = () => {
      second = 0;
      minute = 0;
      hour = 0;
      clearInterval(clockId);
      clock.innerHTML = hour + 'h ' + minute + "m " + second + 's';
      userGuess = "";
    }
    timerOn = false;
    btnClose.addEventListener('click', closeRules);
    resetTimer();
    shufflePhotosPresident();

  }





  Game.prototype.init = function () {
    this.gameStatus = GAME_STATUS.INIT;
    let initGame = () => {
      closeRules();
      displayDeck();
      enableBtn();
      disabledBtnStart();
      if (!timerOn) {
        startTimer();
      }
      timerOn = true;
    }
    // Score
    let scoreTotal = () => {
      total = pscore + " points";
      scoreDisplay.innerHTML = total;
    }
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


    // Display deck of cards
    let displayDeck = () => {
      for (let i = 0; i < cardNumber; i++) {
        let cardHtml = '<div class="card"><img src="' + shuffledCards[i].url + '" data-id="' + shuffledCards[i].id + '" alt="' + shuffledCards[i].title + '" class="card_img" title="' + shuffledCards[i].title + '"></div>';
        containerCards.innerHTML += cardHtml;
      }
    }

    // Enable Buttons
    let enableBtn = () => {
      //Remove classes hide
      btnReset.classList.remove('hide');
      luckySubmit.classList.remove('disabled');
      lucky.classList.remove('hide');
      luckyInput.focus();
    }
    // Disabled Start button
    let disabledBtnStart = () => {
      btnDisabledId = setTimeout(() => {
        btnStart.classList.add('disabled');
        btnStart.disabled = true;
      }, 1000);
    }

    btnStart.addEventListener('click', initGame);

  }
  let gameInit = new Game();
  gameInit.init();


  // END
});
