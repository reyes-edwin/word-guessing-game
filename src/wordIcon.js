import { html, css, LitElement } from 'lit';

export class WordIcon extends LitElement {
  static get tag() {
    return 'wordle-icon';
  }

  constructor() {
    super();
    this.icon = '';
  }

  static get properties() {
    return {
      icon: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        wordle-icon {
          position: fixed;
          user-select: none;
          cursor: pointer;
        }
      `,
    ];
  }

  displayIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          fill="#000000"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        ></path>
      </svg>
    `;
  }

  render() {
    return html`${this.displayIcon()}`;
  }
}

customElements.define(WordIcon.tag, WordIcon);
