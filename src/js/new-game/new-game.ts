import { config } from '../config';
import { emptyRowState } from '../board/empty-row-state';
import { buildBoard } from '../board/build-board';
import { startingBlockRows } from '../board/starting-block-rows';
import { moveBlock } from '../board/move-block';
import { createRowInterval } from '../board/create-row-interval';
import { swipeGestures } from '../board/swipe-gestures';
import { assists } from '../assists/assists';

// MODELS

import { ConfigSizeModel } from "../../models/config-size-model";

export const newGame = () => {
    const newGameButton = document.querySelector('[data-start]');
    const homePageView = document.querySelector('[data-home-view]');
    const gameView = document.querySelector('[data-game-view]');

    const buildGame = () => {
        const selectedSize: ConfigSizeModel = config.sizes.medium;
        emptyRowState.setCurrentEmptyRow(selectedSize.rows - selectedSize.startingRows);
        buildBoard(selectedSize);
        startingBlockRows(selectedSize, config.colours);
        assists.refreshAssists();
        moveBlock();
        createRowInterval.setTimer();
        swipeGestures();
    }

    newGameButton?.addEventListener('click', () => {
        homePageView?.classList.add('hide');
        gameView?.classList.remove('hide');
        buildGame();
    })
}