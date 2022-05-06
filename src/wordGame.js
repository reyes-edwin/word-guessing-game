import { html, css, LitElement } from 'lit';
import './wordGameBoard.js';

class WordGame extends LitElement {
  static get tag() {
    return 'wordle-game';
  }

  constructor() {
    super();
    this.date = new Date().toISOString().slice(0, 10);
    this.endpoint = '../api/getWord';
    // @note just for testing
    this.word = 'edwin';
    this.allWords = 'edwin, lions, boogy, alpha';
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
        <wordle-game-board
          .word="${this.word}"
          .allWords="${this.allWords}"
        ></wordle-game-board>
    `;
  }
}

customElements.define(WordGame.tag, WordGame);
