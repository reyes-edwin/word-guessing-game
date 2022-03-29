import { html, css, LitElement } from 'lit';
import '@lrnwebcomponents/simple-colors';

class WordGuessingGame extends LitElement {
  static get tag() {
    return 'word-guess-game';
  }

  constructor() {
    super();
    this.date = new Date().toISOString().slice(0, 10);
    this.endpoint = '../api/getWord';
    this.word = '';
    this.randomWord = '';
  }

  static get properties() {
    return {
      date: { type: String },
      endpoint: { type: String },
      word: { type: String },
      randomWord: { type: String },
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'date') {
        this.getData(this[propName]);
      }
    });
  }

  

  async getData() {
    return fetch(`${this.endpoint}?myDay=${this.date}`)
      .then(resp => resp.json())
      .then(responseData => {
        this.word = responseData.word;
        this.randomWord = responseData.randomWord;
      });
  }

  render() {
    return html`${this.word}, ${this.randomWord}`;
  }
}

customElements.define(WordGuessingGame.tag, WordGuessingGame);
