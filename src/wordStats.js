import { html, css, LitElement } from 'lit';
import './wordleCountDown.js';

export class WordStats extends LitElement {
  static get tag() {
    return 'wordle-stats';
  }

  constructor() {
    super();
    this.totalGames = window.localStorage.getItem('totalGames');
    this.totalWins = window.localStorage.getItem('totalWins');
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

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 16px;
        }

        h1 {
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 10px;
        }

        #statistics {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .statistic-container {
          flex: 1;
        }

        .second {
          padding-left: 30px;
          padding-right: 30px;
        }

        .statistic-container .statistic {
          font-size: 36px;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          letter-spacing: 0.05em;
          font-variant-numeric: proportional-nums;
        }

        .statistic.timer {
          font-variant-numeric: initial;
        }

        .statistic-container .label {
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .footer {
          display: flex;
          width: 100%;
        }

        .rule {
          margin-left: -16px;
          height: 1px;
          position: absolute;
          width: 100%;
          background-color: #000000;
        }

        .countdown {
          border-right: 1px solid #000000;
          padding-right: 12px;
          width: 50%;
        }

        .share {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 12px;
          width: 50%;
        }

        button#share-button {
          background-color: #538d4e;
          color: #ffffff;
          font-family: inherit;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          border: none;
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          text-transform: uppercase;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
          width: 80%;
          font-size: 16px;
          height: 52px;
          /* -webkit-filter: brightness(100%); */
        }

        button#share-button:hover {
          opacity: 0.9;
        }

        button#share-button game-icon {
          width: 24px;
          height: 24px;
          padding-left: 8px;
        }

        a {
          text-decoration: none;
          color: #ffffff;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <h1>Statistics</h1>
        <div id="statistics">
          <div class="statistic-container">
            <div class="statistic" id="games-played">0</div>
            <div class="label">Played</div>
          </div>

          <div class="statistic-container second">
            <div class="statistic" id="total-wins">0</div>
            <div class="label">Wins</div>
         </div>

          <div class="statistic-container">
            <div class="statistic" id="wins-pct">0</div>
            <div class="label">Win%</div>
          </div>
          
        </div>
        </div>

        <div class="footer">
          <div class="countdown">
            <h1>Next WORDLE</h1>
            <div id="timer">
              <div class="statistic-container">
                <div class="statistic timer">
                  <countdown-timer></countdown-timer>
                </div>
              </div>
            </div>
          </div>

          <div class="share">
            <button id="share-button">
              <a
                href="https://www.github.com/reyes-edwin/word-guessing-game"
                target="_blank"
              >
                Project Repo
              </a>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(WordStats.tag, WordStats);
