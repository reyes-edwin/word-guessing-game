import { html, css, LitElement } from 'lit';
import './wordStats.js';
import './wordIcon.js';

class WordModel extends LitElement {
  static get tag() {
    return 'wordle-modal';
  }

  constructor() {
    super();
    this.icon = '';
    this.state = 'closed';
  }

  static get properties() {
    return {
      state: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        :host([state='open']) .overlay {
          display: flex;
        }

        .overlay {
          display: none;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.5);
          z-index: 4000;
        }

        .content {
          position: relative;
          border-radius: 8px;
          border: 1px solid #f6f7f8;
          background-color: #ffffff;
          color: #000000;
          box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
          width: 90%;
          max-height: 90%;
          overflow-y: auto;
          animation: SlideIn 500ms;
          max-width: 500px;
          padding: 16px;
          box-sizing: border-box;
        }

        .content.closing {
          animation: SlideOut 500ms;
        }

        .close-icon {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 16px;
          right: 16px;
        }

        game-icon {
          position: fixed;
          user-select: none;
          cursor: pointer;
        }

        @keyframes SlideIn {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }

        @keyframes SlideOut {
          0% {
            transform: translateY(0px);
            opacity: 1;
          }
          90% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: translateY(60px);
          }
        }
      `,
    ];
  }

  //   closes statistic menu
  closeStat(e) {
    this.state = 'closed';
  }

  render() {
    return html`
      <div class="overlay">
        <div class="content">
          <slot>
            <wordle-stats></wordle-stats>
          </slot>
          <div class="close-icon">
            <wordle-icon icon="close" @click="${this.closeStat}"></wordle-icon>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(WordModel.tag, WordModel);
