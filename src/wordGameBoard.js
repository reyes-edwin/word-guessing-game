import { LitElement, css, html } from 'lit';
import './wordTile';
import './wordModal';
import './wordKeyboard';

import ConfettiGenerator from 'confetti-js';

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
    this.letter_state = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
  }
  static get tag() {
    return 'wordle-game-board';
  }

  static get properties() {
    return {
      word: { type: String },
      allWords: { type: String },
      letter: { type: String },
      guesses: { type: Array },
      status: { type: Array },
      letter_state: { type: Array },
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
          grid-template-columns: repeat(5, 1fr);
          grid-gap: 5px;
          padding: 5px 5px 0px 5px;
          box-sizing: border-box;
        }
      `,
    ];
  }

  letterChange(e) {
    const node = e.detail;
    const row = parseInt(node.parentElement.getAttribute('data-guess-row'));

    if (this.guesses[row][e.target.index] !== e.target.letter) {
      this.guesses[row][e.target.index] = e.target.letter;
      if (
        node &&
        node.nextElementSibling &&
        node.nextElementSibling.shadowRoot &&
        e.target.letter != ''
      ) {
        node.nextElementSibling.shadowRoot.querySelector('input').select();
        node.nextElementSibling.shadowRoot.querySelector('input').focus();
        node.setAttribute('letter_state', 'tbd');
        // node.shadowRoot.querySelector('input').classList.add('popIn');
      } else if (node && !node.nextElementSibling) {
        // this implies we are at the end of a row
        let guessWord = this.guesses[row].join('').toLowerCase();
        var confettiSettings = { target: 'my-canvas' };
        var confetti = new ConfettiGenerator(confettiSettings);
        const keyboard = document
          .querySelector('wordle-keyboard')
          .shadowRoot.querySelector('[data-keyboard]');

        const totalGames = window.localStorage.getItem('totalGames') || 0;
        const totalWins = window.localStorage.getItem('totalWins') || 0;

        // start confetti after the tiles animation
        if (guessWord === this.word) {
          window.localStorage.setItem('totalWins', Number(totalWins) + 1);
          window.localStorage.setItem('totalGames', Number(totalGames) + 1);

          setTimeout(() => {
            confetti.render();
          }, 2500);

          setTimeout(() => {
            document
              .querySelector('wordle-modal')
              .setAttribute('state', 'open');
          }, 3500);
        }

        // checks if the guessWord is in the word list
        if (!this.allWords.includes(guessWord)) {
          node.parentElement.children[0].shadowRoot
            .querySelector('input')
            .classList.add('shake');
          node.parentElement.children[1].shadowRoot
            .querySelector('input')
            .classList.add('shake');
          node.parentElement.children[2].shadowRoot
            .querySelector('input')
            .classList.add('shake');
          node.parentElement.children[3].shadowRoot
            .querySelector('input')
            .classList.add('shake');
          node.parentElement.children[4].shadowRoot
            .querySelector('input')
            .classList.add('shake');
          setTimeout(() => {
            node.parentElement.children[0].shadowRoot
              .querySelector('input')
              .classList.remove('shake');
            node.parentElement.children[1].shadowRoot
              .querySelector('input')
              .classList.remove('shake');
            node.parentElement.children[2].shadowRoot
              .querySelector('input')
              .classList.remove('shake');
            node.parentElement.children[3].shadowRoot
              .querySelector('input')
              .classList.remove('shake');
            node.parentElement.children[4].shadowRoot
              .querySelector('input')
              .classList.remove('shake');
          }, 2000);
          return;
        } else if (
          guessWord != this.word.toLowerCase() &&
          this.allWords.includes(guessWord)
        ) {
          if (node.parentElement.nextElementSibling === null) {
            window.alert(
              `Game over! You have run out of guesses. The word was ${this.word}.`
            );
            window.localStorage.setItem('totalGames', Number(totalGames) + 1);
            setTimeout(() => {
              document
                .querySelector('wordle-modal')
                .setAttribute('state', 'open');
            }, 2500);
          } else {
            node.parentElement.nextElementSibling;
            node.parentElement.nextElementSibling.children[0].shadowRoot
              .querySelector('input')
              .select();

            node.parentElement.nextElementSibling.children[0].shadowRoot
              .querySelector('input')
              .focus();
          }
        }

        for (let i = 0; i < 5; i++) {
          let letterPosition = this.word.indexOf(guessWord[i]);
          const element =
            node.parentElement.children[i].shadowRoot.querySelector('input');
          const key = keyboard.querySelector(
            `[data-key="${this.guesses[row][i]}"]`
          );

          element.style.color = 'white';
          element.classList.add('flip-in');

          setTimeout(() => {
            element.classList.remove('flip-in');
            element.classList.add('flip-out');
          }, 450 * i);

          setTimeout(() => {
            element.classList.remove('flip-out');
          }, 1500);

          if (guessWord === this.word) {
            e.target.parentElement.children[i].removeAttribute('letter_state');
            // checks if the letter is in the word
            if (letterPosition === -1) {
              // shades dark
              this.status[row][i] = 'incorrect';
              setTimeout(() => {
                key.classList.add('incorrect');
              }, 2500);
              // if the letter exits and the index are the same
            } else if (guessWord[i] === this.word[i]) {
              // shades green
              this.status[row][i] = 'correct';
              setTimeout(() => {
                key.classList.add('correct');
              }, 2500);
              // the letter exist but index not the same
            } else {
              // shade yellow
              this.status[row][i] = 'partial';
              setTimeout(() => {
                key.classList.add('partial');
              }, 2500);
            }

            // bounce animation
            setTimeout(() => {
              node.parentElement.children[i].shadowRoot
                .querySelector('input')
                .classList.add('bounce');
            }, 2000);
            node.parentElement.children[i].shadowRoot
              .querySelector('input')
              .setAttribute('disabled', 'disabled');

            document
              .querySelector(' wordle-game')
              .shadowRoot.querySelector('wordle-game-board')
              .shadowRoot.querySelector('div')
              .nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[
                i
              ].shadowRoot.querySelector('input')
              .setAttribute('disabled', 'disabled');

            document
              .querySelector(' wordle-game')
              .shadowRoot.querySelector('wordle-game-board')
              .shadowRoot.querySelector('div')
              .nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[
                i
              ].shadowRoot.querySelector('input')
              .setAttribute('disabled', 'disabled');

            document
              .querySelector(' wordle-game')
              .shadowRoot.querySelector('wordle-game-board')
              .shadowRoot.querySelector('div')
              .nextElementSibling.nextElementSibling.nextElementSibling.children[
                i
              ].shadowRoot.querySelector('input')
              .setAttribute('disabled', 'disabled');

            document
              .querySelector(' wordle-game')
              .shadowRoot.querySelector('wordle-game-board')
              .shadowRoot.querySelector('div')
              .nextElementSibling.nextElementSibling.children[
                i
              ].shadowRoot.querySelector('input')
              .setAttribute('disabled', 'disabled');

            document
              .querySelector(' wordle-game')
              .shadowRoot.querySelector('wordle-game-board')
              .shadowRoot.querySelector('div')
              .nextElementSibling.children[i].shadowRoot.querySelector('input')
              .setAttribute('disabled', 'disabled');
          }

          if (guessWord != this.word) {
            e.target.parentElement.children[i].removeAttribute('letter_state');
            // checks if the letter is in the word
            if (letterPosition === -1) {
              // shades dark
              this.status[row][i] = 'incorrect';
              setTimeout(() => {
                key.classList.add('incorrect');
              }, 2500);
              // if the letter exits and the index are the same
            } else if (guessWord[i] === this.word[i]) {
              // shades green
              this.status[row][i] = 'correct';
              setTimeout(() => {
                key.classList.add('correct');
              }, 2500); // the letter exist but index not the same
            } else {
              // shade yellow
              this.status[row][i] = 'partial';
              setTimeout(() => {
                key.classList.add('partial');
              }, 2500);
            }

            node.parentElement.children[i].shadowRoot
              .querySelector('input')
              .setAttribute('disabled', 'disabled');
          }
        }
      }
    }
    this.requestUpdate();
  }

  // deletes user input
  handleDelete(e) {
    // set the input value to empty on each Backspace
    if (e.keyCode == 8 || e.keyCode == 46) {
      e.target.previousElementSibling.shadowRoot
        .querySelector('input')
        .select();
      e.target.shadowRoot.querySelector('input').value = '';
      e.target.parentElement.children[4].shadowRoot.querySelector(
        'input'
      ).value = '';
      e.target.parentElement.children[4].letter = '';
      e.target.removeAttribute('letter_state');
    }
  }

  showStat() {
    const totalGames = window.localStorage.getItem('totalGames') || 0;
    const totalWins = window.localStorage.getItem('totalWins') || 0;
    const winPct = Math.round((totalWins / totalGames) * 100) || 0;

    window.localStorage.setItem('winPercentage', Number(winPct));

    document
      .querySelector('wordle-modal')
      .shadowRoot.querySelector('wordle-stats')
      .shadowRoot.querySelector('div #games-played').textContent =
      window.localStorage.getItem('totalGames');
    document
      .querySelector('wordle-modal')
      .shadowRoot.querySelector('wordle-stats')
      .shadowRoot.querySelector('div #total-wins').textContent =
      window.localStorage.getItem('totalWins');

    document
      .querySelector('wordle-modal')
      .shadowRoot.querySelector('wordle-stats')
      .shadowRoot.querySelector('div #wins-pct').textContent =
      window.localStorage.getItem('winPercentage');

    document
      .getElementById('statistics-button')
      .addEventListener('click', function (e) {
        document.querySelector('wordle-modal').setAttribute('state', 'open');
      });
  }

  timer() {
    // const element = document
    //   .querySelector('wordle-modal')
    //   .shadowRoot.querySelector('wordle-stats')
    //   .shadowRoot.querySelector('countdown-timer').shadowRoot.getElementById('timer');
    //   console.log(element);
    // setInterval(() => {
    //   var toDate = new Date();
    //   var tomorrow = new Date();
    //   tomorrow.setHours(24, 0, 0, 0);
    //   var diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
    //   var diffHr = Math.floor(diffMS / 3600);
    //   diffMS = diffMS - diffHr * 3600;
    //   var diffMi = Math.floor(diffMS / 60);
    //   diffMS = diffMS - diffMi * 60;
    //   var diffS = Math.floor(diffMS);
    //   var result = diffHr < 10 ? '0' + diffHr : diffHr;
    //   result += ':' + (diffMi < 10 ? '0' + diffMi : diffMi);
    //   result += ':' + (diffS < 10 ? '0' + diffS : diffS);
    //   element.innerHTML = result;
    // }, 1000);
  }

  render() {
    return html`
      ${this.timer()} ${this.showStat()}
      ${this.guesses.map(
        (guess, index) => html`
          <div data-guess-row="${index}" class="guess-grid">
            <wordle-tile
              status="${this.status[index][0]}"
              index="0"
              letter="${guess[0]}"
              @letter-changed="${this.letterChange}"
            ></wordle-tile>
            <wordle-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][1]}"
              index="1"
              letter="${guess[1]}"
              @letter-changed="${this.letterChange}"
            ></wordle-tile>
            <wordle-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][2]}"
              index="2"
              letter="${guess[2]}"
              @letter-changed="${this.letterChange}"
            ></wordle-tile>
            <wordle-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][3]}"
              index="3"
              letter="${guess[3]}"
              @letter-changed="${this.letterChange}"
            ></wordle-tile>
            <wordle-tile
              @keydown="${this.handleDelete}"
              status="${this.status[index][4]}"
              index="4"
              letter="${guess[4]}"
              @letter-changed="${this.letterChange}"
            ></wordle-tile>
          </div>
        `
      )}
    `;
  }
}

customElements.define(WordGameBoard.tag, WordGameBoard);
