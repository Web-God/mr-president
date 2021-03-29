import { medals } from './medals';
import { imgPresident } from './presidents';
import { women } from './presidents';

export function Game(options) {
	// this.playerName = options.playerName;
	// Init Var
	this.cardNumber = 14;
	this.duration = 1000;

	this.hide = elem => elem.classList.add('hide');
	this.show = elem => elem.classList.remove('hide');

	// Shuffle photos & cards
	this.shuffledCards = shuffle(medals);
	this.shufflePresident = shuffle(imgPresident);
	this.tipsPresident = Object.keys(this.shufflePresident[0].indice);

	this.emptyInput = (e, w) => {
		w = Math.floor(Math.random() * 24);
		if (e.target && elementsGame.elements.luckyInput.value !== "") {
			elementsGame.elements.luckyInput.setAttribute('placeholder', shuffle(women)[w]);
			elementsGame.elements.luckyInput.value = "";
			elementsGame.elements.luckyError.setAttribute('hidden', '');
		}
	}
	this.lostGame = () => {
			this.resetWin();
			elementsGame.elements.containerCards.innerHTML = "";
			elementsGame.elements.nbrClick.previousElementSibling.innerHTML = "";
			elementsGame.elements.nbrClick.innerHTML = "Vous avez perdu !<div> " + randomPhotos.fullName + "</div> est élu";
	}
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
		// Declare variables Title President's names
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
	elementsGame.elements.luckySubmit.addEventListener('click', this.luckyGuess.bind(randomPhotos));
	elementsGame.elements.luckyInput.addEventListener('click', this.emptyInput.bind(this));
	// Open new tab to Elysée website
	elementsGame.elements.btnSeeMore.addEventListener('click', () => window.open(randomPhotos.locationUrl, '_blank'));
}

let points = 1000,
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
		elementsGame.elements.clock.innerHTML = this.minutes + 'm ' + this.seconds + 's';
		if(this.minutes >= 2){
			this.lostGame();
		}
		this.scoreTotal();
	}, this.duration);
};

Game.prototype.resetTimer = function () {
	points = 1000;
	this.seconds = 0;
	this.minutes = 0;
	clearInterval(clockId);
	elementsGame.elements.scoreDisplay.innerHTML = points + " points";
	elementsGame.elements.clock.innerHTML = this.minutes + 'm ' + this.seconds + 's';
}

/**
 * @description Random President's pics
 * @param {number} n
 */
Game.prototype.shufflePhotos = function (n) {
	this.president = this.shufflePresident[n];
	this.fullName = this.president.name.toLowerCase();
	this.lastName = this.president.lastName.toLowerCase();
	const stylesPres = {
		backgroundImage: "url(" + this.president.src + ")",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat"
	}
	Object.assign(elementsGame.elements.fotoPresident.style, stylesPres);
	// Display title
	elementsGame.elements.titleName.innerHTML = this.fullName;
	elementsGame.elements.titleMandat.innerHTML = this.president.mandat;
	// Display indice
	elementsGame.elements.tipsArray = Object.values(this.president.indice);
	// URL to Elysée website
	this.locationUrl = this.president.url;
}
let randomPhotos = new Game();
randomPhotos.shufflePhotos(0);

/**
 * @param {number} n
 */
Game.prototype.initParams = function (n) {
	points = 1000;
	n = Math.floor(Math.random() * 25);
	randomPhotos.shufflePhotos(n);
}

Game.prototype.init = function (n) {
	this.initParams();
	this.timerGame();
	this.displayCards();
	this.clickCard();
	this.indices();
	this.hide(elementsGame.elements.title);
}

// Start Game on click "Commencer"
Game.prototype.startGame = function (n, w) {
	w = Math.floor(Math.random() * 24);
	this.init();
	this.enableBtn();
	elementsGame.elements.luckyInput.setAttribute('placeholder', shuffle(women)[w]);
	elementsGame.elements.rules.classList.add('close');
	elementsGame.elements.luckyInput.disabled = false;
	elementsGame.elements.btnStart.classList.add('trans');
};

/**
 * @param {number} n
 * @description When click on "Recommencer"
 */
Game.prototype.startAgain = function (n) {
	// Empty container before init
	elementsGame.elements.indices.innerHTML = "";
	elementsGame.elements.luckyInput.disabled = false;
	this.initParams();
	this.resetBtn();
	this.init();
	shuffle(medals);
};

// Display deck cards
Game.prototype.displayCards = function () {
	for (let i = 0; i < this.cardNumber; i++) {
		let cardHtml = '<div class="card"><img src="' + this.shuffledCards[i].url + '" data-id="' + this.shuffledCards[i].id + '" alt="' + this.shuffledCards[i].title + '" class="card_img"></div>';
		elementsGame.elements.containerCards.innerHTML += cardHtml;
	}
};

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
	shuffle(medals);
};

