import { medals } from '/president/assets/js/medals.js';
import { imgPresident } from '/president/assets/js/president.js';

try {

} catch (error) {

}


document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";

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

  // Declare variables buttons
  const btnStart = document.querySelector('.start');
  const btnStartAgain = document.getElementById('start-again');
  const btnReset = document.querySelector('.reset');
  const btnClose = document.querySelector('.btn-close');
  const rules = document.querySelector('.rules');
  const clock = document.querySelector('.timer');
  let scoreDisplay = document.querySelector('.score');

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
  const tips1 = document.querySelector('.tips1');
  const tips2 = document.querySelector('.tips2');
  const tips3 = document.querySelector('.tips3');
  const tips4 = document.querySelector('.tips4');

  // Declare variables Title for President's names
  const title = document.querySelector('.title_president');
  const titleName = document.querySelector('.title_president-name');
  const titleMandat = document.querySelector('.title_president-mandat');
  // Define tip when "Commencer" is click
  let num;
  let tipsArray = {};


  // Declare variables for images
  let stockId = [];
  const containerCards = document.getElementById('container__cards');
  const card = document.getElementsByClassName('card');
  const cardImage = document.getElementsByClassName('card_img');

  // Init variables
  luckyInput.value = "";
  let cardId;
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
  let total;
  let pscore = 1000;


  /**
   * @param {number} alpha
   * @param {number} p
   * @description Display random photo of Presidents
   */
  num = Math.floor(Math.random() * 25);
  function displayPhotoPres(alpha, p) {
    const stylesPres = {
      backgroundImage: "url(" + shufflePresident[p].src + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "rgba(255, 255, 255," + alpha + ")"
    }
    Object.assign(fotoPresident.style, stylesPres);

    // Display title
    titleName.innerHTML = shufflePresident[p].name;
    titleMandat.innerHTML = shufflePresident[p].mandat;

    // Display indice
    tipsArray = Object.values(shufflePresident[p].indice);
    tips1.innerHTML = shufflePresident[p].indice.tip1;
  }


  // ON LOAD
  displayPhotoPres(0.6, num);


  let closeRules = () => {
    rules.classList.add('fade-out');
    closeId = setTimeout(() => {
      rules.classList.add('close');
    }, 1900);
  }
  btnClose.addEventListener('click', closeRules);


  function scoreTotal() {
    total = pscore + " points";
    scoreDisplay.innerHTML = total;
  }


  //reset Chrono
  let resetTimer = () => {
    second = 0;
    minute = 0;
    hour = 0;
    clearInterval(clockId);
    clock.innerHTML = hour + 'h ' + minute + "m " + second + 's';
    luckyInput.value = "";
  }


  let resetBtn = () => {
    btnStartAgain.classList.add('hide');
    title.classList.add('hide');
    tips1.classList.add('hide');
    tips2.classList.add('hide');
    tips3.classList.add('hide');
    luckyError.setAttribute('hidden', '');
  }


  let resetWin = () => {
    title.classList.remove('hide');
    luckyGreets.removeAttribute('hidden');
    btnStartAgain.classList.remove('hide');
    luckySubmit.classList.add('disabled')
    timerId = setTimeout(() => {
      luckyGreets.setAttribute('hidden', '')
    }, 5000);
    luckyError.setAttribute('hidden', '');
    clearInterval(clockId);
  }


  let resetGame = () => {
    num = Math.floor(Math.random() * 25);
    resetTimer();
    resetBtn();

    pscore = 1000;
    scoreTotal();

    btnReset.classList.add('hide');
    lucky.classList.add('hide');
    btnStart.classList.remove('disabled');

    displayPhotoPres(1, num);
    let copyCard = [...card];
    copyCard.map((c) => c.classList.remove('remove-card', 'matched'));
    containerCards.innerHTML = "";

    // tips1.innerHTML = tipsArray[0];
  }


  /**
   * @description start Timer
   */
  function startTimer() {
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

  // After click, check if input equal president's name
  function luckyTrySubmit(e) {
    e.preventDefault();
    // luckyForm.setAttribute('attr', 'value');
    // console.log("Target: ", e.target.previousElementSibling.value)
    let inputValue = (luckyInput.value).toLowerCase();

    if (inputValue.includes((shufflePresident[num].name).toLowerCase()) || inputValue.includes((shufflePresident[num].lastName).toLowerCase())) {
      resetWin();
      luckyError.setAttribute('hidden', '');
      // Make a shallow copy of card
      let copyCard = [...card];
      copyCard.map(function (c) {
        c.classList.add('remove-card');
      })
    }
    else if (inputValue === "" || inputValue !== (shufflePresident[num].name).toLowerCase()) {
      luckyError.removeAttribute('hidden');
      pscore = pscore - 50;
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

  scoreTotal();

  let greets = () => {
    countEven++;
    if (countEven === 7) {
      resetWin();
    }
  }

  // ON CLICK COMMENCER
  btnStart.addEventListener('click', () => {
    num = Math.floor(Math.random() * 25);
    //Remove classes hide
    btnReset.classList.remove('hide');
    luckySubmit.classList.remove('disabled');
    lucky.classList.remove('hide');
    // tips1.classList.remove('hide');

    closeRules();
    disabledBtn();

    function disabledBtn() {
      btnStart.classList.add('disabled');
      clearTimerMatch();
    }


    // Display deck of cards
    for (let i = 0; i < cardNumber; i++) {
      let cardHtml = '<div class="card"><img src="' + shuffledCards[i].url + '" data-id="' + shuffledCards[i].id + '" alt="' + shuffledCards[i].title + '" class="card_img" title="' + shuffledCards[i].title + '"></div>';
      document.getElementById('container__cards').innerHTML += cardHtml;
    }


    function delayedMatched() {
      timeoutMatch = window.setTimeout(match, 2000);
    }


    /**
     * @description display Match
     * @description If cards matched
     */
    function match() {
      let numRandomTips = Math.floor(Math.random() * 4);
        switch (numRandomTips) {
          case 1:
            tips1.classList.remove('hide');
            tips1.innerHTML = tipsArray[0];
            break;
          case 2:
            tips2.classList.remove('hide');
            tips2.innerHTML = tipsArray[1];
          case 3:
            tips3.classList.remove('hide');
            tips3.innerHTML = tipsArray[2];
            break;
          default:
        }

      pscore = pscore + 30;

      let copyStockId = [...stockId];
      for (let i = 0; i < copyStockId.length; i++) {
        let attrCard = document.querySelectorAll(`img[data-id="${stockId[i]}"]`);
        attrCard[i].parentNode.classList.add('matched');
      }
    }


    function clearTimerMatch() {
      window.clearTimeout(timeoutMatch);
    }


    // If cards unmatched
    function unMatched() {
      // pscore = pscore - 30;
      removeClassBack();
    }
    unMatched();
    function clearTimerUnmatch() {
      window.clearTimeout(timeoutUnMatch);
    }


    // Make a shallow copy of cardImage to add classes back
    let cards = [...cardImage];

    cards.forEach(function (mask) {
      mask.addEventListener('click', function () {
        if (stockId.length <= 2) {
          cardId = this.getAttribute("data-id");
          this.classList.add('back');
          stockId.push(cardId);
        }

        function delayedAfterUnmatched() {
          timeoutUnMatch = window.setTimeout(unMatched, 1000);
        }

        // Matched
        if (stockId.length === 2) {
          if (stockId[0] === stockId[1]) {
            match();
            // delayedMatched()
            stockId = [];
            greets();
          }

          // Unmatched
          else if (stockId[0] !== stockId[1]) {
            delayedAfterUnmatched();
            stockId = [];
          }
        }
      });
    });

    startTimer();
    scoreTotal();

    displayPhotoPres(1, num);

    luckySubmit.addEventListener('click', luckyTrySubmit);

    // tips1.innerHTML = tipsArray[0];
  });

  let startAgain = () => {
    num = Math.floor(Math.random() * 25);

    resetTimer();
    resetBtn();

    pscore = 1000;
    luckySubmit.classList.remove('disabled');

    // shuffledCards
    // shufflePresident;

    displayPhotoPres(1, num);


    let copyCard = [...card];
    copyCard.map((c) => c.classList.remove('remove-card', 'matched'));
    // // Make a shallow copy of cardImage
    // let cards = [...cardImage];
    removeClassBack();

    tips1.innerHTML = tipsArray[0];

    startTimer();
    greets();
  }

  btnReset.addEventListener('click', resetGame);


  btnStartAgain.addEventListener('click', startAgain);
});
