import { LitElement, css, html } from 'lit';

 class WordKeyBoard extends LitElement {
  static get tag() {
    return 'wordle-keyboard';
  }

  constructor() {
    super();
    this.status = '';
  }

  static get properties() {
    return {
      status: { type: String, reflect: true },
  
    };
  }
 
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        
        button.key.correct {
          background-color: #538d4e;
          border-color: #538d4e;
          color: white;

        }
        button.key.partial {
          background-color: #c9b458;
          border-color: #c9b458;
          color: white;

        }
        button.key.incorrect {
          background-color: #787c7e;
          border-color: #787c7e;
          color: white;
        }

        .keyboard {
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(20, minmax(auto, 1.3em));
          grid-auto-rows: 3em;
          gap: 0.25em;
          justify-content: center;
        }
        .key {
          font-size: inherit;
          grid-column: span 2;
          border: none;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #d3d6da;
          color: black;
          fill: black;
          font-weight: bold;
          text-transform: uppercase;
          border-radius: 0.25em;
          cursor: pointer;
          user-select: none;
        }

        .key.large {
          grid-column: span 3;
        }

        .key > svg {
          width: 1.2em;
          height: 1.2em;
        }
      `,
    ];
  }

  createKeyboard() {
    return html` <div data-keyboard class="keyboard">
      <button class="key" data-key="Q">Q</button>
      <button class="key" data-key="W">W</button>
      <button class="key" data-key="E">E</button>
      <button class="key" data-key="R">R</button>
      <button class="key" data-key="T">T</button>
      <button class="key" data-key="Y">Y</button>
      <button class="key" data-key="U">U</button>
      <button class="key" data-key="I">I</button>
      <button class="key" data-key="O">O</button>
      <button class="key" data-key="P">P</button>
      <div class="space"></div>
      <button class="key" data-key="A">A</button>
      <button class="key" data-key="S">S</button>
      <button class="key" data-key="D">D</button>
      <button class="key" data-key="F">F</button>
      <button class="key" data-key="G">G</button>
      <button class="key" data-key="H">H</button>
      <button class="key" data-key="J">J</button>
      <button class="key" data-key="K">K</button>
      <button class="key" data-key="L">L</button>
      <div class="space"></div>
      <button data-enter class="key large">Enter</button>
      <button class="key" data-key="Z">Z</button>
      <button class="key" data-key="X">X</button>
      <button class="key" data-key="C">C</button>
      <button class="key" data-key="V">V</button>
      <button class="key" data-key="B">B</button>
      <button class="key" data-key="N">N</button>
      <button class="key" data-key="M">M</button>
      <button data-delete class="key large">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="var(--color-tone-1)"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>
      </button>
    </div>`;
  }

  render() {
    return html`${this.createKeyboard()}`;
  }
}
customElements.define(WordKeyBoard.tag, WordKeyBoard);
