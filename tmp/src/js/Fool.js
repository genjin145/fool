export default class Fool {
  static cards = ['6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']
  static suit = ['C', 'D', 'H', 'S']; // ♣ ♦ ♥ ♠

  deck = Fool.genereteDeck(Fool.cards, Fool.suit)

  constructor(palyers = 2) {
    this.players = Fool.generetePlayers(palyers);

    this.init();
  }

  init() {
    Fool.shuffleDeck(this.deck);
    this.giveCards(6);
    this.lastCard = this.deck.shift();
    this.trump = Fool.getSuit(this.lastCard);
  }

  giveCards(iterations) {
    for (let i = 0; i < iterations; i++) {
      if (this.deck.length) {
        this.players = this.players.map(player => [...player, this.deck.pop()]);
      } else {
        console.log('Карт больше нет');
        return;
      }
    }
  }

  static getSuit(card) {
    return card.slice(-1);
  }

  static genereteDeck(cards, suit) {
    return suit
      .map(s => cards.map(card => card + s))
      .flat();
  }

  static generetePlayers(max) {
    return new Array(max).fill([]);
  }

  static shuffleDeck(deck) {
    const max = deck.length;

    for (let i = max - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * max);
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
}


// deck.forEach(card => {
//   const div = document.createElement('div');
//   div.style.backgroundImage = `url(img/cards/${card}.png)`;
//   box.appendChild(div);
// });

