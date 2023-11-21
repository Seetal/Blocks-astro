import { moveBlock } from '../board/move-block';
import { swipeGestures } from '../board/swipe-gestures';
import { shuffleArray } from '../generic/shuffle-array';
import { score } from '../score/score';
import { leaderboard } from '../leaderboard/leaderboard';
import { assists } from '../assists/assists';
import { views } from '../views/views';
import { changeView } from '../generic/change-view';

export const gameOver = {
    boardElement: document.querySelector('[data-board]'),
    gameOverPanel: document.querySelector('[data-game-over-panel]'),
    initGameOver: function() {
        console.log('GAME OVER');
        this.removeListeners();
        this.transitionBlocksOff();
        this.setupGameOverEventListeners();
        this.updateGameOverPanelScore();
        leaderboard.updateScores(score.currentScore);
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
            console.log('New Game');
            gameOver.clearGame();
        });
        quitButton?.addEventListener('click', function() {
            console.log('Quit Game');
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
    closeGameOverPanel: function() {
        this.gameOverPanel?.classList.remove('fade-on');
        this.gameOverPanel?.classList.add('fade-off');
        this.gameOverPanel?.addEventListener('transitionend', () => {
            this.gameOverPanel?.classList.add('hide');
        }, { once: true });
    },
    updateGameOverPanelScore: function() {
        const scoreElement = document.querySelector('[data-game-over-score]');
        // @ts-ignore
        scoreElement.textContent = score.currentScore.toString();
    }
};