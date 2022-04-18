import { LitElement, css, html } from 'lit';

export class WordTile extends LitElement {
  static get tag() {
    return 'word-tile';
  }

  constructor() {
    super();
    this.letter = '';
    this.index = 0;
    this.status = '';
  }

  static get properties() {
    return {
      letter: { type: String, reflect: true },
      status: { type: String, reflect: true },
      index: { type: Number, reflect: true },
    };
  }

  static get styles() {
    return [
      css`
        :host{
          display: inline-flex;
        }
        :host([status="correct"]) .tile {
         background-color: #538d4e;
        }
        :host([status="partial"]) .tile {
          background-color: #b59f3b;
        }
        :host([status="incorrect"]) .tile {
          background-color: #3A3A3C;
        }

        .tile {
          font-size: 2em;
          background: none;
          color: white;
          border: 0.05em solid hsl(240, 2%, 23%);
          text-transform: uppercase;
          text-align: center;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          padding: 0;
          width: 1.5em;
          height: 1.5em;
        }
      `,
    ];
  }

  createTile() {
    return html`
      <input
        type="text"
        @input="${this.valueChanged}"
        value="${this.letter}"
        class="tile"
        maxlength="1"
        autofocus
      />
    `;
  }

  

  valueChanged(e) {
    this.letter = this.shadowRoot.querySelector('input').value.toUpperCase();
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'letter') {
        this.dispatchEvent(
          new CustomEvent('letter-changed', {
            detail: this,
          })
        );
      }
    });
  }
  render() {
    return html`${this.createTile()}`;
  }
}
customElements.define(WordTile.tag, WordTile);
