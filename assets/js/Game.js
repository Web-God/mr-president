import { medals } from './medals';
import { imgPresident } from './presidents';

export function Game(options) {
	// this.playerName = options.playerName;
	// Init Var
	this.cardNumber = 14;
	this.duration = 1000;

	this.hide = (elem) => elem.classList.add('hide');
	this.show = (elem) => elem.classList.remove('hide');

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
		rewards: document.querySelector('.rewards'),
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
	elementsGame.elements.btnStart.addEventListener('click', this.startGame.bind(this));
	elementsGame.elements.btnStartAgain.addEventListener('click', this.startAgain.bind(this));
	elementsGame.elements.btnReset.addEventListener('click', this.resetGame.bind(this));
	elementsGame.elements.luckySubmit.addEventListener('click', this.luckyGuess);
	// Open new tab to Elysée website
	elementsGame.elements.btnSeeMore.addEventListener('click', () => window.open(president.url, '_blank'));
}
let eventsClick = new Game();


let points = 1000,
	numberOfClick = 0,
	clockId;
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
	if (points === 0) {
		uWin.resetWin();
		elementsGame.elements.containerCards.innerHTML = "";
		elementsGame.elements.nbrClick.previousElementSibling.innerHTML = "";
		elementsGame.elements.nbrClick.innerHTML = "Vous avez perdu !<div> " + fullName + "</div> est l'élu";
	}
	elementsGame.elements.scoreDisplay.innerHTML = this.total;
}
let myScore = new Game();


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

/**
 *
 * @param {number} n
 */
Game.prototype.initParams = function (n) {
	this.userGuess = "";
	this.countEven = 0;
	numberOfClick = 0;
	points = 1000;
	n = Math.floor(Math.random() * 25);
	randomPhotos.shufflePhotos(n);
}
let params = new Game();

Game.prototype.init = function (n) {
	params.initParams();
	timerClock.timerGame();
	displayPresidentOfCards.displayPresident();
	clickOnCard.clickCard();
	tipIndices.indices();
	this.hide(elementsGame.elements.title);
}
let initGame = new Game();


// Start Game
Game.prototype.startGame = function (n) {
	initGame.init();
	displayBtn.enableBtn();
	elementsGame.elements.rules.classList.add('close');
	elementsGame.elements.luckyInput.disabled = false;
	elementsGame.elements.btnStart.classList.add('trans');
};

/**
 *
 * @param {number} n
 * @description When click on "Recommencer"
 */
Game.prototype.startAgain = function (n) {
	// Empty container before init
	elementsGame.elements.indices.innerHTML = "";
	elementsGame.elements.luckyInput.disabled = false;
	params.initParams();
	removeBtn.resetBtn();
	initGame.init();
	shuffle(medals);
};


// Display deck cards
Game.prototype.displayPresident = function () {
	for (let i = 0; i < this.cardNumber; i++) {
		let cardHtml = '<div class="card"><img src="' + this.shuffledCards[i].url + '" data-id="' + this.shuffledCards[i].id + '" alt="' + this.shuffledCards[i].title + '" class="card_img"></div>';
		elementsGame.elements.containerCards.innerHTML += cardHtml;
	}
};
let displayPresidentOfCards = new Game();


// When user play again
Game.prototype.resetBtn = function () {
	this.hide(elementsGame.elements.btnStartAgain);
	this.hide(elementsGame.elements.btnSeeMore);
	this.hide(elementsGame.elements.title)
	this.show(elementsGame.elements.luckySubmit)
	elementsGame.elements.luckyError.setAttribute('hidden', '');
	elementsGame.elements.luckyGreets.setAttribute('hidden', '');
	elementsGame.elements.luckyInput.value = "";
	elementsGame.elements.luckyInput.focus();
	elementsGame.elements.containerCards.innerHTML = "";
};
let removeBtn = new Game();


