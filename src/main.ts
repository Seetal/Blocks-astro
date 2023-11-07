import { newGame } from './js/new-game/new-game';
import { changeView } from './js/generic/change-view';
import { config } from './js/config';
import { buildBoard } from './js/board/build-board';
import { countdown } from './js/board/countdown';
import { settings } from './js/settings/settings';

// MODELS

import { ConfigSizeModel } from './models/config-size-model';

const selectedSize: ConfigSizeModel = config.sizes.medium;
buildBoard(selectedSize);
settings.getLocalSettings();
settings.updateDarkMode();
settings.updateShowShapes();


// get view elements
const homePageView: HTMLElement | null = document.querySelector('[data-home-view]');
const gameView: HTMLElement | null = document.querySelector('[data-game-view]');
const settingsView: HTMLElement | null = document.querySelector('[data-settings-view]');

// home view buttons
const newGameButton = document.querySelector('[data-start-btn]');
const settingsButton = document.querySelector('[data-settings-btn]');

const closeSettingsView = document.querySelector('[data-close-settings]');

newGameButton?.addEventListener('click', function() {
    (async function() {
        const value = await changeView(homePageView, gameView);
        const count = await countdown();
        newGame();
    })();
})

settingsButton?.addEventListener('click', function() {
    (async function() {
        const value = await changeView(homePageView, settingsView);
    })();
})

closeSettingsView?.addEventListener('click', function() {
    (async function() {
        const value = await changeView(settingsView, homePageView);
    })();
})
