import { html, css, LitElement } from 'lit';

export class WordleCountDown extends LitElement {
  static get tag() {
    return 'countdown-timer';
  }

  constructor() {
    super();
  }

  static get properties() {
    return {};
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

  render() {
    return html` <div id="timer">11:59:05</div> `;
  }
}

customElements.define(WordleCountDown.tag, WordleCountDown);
