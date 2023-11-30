import { newGame } from './js/new-game/new-game';
import { changeView } from './js/generic/change-view';
import { config } from './js/config';
import { buildBoard } from './js/board/build-board';
import { countdown } from './js/board/countdown';
import { settings } from './js/settings/settings';
import { closeView } from './js/generic/close-view';
import { tabs } from './js/generic/tabs';
import { leaderboard } from './js/leaderboard/leaderboard';
import { views } from './js/views/views';
import { gameOver } from './js/game-over/game-over';
import { submitScore } from './js/game-over/submit-score';

// MODELS

import { ConfigSizeModel } from './models/config-size-model';

//serverlessTest();
const selectedSize: ConfigSizeModel = config.sizes.medium;
buildBoard(selectedSize);
settings.getLocalSettings();
settings.updateDarkMode();
settings.updateShowShapes();
closeView();
leaderboard.getLocalScores();
leaderboard.getGlobalTopTenScores();
gameOver.setupGameOverEventListeners();

// home view buttons
const newGameButton = document.querySelector('[data-start-btn]');
const settingsButton = document.querySelector('[data-settings-btn]');
const leaderboardButton = document.querySelector('[data-leaderboard-btn]');

newGameButton?.addEventListener('click', function() {
    (async function() {
        const value = await changeView(views.homePageView, views.gameView);
        const count = await countdown();
        newGame.startNewGame();
    })();
});

settingsButton?.addEventListener('click', function() {
    (async function() {
        const value = await changeView(views.homePageView, views.settingsView);
    })();
});

leaderboardButton?.addEventListener('click', function() {
    (async function() {
        const value = await changeView(views.homePageView, views.leaderboardView);
        tabs();
    })();
});
