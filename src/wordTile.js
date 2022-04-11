import { LitElement, css, html } from 'lit';

export class WordTile extends LitElement {
  static get tag() {
    return 'word-tile';
  }

  constructor() {
    super();
  }

  static get properties() {
    return {
      letter: { type: String },
    };
  }

  static get styles() {
    return [
      css`
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
          transition: transform 250ms linear;
        }
        .guess-grid {
          display: grid;
          justify-content: center;
          align-content: center;
          flex-grow: 1;
          grid-template-columns: repeat(5, 4em);
          grid-template-rows: repeat(6, 4em);
          gap: 0.25em;
          margin-bottom: 1em;
        }
      `,
    ];
  }

  createTile() {
    return html` <div data-guess-grid class="guess-grid">
      <input type="text" class="tile" id="index+1" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
      <input type="text" class="tile" maxlength="1" autofocus />
    </div>`;
  }

  render() {
    return html`${this.createTile()}`;
  }
}
customElements.define(WordTile.tag, WordTile);
