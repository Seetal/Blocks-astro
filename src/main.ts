import { newGame } from './js/new-game/new-game';
import { changeView } from './js/generic/change-view';
import { config } from './js/config';
import { buildBoard } from './js/board/build-board';

// MODELS

import { ConfigSizeModel } from './models/config-size-model';

const selectedSize: ConfigSizeModel = config.sizes.medium;
buildBoard(selectedSize);

// get view elements
const homePageView: HTMLElement | null = document.querySelector('[data-home-view]');
const gameView: HTMLElement | null = document.querySelector('[data-game-view]');

// home view buttons
const newGameButton = document.querySelector('[data-start]');

newGameButton?.addEventListener('click', function() {
    (async function() {
        const value = await changeView(homePageView, gameView);
        value && newGame();
    })();
})
