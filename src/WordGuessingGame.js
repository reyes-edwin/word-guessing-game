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
  }

  static get properties() {
    return {
      date: { type: String },
      endpoint: { type: String },
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
    return fetch(`${this.endpoint}`).then(resp => resp.json());
  }

  render() {
    return html``;
  }
}

customElements.define(WordGuessingGame.tag, WordGuessingGame);