// Reset game on click "Annuler"
Game.prototype.resetGame = function (n) {
	params.initParams();
	resetClock.resetTimer();
	elementsGame.elements.indices.innerHTML = "";
	removeBtn.resetBtn();
	this.hide(elementsGame.elements.btnReset);
	this.hide(elementsGame.elements.lucky);
	this.show(elementsGame.elements.title);
	elementsGame.elements.btnStart.classList.remove('trans');
	elementsGame.elements.containerCards.innerHTML = "";
};

// Reset Game when user won
Game.prototype.resetWin = function () {
	this.show(elementsGame.elements.title);
	elementsGame.elements.luckyGreets.removeAttribute('hidden');
	elementsGame.elements.luckyGreets.classList.remove('close');
	this.show(elementsGame.elements.btnStartAgain);
	this.show(elementsGame.elements.btnSeeMore);
	this.hide(elementsGame.elements.luckySubmit);
	elementsGame.elements.luckyInput.value = "";
	elementsGame.elements.luckyInput.disabled = true;
	elementsGame.elements.luckyError.setAttribute('hidden', '');
	elementsGame.elements.nbrClick.previousElementSibling.innerHTML = "Félicitations";
	elementsGame.elements.nbrClick.innerHTML = "Vous avez élu<div> " + fullName + "</div> avec " + numberOfClick + " clicks";
	elementsGame.elements.rewards.innerHTML = "";
	clearInterval(clockId);
	shuffle(medals);
	// Display HTML for Indices
	for (let index = 0; index < this.tipsPresident.length; index++) {
		let tipsHtml = document.querySelector('.' + this.tipsPresident[index] + '');
		tipsHtml.innerHTML = elementsGame.elements.tipsArray[index];
		this.show(tipsHtml);
	}
};
let uWin = new Game();

// Check if input equal president's name
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


// Enable Buttons
Game.prototype.enableBtn = function () {
	this.show(elementsGame.elements.btnReset);
	this.show(elementsGame.elements.luckySubmit);
	this.show(elementsGame.elements.lucky);
	elementsGame.elements.luckyInput.value = "";
	elementsGame.elements.luckyInput.focus();
};
let displayBtn = new Game();


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
	cards.forEach(function (mask) {
		mask.addEventListener('click', function () {
			const displayRewards = mask.getAttribute("alt");
			numberOfClick++;
			mask.classList.add('back');
			flippedCards = cards.filter(card => card.classList.contains('back'));
			firstCard = flippedCards[0];
			secondCard = flippedCards[1];
			// Display name of rewards
			elementsGame.elements.rewards.innerHTML = displayRewards;
			if (secondCard) {
				elementsGame.elements.rewards.innerHTML = "";
			}
			// If medals matched
			if (flippedCards.length === 2) {
				elementsGame.elements.containerCards.classList.add('disabled');
				if (firstCard.dataset.id === secondCard.dataset.id) {
					tipsMatched.indicesMatched();
					countEven++;
					points = Math.min(1000, points + 20);
					setTimeout(() => {
						firstCard.parentNode.classList.add('matched');
						secondCard.parentNode.classList.add('matched');
					}, duration);

					setTimeout(() => {
						firstCard.classList.remove('back');
						secondCard.classList.remove('back');
					}, duration);
					// If all cards are flipped
					if (countEven === 7) {
						uWin.resetWin();
					}
				}
				// If medals unmatched
				else {
					points = Math.max(0, points - 30);
					setTimeout(() => {
						firstCard.classList.remove('back');
						secondCard.classList.remove('back');
					}, duration);
				}
				// Disabled all cards after 1 pair flipped
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
	this.show(displayTips);
	displayTips.innerHTML = elementsGame.elements.tipsArray[numRandomTips];
};
let tipsMatched = new Game();


Game.prototype.stopEvent = function () {
	elementsGame.elements.containerCards.classList.add('disabled');
	setTimeout(() => {
		elementsGame.elements.containerCards.classList.remove('disabled');
	}, this.duration);
}
let disableDeck = new Game();
