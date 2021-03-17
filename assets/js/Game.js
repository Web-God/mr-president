import { medals } from './medals';
import { imgPresident } from './president';

export function Game(options) {
	// this.playerName = options.playerName;
	// Init Var
	this.cardNumber = 14;
	this.duration = 1000;

	this.seconds;
	this.minutes;

	this.total;
	this.baseUrl = 'https://www.elysee.fr/';
	this.locationUrl;

	// Shuffle photos & cards
	this.shuffledCards = shuffle(medals);
	this.shufflePresident = shuffle(imgPresident);
	this.tipsPresident = Object.keys(this.shufflePresident[0].indice);
};


let points = 1000,
		clockId,
		numberOfClick = 0;
Game.prototype.timerGame = function () {
	this.chrono = new Date(1980, 6, 31);
	this.seconds = this.chrono.getSeconds();
	this.minutes = this.chrono.getMinutes();
	clockId = setInterval(() => {
		this.seconds += 1;
		if (this.seconds > 59) {
			this.minutes += 1;
			this.seconds = 0;
		}
		elementsGame.elements.clock.innerHTML = this.minutes + "m " + this.seconds + 's';
		myScore.scoreTotal();
	}, this.duration);
}
let timerClock = new Game();


Game.prototype.resetTimer = function () {
	this.total = 1000;
	this.seconds = 0;
	this.minutes = 0;
	clearInterval(clockId);
	elementsGame.elements.scoreDisplay.innerHTML = "1000 points";
	elementsGame.elements.clock.innerHTML = this.minutes + "m " + this.seconds + 's';
}
let resetClock = new Game();


Game.prototype.scoreTotal = function () {
	points = Math.max(0, points - 1);
	this.total = points + " points";
	elementsGame.elements.scoreDisplay.innerHTML = this.total;
}
let myScore = new Game();


Game.prototype.registerElements = function () {
	elementsGame.elements = {
		// Declare variables buttons
		btnStart: document.querySelector('.start'),
		btnStartAgain: document.getElementById('start-again'),
		btnReset: document.querySelector('.reset'),
		scoreDisplay: document.querySelector('.score'),
		clock: document.querySelector('.timer'),
		btnCloseRules: document.querySelector('.btn-close-rules'),
		btnCloseGreets: document.querySelector('.btn-close-greets'),
		rules: document.querySelector('.rules'),
		btnSeeMore: document.querySelector('.more'),
		// Display variables pic's president + tips
		fotoPresident: document.getElementById('center'),
		indices: document.getElementById('indices'),
		// Declare variables Title for President's names
		title: document.querySelector('.title_president'),
		titleName: document.querySelector('.title_president-name'),
		titleMandat: document.querySelector('.title_president-mandat'),
		tipsArray: {},
		// Form Lucky
		lucky: document.querySelector('.leftside_btn-tips'),
		luckyInput: document.querySelector('#lucky'),
		luckySubmit: document.getElementById('lucky-submit'),
		luckyForm: document.getElementById('lucky-form'),
		luckyError: document.getElementById('error'),
		luckyGreets: document.getElementById('greets'),
		nbrClick: document.querySelector('.nclick'),
		// Declare variables for images
		containerCards: document.getElementById('cards__container'),
		card: document.getElementsByClassName('card'),
		cardImage: document.getElementsByClassName('card_img')
	}
};
let elementsGame = new Game();
elementsGame.registerElements();


Game.prototype.events = function () {
	// Shuffle President's Pic
	elementsGame.elements.btnSeeMore.addEventListener('click', this.redirectMore);
	// Close Rules
	elementsGame.elements.btnCloseRules.addEventListener('click', this.closeRules);
	elementsGame.elements.btnCloseGreets.addEventListener('click', this.closeGreets);
	// Display HTML for Indices
	elementsGame.elements.btnReset.addEventListener('click', this.resetGame);
	elementsGame.elements.btnStartAgain.addEventListener('click', this.startAgain.bind(this));

	elementsGame.elements.btnStart.addEventListener('click', this.startGame.bind(this));
	elementsGame.elements.luckySubmit.addEventListener('click', this.luckyGuess);
}
let eventsClick = new Game();



let president,
		fullName,
		lastName;
		/**
		 * @description random President pic
		 * @param {number} n
		 */
