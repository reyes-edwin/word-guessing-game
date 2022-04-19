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
    this.allWords = '';
    this.guesses = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    this.status = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
  }
  static get tag() {
    return 'word-game-board';
  }
  static get properties() {
    return {
      word: { type: String },
      allWords: { type: String },
      letter: { type: String },
      guesses: { type: Array },
      status: { type: Array },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin-top: 50px;
        }

        .guess-grid {
          display: grid;
          justify-content: center;
          align-content: center;
          flex-grow: 1;
          grid-template-columns: repeat(5, 1.5em);
          gap: 2em;
          margin-bottom: 1em;
        }
      `,
    ];
  }

  //   change focus on each letter
  letterChange(e) {
    const node = e.detail;
    const row = parseInt(node.parentElement.getAttribute('data-guess-row'));
    if (this.guesses[row][e.detail.index] !== e.detail.letter) {
      this.guesses[row][e.detail.index] = e.detail.letter;
      if (
        node &&
        node.nextElementSibling &&
        node.nextElementSibling.shadowRoot &&
        e.detail.letter != ''
      ) {
        node.nextElementSibling.shadowRoot.querySelector('input').select();
        node.nextElementSibling.shadowRoot.querySelector('input').focus();
      } else if (node && !node.nextElementSibling) {
        // this implies we are at the end of a row
        let theGuess = this.guesses[row].join('');
        let guessWord = this.guesses[row].join('').toLowerCase();

        if (theGuess.toLowerCase() === this.word.toLowerCase()) {
          console.log('you win!');
        }

        // checks if the guessWord is in the word list
        if (!this.allWords.includes(theGuess.toLowerCase())) {
          window.alert('word not in list');
          return;
        }

        if (theGuess.toLowerCase() != this.word.toLowerCase()) {
          node.parentElement.nextElementSibling.children;
          node.parentElement.nextElementSibling.children[0].shadowRoot
            .querySelector('input')
            .select();
          console.log('no match!');
        } else {
          console.log('game over');
          // window.alert('You are out of guess. The word was ' + `${this.word}`);
        }

        // checks if each char & index matches the WOD

        this.word.split('', 5).forEach((char, index) => {

          if (guessWord.incudes(char) && index == 0) {
            this.status[row][0] = 'correct';
          } else {
            this.status[row][0] = 'partial';
          }

          if (guessWord[0].includes(char)) {
            if (index === 0) {
              this.status[row][0] = 'correct';
            } else {
            }
          }

          if (guessWord[1].includes(char)) {
            if (index === 1) {
              this.status[row][1] = 'correct';
            } else {
              this.status[row][1] = 'partial';
            }
          }

          if (guessWord[2].includes(char)) {
            if (index === 2) {
              this.status[row][2] = 'correct';
            } else {
              this.status[row][2] = 'partial';
            }
          }

          if (guessWord[3].includes(char)) {
            if (index === 3) {
              this.status[row][3] = 'correct';
            } else {
              this.status[row][3] = 'partial';
            }
          }

          if (guessWord[4].includes(char)) {
            if (index === 4) {
              this.status[row][4] = 'correct';
            } else {
              this.status[row][4] = 'partial';
            }
          }

          if (!guessWord.includes(char)) {
            this.status[row][index] = 'incorrect';
          }
        });
      }
    }
    this.requestUpdate();
  }

  // deletes user input
  handleDelete(e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
      e.target.currentElementSibling.shadowRoot.querySelector('input').select();
      e.target.previousElementSibling.shadowRoot
        .querySelector('input')
        .select();
    }
  }

  render() {
    return html`
      ${this.guesses.map(
        (guess, index) => html`
          <div data-guess-row="${index}" class="guess-grid">
            <word-tile
              status="${this.status[index][0]}"
              index="0"
              letter="${guess[0]}"
              @letter-changed="${this.letterChange}"
            ></word-tile>
            <word-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][1]}"
              index="1"
              letter="${guess[1]}"
              @letter-changed="${this.letterChange}"
            ></word-tile>
            <word-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][2]}"
              index="2"
              letter="${guess[2]}"
              @letter-changed="${this.letterChange}"
            ></word-tile>
            <word-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][3]}"
              index="3"
              letter="${guess[3]}"
              @letter-changed="${this.letterChange}"
            ></word-tile>
            <word-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][4]}"
              index="4"
              letter="${guess[4]}"
              @letter-changed="${this.letterChange}"
            ></word-tile>
          </div>
        `
      )}
    `;
  }
}

customElements.define(WordGameBoard.tag, WordGameBoard);
