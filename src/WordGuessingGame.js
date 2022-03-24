import { html, css, LitElement } from 'lit';
import '@lrnwebcomponents/simple-colors';

class WordGuessingGame extends LitElement {
  static get tag() {
    return 'word-guess-game';
  }

  constructor() {
    super();
    this.count = 100;
    this.seed = null;
    this.wordArr = [];
  }

  static get properties() {
    return {
      count: { type: String, reflect: true },
      seed: { type: String },
      wordArr: {type: Array},
    };
  }

  firstUpdated() {
    if (this.seed === null) {
      this.seed = Math.random().toString(36).substring(2, 12);
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'count' && this[propName]) {
        this.getData();
      } else if (propName === 'seed' && this[propName]) {
        let seed = 1;
        for (let i = 0; i < this.seed.length; i++) {
          seed *= this.seed.charCodeAt(i);
        }
        seed = seed.toString().substring(1, 4);
        console.log(seed);
        console.log(this.wordArr[seed]);
      }
    });
  }



  async getData() {
    return fetch(`https://random-word-api.herokuapp.com/all`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        return false;
      })
      .then(data => {
        this.wordArr = data.filter(item => item.length === 5);
        let today = new Date().toISOString().slice(0, 10);
        this.seed = today;
        return data;
      });
  }

  render() {
    return html``;
  }
}

customElements.define(WordGuessingGame.tag, WordGuessingGame);
