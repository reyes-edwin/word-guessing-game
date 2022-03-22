import { html, css, LitElement } from 'lit';
import '@lrnwebcomponents/simple-colors';

class WordGuessingGame extends LitElement {
  constructor() {
    super();
    this.count = 10;
  }

  static get properties() {
    return {
      count: {
        type: Number,
        reflect: true,
      },
    };
  }
}
