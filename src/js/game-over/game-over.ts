import { moveBlock } from '../board/move-block';
import { swipeGestures } from '../board/swipe-gestures';
import { shuffleArray } from '../generic/shuffle-array';
import { score } from '../score/score';
import { leaderboard } from '../leaderboard/leaderboard';
import { assists } from '../assists/assists';
import { views } from '../views/views';
import { changeView } from '../generic/change-view';
import { newGame } from '../new-game/new-game';
import { countdown } from '../board/countdown';
import { config } from '../config';
import { submitScore } from './submit-score';

export const gameOver = {
    boardElement: document.querySelector('[data-board]'),
    gameOverPanel: document.querySelector('[data-game-over-panel]'),
    enterLeadeboardPanel: document.querySelector('[data-enter-global-leaderboard]'),
    gameOverButtons: document.querySelector('[data-game-over-buttons]'),
    initGameOver: function() {
        this.removeListeners();
        this.transitionBlocksOff();
        this.updateGameOverPanelScore();
        leaderboard.updateScores(score.currentScore);
        this.checkIfScoreQualifies();
    },
    removeListeners: function() {
        moveBlock.removeMoveEventListener();
        swipeGestures.removeTouchStartListener();
        swipeGestures.removeTouchEndListener();
    },
    clearGame: function() {
        score.resetScore();
        assists.resetAssists();
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.remove();
        });
    },
    setupGameOverEventListeners: function() {
        const startNewGameButton = document.querySelector('[data-new-game-btn]');
        const quitButton = document.querySelector('[data-quit-btn]');
        startNewGameButton?.addEventListener('click', function() {
            gameOver.clearGame();
            gameOver.closeGameOverPanel(true);
        });
        quitButton?.addEventListener('click', function() {
            gameOver.clearGame();
            gameOver.closeGameOverPanel();
            changeView(views.gameView, views.homePageView);
        });
    },
    transitionBlocksOff: function() {
        const allBlocks: NodeListOf<HTMLDivElement> = document.querySelectorAll('.-js-block');
        const allBlocksArray: HTMLDivElement[] = Array.from(allBlocks);
        const shuffledBlocks = shuffleArray(allBlocksArray);
        shuffledBlocks.forEach((block, i) => {
            setTimeout(function() {
                block.classList.add('faded');
                if (i === shuffledBlocks.length - 1) {
                    gameOver.checkForFinalBlockTransitionEnd(block);
                }
            }, i * 70);
        })
    },
    checkForFinalBlockTransitionEnd: function(block: HTMLDivElement) {
        block.addEventListener('transitionend', () => {
            this.openGameOverPanel();
        }, { once: true });
    },
    openGameOverPanel: function() {
        this.gameOverPanel?.classList.remove('hide');
        setTimeout(() => {
            this.gameOverPanel?.classList.remove('fade-off');
            this.gameOverPanel?.classList.add('fade-on');
        }, 10);
    },
    closeGameOverPanel: function(startNewGame = false) {
        this.gameOverPanel?.classList.remove('fade-on');
        this.gameOverPanel?.classList.add('fade-off');
        this.gameOverPanel?.addEventListener('transitionend', () => {
            this.gameOverPanel?.classList.add('hide');
            this.gameOverButtons?.classList.remove('active');
            if(startNewGame) {
                (async function() {
                    const count = await countdown();
                    newGame.startNewGame();
                })();
            };
        }, { once: true });
    },
    updateGameOverPanelScore: function() {
        const scoreElement = document.querySelector('[data-game-over-score]');
        // @ts-ignore
        scoreElement.textContent = score.currentScore.toString();
    },
    // Check if score qualifies for global leaderboard
    checkIfScoreQualifies: async function() {
        const lowestScoreData = await fetch('/.netlify/functions/getLowestScore', {
            method: 'GET'
        });
        const numberOfRowsData = await fetch('/.netlify/functions/getNumberOfRows', {
            method: 'GET'
        });
        const lowestScore = await lowestScoreData.json();
        const numberOfRows = await numberOfRowsData.json();
        console.log(lowestScore, numberOfRows[0].number_of_rows);
        if (score.currentScore === 0) {
            this.gameOverButtons?.classList.add('active');
            return;
        };
        if (Number(numberOfRows[0].number_of_rows) < config.globalLeaderboardScores) {
            this.enterLeadeboardPanel?.classList.add('active');
            return;
        };
        if (score.currentScore > lowestScore[0].score) {
            this.enterLeadeboardPanel?.classList.add('active');
            submitScore.setRemoveScore(lowestScore[0].id);
            return;
        };
        this.gameOverButtons?.classList.add('active');
    }
};