Game.prototype.shufflePhotos = function (n) {
	president = this.shufflePresident[n];
	fullName = president.name.toLowerCase();
	lastName = president.lastName.toLowerCase();
	const stylesPres = {
		backgroundImage: "url(" + president.src + ")",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundColor: "rgba(255, 255, 255, 1)"
	}

	Object.assign(elementsGame.elements.fotoPresident.style, stylesPres);
	// Display title
	elementsGame.elements.titleName.innerHTML = fullName;
	elementsGame.elements.titleMandat.innerHTML = president.mandat;
	// Display indice
	elementsGame.elements.tipsArray = Object.values(president.indice);
	// URL
	elementsGame.elements.locationUrl = president.url;
}
let randomPhotos = new Game();
randomPhotos.shufflePhotos(0);


// Start Game
Game.prototype.startGame = function (n) {
	points = 1000;
	this.countEven = 0;
	numberOfClick = 0;
	n = Math.floor(Math.random() * 25);
	randomPhotos.shufflePhotos(n);
	timerClock.timerGame();
	disabledBtnStart.btnStart();
	displayBtn.enableBtn();
	displayPresidentOfCards.displayPresident();
	closeRulesGame.closeRules();
	elementsGame.elements.luckyInput.disabled = false;
	tipIndices.indices();
	clickOnCard.clickCard();
};


// When click, check if input equal president's name
Game.prototype.luckyGuess = function (e) {
	e.preventDefault();
	let userGuess = String(elementsGame.elements.luckyInput.value).toLowerCase();
	if (userGuess.includes(fullName) || userGuess.includes(lastName)) {
		uWin.resetWin();
		elementsGame.elements.luckyError.setAttribute('hidden', '');
		elementsGame.elements.containerCards.innerHTML = "";
	}
	else {
		elementsGame.elements.luckyError.removeAttribute('hidden');
		points = points - 150;
	}
}


Game.prototype.closeRules = function () {
	elementsGame.elements.rules.classList.add('close');
};
let closeRulesGame = new Game();


// Close Greets
Game.prototype.closeGreets = function () {
	elementsGame.elements.luckyGreets.classList.add('close');
};


// Enable Buttons
Game.prototype.enableBtn = function () {
	elementsGame.elements.btnReset.classList.remove('hide');
	elementsGame.elements.luckySubmit.classList.remove('hide');
	elementsGame.elements.lucky.classList.remove('hide');
	elementsGame.elements.luckyInput.value = "";
	elementsGame.elements.luckyInput.focus();
};
let displayBtn = new Game();


// Disabled Start button
Game.prototype.btnStart = function () {
	elementsGame.elements.btnStart.classList.add('trans');
	elementsGame.elements.btnStart.disabled = true;
};
let disabledBtnStart = new Game();


// Display president of cards
Game.prototype.displayPresident =  function()  {
	for (let i = 0; i < this.cardNumber; i++) {
		let cardHtml = '<div class="card"><img src="' + this.shuffledCards[i].url + '" data-id="' + this.shuffledCards[i].id + '" alt="' + this.shuffledCards[i].title + '" class="card_img"></div>';
		elementsGame.elements.containerCards.innerHTML += cardHtml;
	}
};
let displayPresidentOfCards = new Game();


// var hide = classList.add('hide');
// var show = classList.remove('hide');
// When user play again
Game.prototype.resetBtn = function () {
	elementsGame.elements.btnStartAgain.classList.add('hide');
	elementsGame.elements.btnSeeMore.classList.add('hide');
	elementsGame.elements.luckySubmit.classList.remove('hide');
	elementsGame.elements.title.classList.add('hide');
	elementsGame.elements.luckyError.setAttribute('hidden', '');
	elementsGame.elements.luckyGreets.setAttribute('hidden', '');
	elementsGame.elements.luckyInput.value = "";
	elementsGame.elements.luckyInput.focus();
	elementsGame.elements.containerCards.innerHTML = "";
};
let removeBtn = new Game();


// Reset Game when user won
Game.prototype.resetWin = function () {
	elementsGame.elements.title.classList.remove('hide');
	elementsGame.elements.luckyGreets.removeAttribute('hidden');
	elementsGame.elements.luckyGreets.classList.remove('close');
	elementsGame.elements.btnStartAgain.classList.remove('hide');
	elementsGame.elements.btnSeeMore.classList.remove('hide');
	elementsGame.elements.luckySubmit.classList.add('hide');
	elementsGame.elements.luckyInput.disabled = true;
	elementsGame.elements.luckyError.setAttribute('hidden', '');

	elementsGame.elements.nbrClick.innerHTML = "Vous avez élu<div> " + fullName + "</div> avec " + numberOfClick + " clicks";

	clearInterval(clockId);

	shuffle(medals);

	// Display HTML for Indices
	for (let index = 0; index < this.tipsPresident.length; index++) {
		let tipsHtml = document.querySelector('.' + this.tipsPresident[index] + '');
		tipsHtml.innerHTML = elementsGame.elements.tipsArray[index];
		tipsHtml.classList.remove('hide');
	}
};
let uWin = new Game();


