// https://freefrontend.com/javascript-memory-games/
class MemoryGame {

	constructor() {
		this.duration = 1000;
		this.cardsContainer = document.querySelector('.js-cards');
		this.cards = Array.from(this.cardsContainer.children);
	}

	shuffleCards() {
		this.cards.forEach(card => {
			const randomNumber = Math.floor(Math.random() * this.cards.length) + 1;

			card.classList.remove('has-match');

			setTimeout(() => {
				card.style.order = `${randomNumber}`;
			}, 400);
		})
	}

	checkAllCards() {
		if (!this.cards.every(card => card.classList.contains('has-match'))) return;

		setTimeout(() => {
			this.shuffleCards();
		}, this.duration);
	}

	stopEvent() {
		this.cardsContainer.classList.add('no-event');

		setTimeout(() => {
			this.cardsContainer.classList.remove('no-event');
		}, this.duration);
	}

	checkIfMatched(firstCard, secondCard) {
		if (firstCard.dataset.animal === secondCard.dataset.animal) {
			firstCard.classList.remove('flipped');
			secondCard.classList.remove('flipped');

			firstCard.classList.add('has-match');
			secondCard.classList.add('has-match');

			this.checkAllCards();
		}
		else {
			setTimeout(() => {
				firstCard.classList.remove('flipped');
				secondCard.classList.remove('flipped');
			}, this.duration);
		}
	}

	flip(selectedCard) {
		selectedCard.classList.add('flipped');

		const flippedCards = this.cards.filter(card => card.classList.contains('flipped'));

		if (flippedCards.length === 2) {
			this.stopEvent();
			this.checkIfMatched(flippedCards[0], flippedCards[1]);
		}
	}

}

const game = new MemoryGame;

game.cards.forEach(card => {
	card.addEventListener('click', game.flip.bind(game, card));
})



/**
 *
 * @param {number} longueur
 */
function Ligne(longueur) {
	this.longueur = longueur;
}
Ligne.prototype.taille = function () {
	'Longueur : ' + this.longueur
	console.log("Ligne", this.longueur)
};
let tailleLigne = new Ligne(45);
tailleLigne.taille();


/**
 *
 * @param {number} longueur
 * @param {number} largeur
 */
function Rectangle(longueur, largeur) {
	Ligne.call(this, longueur);
	this.largeur = largeur;
}
Rectangle.prototype = Object.create(Ligne.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.aire = function () {
	tips2.innerHTML =
		'Aire : ' + this.longueur * this.largeur
	console.log("Rectangle", this.longueur * this.largeur)
};
let aireRectangle = new Rectangle(12, 5);
aireRectangle.aire();


function Parallelepipede(longueur, largeur, hauteur) {
	Rectangle.call(this, longueur, largeur);
	this.hauteur = hauteur;
}
Parallelepipede.prototype = Object.create(Rectangle.prototype);
Parallelepipede.prototype.constructor = Parallelepipede;
Parallelepipede.prototype.volume = function () {
	tips3.innerHTML =
		'Volume : ' + this.longueur * this.largeur * this.hauteur
};

let geo = new Parallelepipede(15, 14, 13);
  // geo.volume();
  // geo.aire();
  // geo.taille();
