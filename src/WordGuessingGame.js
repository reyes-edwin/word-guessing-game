import { html, css, LitElement } from 'lit';
// @feedback brings in the game board asset to be built
// this keeps the current element just about starting the game
// and passing the "word" down into the word-game-board tag
import "./wordGameBoard.js";

class WordGuessingGame extends LitElement {
  static get tag() {
    return 'word-guess-game';
  }

  constructor() {
    super();
    this.date = new Date().toISOString().slice(0, 10);
    this.endpoint = '../api/getWord';
    // @note just for testing
    this.word = 'lambs';
  }

  static get properties() {
    return {
      date: { type: String, reflect: true },
      endpoint: { type: String },
      word: { type: String },
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
    return [css`
    :host {
      display: block;
      border: 1px solid white;
      margin: 10px;
      color: white;
    }`];
  }
  

  async getData() {
    return fetch(`${this.endpoint}?myDay=${this.date}`)
      .then(resp => resp.json())
      .then(responseData => {
        this.word = responseData.word;
      });
  }

  render() {
    return html`date: ${this.date}. word:${this.word}
    <word-game-board word="${this.word}"></word-game-board>
    `;
  }
}

customElements.define(WordGuessingGame.tag, WordGuessingGame);