// Reset game on click "Annuler"
Game.prototype.resetGame = function (n) {
	this.initParams();
	this.resetTimer();
	elementsGame.elements.indices.innerHTML = "";
	this.resetBtn();
	this.hide(elementsGame.elements.btnReset);
	this.hide(elementsGame.elements.lucky);
	this.show(elementsGame.elements.title);
	elementsGame.elements.btnStart.classList.remove('trans');
	elementsGame.elements.containerCards.innerHTML = "";
	elementsGame.elements.rewards.innerHTML = "";
};

// Enable Buttons
Game.prototype.enableBtn = function () {
	this.show(elementsGame.elements.btnReset);
	this.show(elementsGame.elements.luckySubmit);
	this.show(elementsGame.elements.lucky);
	elementsGame.elements.luckyInput.value = "";
	elementsGame.elements.luckyInput.focus();
};

// Display Indices
Game.prototype.indices = function () {
	for (let index = 0; index < this.tipsPresident.length; index++) {
		let tipsHtml = '<div class="' + this.tipsPresident[index] + ' indice hide"></div>';
		indices.innerHTML += tipsHtml;
	}
}

// Manage displaying Cards
Game.prototype.clickCard = function () {
	// Make a shallow copy of cardImage to add classes back
	let cards = [...elementsGame.elements.cardImage],
		flippedCards,
		firstCard,
		secondCard;
	this.numberOfClick = 0;
	this.countEven = 0;
	cards.forEach((mask) => {
		mask.addEventListener('click', () => {
			const displayRewards = mask.getAttribute("alt");
			this.numberOfClick++;
			mask.classList.add('back');
			flippedCards = cards.filter(card => card.classList.contains('back'));
			firstCard = flippedCards[0];
			secondCard = flippedCards[1];
			// Display name of rewards in left sidebar
			elementsGame.elements.rewards.innerHTML = displayRewards;
			if (secondCard) {
				elementsGame.elements.rewards.innerHTML = "";
			}
			// If medals matched
			if (flippedCards.length === 2) {
				if (firstCard.dataset.id === secondCard.dataset.id) {
					this.indicesMatched();
					this.countEven++;
					points = Math.min(1000, points + 20);
					setTimeout(() => {
						firstCard.parentNode.classList.add('matched');
						secondCard.parentNode.classList.add('matched');
					}, this.duration);

					setTimeout(() => {
						firstCard.classList.remove('back');
						secondCard.classList.remove('back');
					}, this.duration);
					// If all cards are flipped
					if (this.countEven === (this.cardNumber / 2)) {
						this.resetWin();
					}
				}
				// If medals unmatched
				else {
					points = Math.max(0, points - 30);
					setTimeout(() => {
						firstCard.classList.remove('back');
						secondCard.classList.remove('back');
					}, this.duration);
				}
				// Disabled cards container after 1 pair flipped
				this.stopEvent();
			}
		});
	});
	// Link randomPhotos to retrieve this.fullName from shufflePhotos
}.bind(randomPhotos);

Game.prototype.indicesMatched = function () {
	let numRandomTips = Math.floor(Math.random() * 4);
	const displayTips = document.querySelector('.' + this.tipsPresident[numRandomTips] + '');
	this.show(displayTips);
	displayTips.innerHTML = elementsGame.elements.tipsArray[numRandomTips];
};

Game.prototype.stopEvent = function () {
	elementsGame.elements.containerCards.classList.add('disabled');
	setTimeout(() => {
		elementsGame.elements.containerCards.classList.remove('disabled');
	}, this.duration);
}

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
	elementsGame.elements.nbrClick.innerHTML = "Vous avez élu<div> " + this.fullName + "</div> avec " + this.numberOfClick + " clicks";
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

// Check if input equal president's name
Game.prototype.luckyGuess = function (e) {
	e.preventDefault();
	let userGuess = (elementsGame.elements.luckyInput.value).toLowerCase();
	if (userGuess.includes(this.fullName) || userGuess.includes(this.lastName)) {
		this.resetWin();
		elementsGame.elements.luckyError.setAttribute('hidden', '');
		elementsGame.elements.containerCards.innerHTML = "";
	}
	else {
		elementsGame.elements.luckyError.removeAttribute('hidden');
		points = points - 150;
	}
}

Game.prototype.scoreTotal = function () {
	this.pts = 555;
	points = Math.max(0, points - 1);
	this.total = points + " points";
	if (points === 0) {
		this.lostGame();
	}
	elementsGame.elements.scoreDisplay.innerHTML = this.total;
}.bind(randomPhotos)