// Reset game on click "Annuler"
Game.prototype.resetGame = function (n) {
	n = Math.floor(Math.random() * 25);
	randomPhotos.shufflePhotos(n);

	resetClock.resetTimer();

	this.userGuess = "";
	this.countEven = 0;

	removeBtn.resetBtn();
	elementsGame.elements.btnReset.classList.add('hide');
	elementsGame.elements.lucky.classList.add('hide');
	elementsGame.elements.btnStart.classList.remove('trans');
	elementsGame.elements.containerCards.innerHTML = "";
	elementsGame.elements.indices.innerHTML = "";
};


// Display Indices
Game.prototype.indices = function () {
	for (let index = 0; index < this.tipsPresident.length; index++) {
		let tipsHtml = '<div class="' + this.tipsPresident[index] + ' indice hide"></div>';
		indices.innerHTML += tipsHtml;
	}
}
let tipIndices = new Game();


// Manage displaying Cards
Game.prototype.clickCard = function () {
	// Make a shallow copy of cardImage to add classes back
	let cards = [...elementsGame.elements.cardImage],
	flippedCards,
	firstCard,
	secondCard,
	countEven = 0,
	duration = this.duration;
	cards.forEach( function (mask) {
		mask.addEventListener('click', function () {
			numberOfClick++;
			mask.classList.add('back');
			flippedCards = cards.filter(card => card.classList.contains('back'));
			if (flippedCards.length === 2){
				elementsGame.elements.containerCards.classList.add('disabled');
				firstCard = flippedCards[0];
				secondCard = flippedCards[1];
				if(firstCard.dataset.id === secondCard.dataset.id){
					tipsMatched.indicesMatched();
					countEven++;
					points = Math.min(1000, points + 20);
					setTimeout(() => {
						firstCard.parentNode.classList.add('matched');
						secondCard.parentNode.classList.add('matched');
					}, duration);

					setTimeout(()=> {
						firstCard.classList.remove('back');
						secondCard.classList.remove('back');
					}, duration);
					if (countEven === 7) {
						uWin.resetWin();
					}
				}
				else {
					points = Math.max(0, points - 30);
					setTimeout(() => {
						firstCard.classList.remove('back');
						secondCard.classList.remove('back');
					}, duration);
				}
				flippedCards.length = 0;
				setTimeout(() => {
					elementsGame.elements.containerCards.classList.remove('disabled');
				}, duration);
			}
		});
	});
};
let clickOnCard = new Game();


Game.prototype.indicesMatched = function () {
	let numRandomTips = Math.floor(Math.random() * 4);
	const displayTips = document.querySelector('.' + this.tipsPresident[numRandomTips] + '');
	displayTips.classList.remove('hide');
	displayTips.innerHTML = elementsGame.elements.tipsArray[numRandomTips];
};
let tipsMatched = new Game();


Game.prototype.stopEvent = function() {
	elementsGame.elements.containerCards.classList.add('disabled');

	setTimeout(() => {
		elementsGame.elements.containerCards.classList.remove('disabled');
	}, this.duration);
}
let disableDeck = new Game();


Game.prototype.redirectMore = function () {
	window.open(president.url, '_blank');
};


/**
 *
 * @param {number} n
 * @description When click on "Recommencer"
 */
Game.prototype.startAgain = function (n) {
	points = 1000;
	this.userGuess = "";
	this.countEven = 0;
	numberOfClick = 0;

	n = Math.floor(Math.random() * 25);
	randomPhotos.shufflePhotos(n);

	timerClock.timerGame();

	for (let index = 0; index < this.tipsPresident.length; index++) {
		let tipsHtml = document.querySelector('.' + this.tipsPresident[index] + '');
		tipsHtml.classList.add('hide');
	}

	removeBtn.resetBtn();
	elementsGame.elements.luckyInput.disabled = false;

	shuffle(medals);

	displayPresidentOfCards.displayPresident();
	clickOnCard.clickCard();
};
