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
        :host {
          display: inline-flex;
        }
        :host([status='correct']) .tile {
          background-color: #538d4e;
          border-color: #538d4e;
        }
        :host([status='partial']) .tile {
          background-color: #b59f3b;
          border-color: #b59f3b;
        }
        :host([status='incorrect']) .tile {
          background-color: #3a3a3c;
          border-color: #3a3a3c;
        }

        input[type='text']:focus {
          cursor: none;
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

        @keyframes flip-in {
          from {
            transform: rotateX(0deg);
          }
          to {
            transform: rotateX(-90deg);
          }
        }

        @keyframes flip-out {
          from {
            transform: rotateX(-90deg);
          }
          to {
            transform: rotateX(0deg);
          }
        }

        .flip-in {
          animation: flip-in 250ms;
          animation-fill-mode: forwards;
        }

        .flip-out {
          animation: flip-out 250ms;
          animation-fill-mode: forwards;
        }

        .shake {
          animation-name: shake;
          animation-duration: 600ms;
        }

        .bounce {
          animation-name: bounce;
          animation-duration: 1000ms;
        }

        .popIn {
          animation-name: popIn;
          animation-duration: 100ms;
        }

        @keyframes shake {
          10%,
          90% {
            transform: translateX(-1px);
          }

          20%,
          80% {
            transform: translateX(2px);
          }

          30%,
          50%,
          70% {
            transform: translateX(-4px);
          }

          40%,
          60% {
            transform: translateX(4px);
          }
        }

        @keyframes bounce {
          0%,
          20% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          50% {
            transform: translateY(5px);
          }
          60% {
            transform: translateY(-15px);
          }
          80% {
            transform: translateY(2px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes popIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }

          40% {
            transform: scale(1.1);
            opacity: 1;
          }
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
