import { LitElement, css, html } from 'lit';
import './wordTile';

// @feedback I've only stubbed this out
// but most likely you'll have something like
// word-game-board: which checks how the user is doing  
// word-key-entry: an input field, though could be part of the row
// word-key-row: a row of key entries

export class WordGameBoard extends LitElement {
  constructor() {
    super();
    this.word = '';
    this.guesses = [
      ['L','A','M','B',''],
      ['','','','','',''],
      ['','','','','',''],
      ['','','','','',''],
      ['','','','','',''],
      ['','','','','',''],
    ];
  }
  static get tag() {
    return 'word-game-board';
  }
  static get properties() {
    return {
      word: { type: String },
      letter: { type: String },
      guesses: { type: Array }
    };
  }

  static get styles() {
    return [css`
    :host {
      display: block;
    }
    
    .guess-grid {
        display: grid;
        justify-content: center;
        align-content: center;
        flex-grow: 1;
        grid-template-columns: repeat(5, 4em);
        gap: 0.25em;
        margin-bottom: 1em;
      }
    `];
  }

  //   change focus on each letter
  letterChange(e) {
    const node = e.detail;
    const row = parseInt(node.parentElement.getAttribute("data-guess-row"));
    if (this.guesses[row][e.detail.index] !== e.detail.letter) {
      this.guesses[row][e.detail.index] = e.detail.letter;
      if (node && node.nextElementSibling && node.nextElementSibling.shadowRoot && e.detail.letter != '') {
        node.nextElementSibling.shadowRoot.querySelector('input').select();
        node.nextElementSibling.shadowRoot.querySelector('input').focus();
      }
      else if (node && !node.nextElementSibling) {
        // this implies we are at the end of a row
        console.log(this.word);
        console.log(this.guesses[row].join(''));
        const theGuess = this.guesses[row].join('');
        if (theGuess.toLowerCase() === this.word.toLowerCase()) {
          console.log('you win!');
        }
        else if (node.parentElement.nextElementSibling.children) {
          console.log('no match!');
          node.parentElement.nextElementSibling.children[0].shadowRoot.querySelector('input').select();
          node.parentElement.nextElementSibling.children[0].shadowRoot.querySelector('input').focus();
        }
        else {
          console.log('game over');
        }
      }
    }
  }

  render() {
    return html`
    ${this.guesses.map((guess, index) => html`
      <div data-guess-row="${index}" class="guess-grid">
      <word-tile index="0" letter="${guess[0]}" @letter-changed="${this.letterChange}"></word-tile>
      <word-tile index="1" letter="${guess[1]}" @letter-changed="${this.letterChange}"></word-tile>
      <word-tile index="2" letter="${guess[2]}" @letter-changed="${this.letterChange}"></word-tile>
      <word-tile index="3" letter="${guess[3]}" @letter-changed="${this.letterChange}"></word-tile>
      <word-tile index="4" letter="${guess[4]}" @letter-changed="${this.letterChange}"></word-tile>
      </div>
      `)}
       `;
  }
}

customElements.define(WordGameBoard.tag, WordGameBoard);
