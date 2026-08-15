import { createElement } from './utils/dom.js';

const UI = {
  cardsContainer: null,
};

class Card {
  constructor(id, img, alt, title, descriptions, btnText, parentSelector) {
    this.id = id;
    this.img = img;
    this.alt = alt;
    this.title = title;
    this.descriptions = descriptions;
    this.btnText = btnText;
    this.parent = document.querySelector(parentSelector);
  }

  createCard() {
    // Card container
    const card = createElement('article', {
      classes:
        'w-full flex flex-col max-w-sm p-2 pb-6 rounded bg-slate-800 text-slate-300 opacity-0',
    });

    // div with image
    const imageDiv = createElement('div', {
      classes: 'aspect-video rounded overflow-hidden',
      children: [
        createElement('img', {
          classes:
            'object-cover w-full h-full transition duration-300 hover:scale-105',
          attrs: {
            src: this.img,
            alt: this.alt,
          },
        }),
      ],
    });

    console.log(imageDiv);

    // Content
    const contentDiv = createElement('div', {
      classes: 'flex flex-col p-4',
    });
    // Content heading
    const heading = createElement('h2', {
      classes: 'mb-4 text-2xl font-semibold',
      text: this.title,
    });

    // Content descriptions
    const descriptions = createElement('div', {
      classes: 'mb-6 text-base space-y-3',
    });

    // Filling descriptions
    this.descriptions.forEach((description) => {
      const paragraph = createElement('p', { text: description });
      descriptions.appendChild(paragraph);
    });

    const btnContainer = createElement('div', { classes: 'px-4 mt-auto' });
    // Button
    const button = createElement('button', {
      classes:
        'transition duration-200 mt-auto px-4 py-2 w-full bg-slate-900 hover:bg-slate-950 cursor-pointer',
      attrs: { type: 'button' },
      text: this.btnText,
    });

    btnContainer.appendChild(button);

    // Filling content div
    contentDiv.appendChild(heading);
    contentDiv.appendChild(descriptions);

    // Filling card
    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    card.appendChild(btnContainer);

    return card;
  }

  render() {
    const card = this.createCard();

    this.parent.appendChild(card);

    setTimeout(() => {
      card.classList.add('show-up');
    }, 400 * this.id);
  }
}

function init() {
  UI.cardsContainer = document.querySelector('#cards');

  UI.cardsContainer.replaceChildren();

  fetch('./src/data/cards.json')
    .then((res) => res.json())
    .then((cards) => {
      cards
        .sort((a, b) => a.id - b.id)
        .forEach((card) => {
          new Card(
            card.id,
            card.img,
            card.alt,
            card.title,
            card.description,
            card.btnText,
            '#cards',
          ).render();
        });
    });
}

init();
