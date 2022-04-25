import { html, css, LitElement } from 'lit';
// @feedback brings in the game board asset to be built
// this keeps the current element just about starting the game
// and passing the "word" down into the word-game-board tag
import './wordGameBoard.js';

class WordGuessingGame extends LitElement {
  static get tag() {
    return 'word-guess-game';
  }

  constructor() {
    super();
    this.date = new Date().toISOString().slice(0, 10);
    this.endpoint = '../api/getWord';
    // @note just for testing
    this.word = '';
    this.allWords = '';
  }

  static get properties() {
    return {
      date: { type: String, reflect: true },
      endpoint: { type: String },
      word: { type: String },
      allWords: { type: String },
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'date') {
        this.getData(this[propName]);
      }
    });
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin: 10px;
          color: white;
        }
      `,
    ];
  }

  async getData() {
    return fetch(`${this.endpoint}?myDay=${this.date}`)
      .then(resp => resp.json())
      .then(responseData => {
        this.word = responseData.word;
        this.allWords = responseData.allWords;
      });
  }

  render() {
    return html`
      <word-game-board
        .word="${this.word}"
        .allWords="${this.allWords}"
      ></word-game-board>
    `;
  }
}

customElements.define(WordGuessingGame.tag, WordGuessingGame);
