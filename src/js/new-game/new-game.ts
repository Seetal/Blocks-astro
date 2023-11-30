import { config } from '../config';
import { emptyRowState } from '../board/empty-row-state';
import { startingBlockRows } from '../board/starting-block-rows';
import { moveBlock } from '../board/move-block';
import { createRowInterval } from '../board/create-row-interval';
import { swipeGestures } from '../board/swipe-gestures';
import { assists } from '../assists/assists';
import { submitScore } from '../game-over/submit-score';

// MODELS

import { ConfigSizeModel } from "../../models/config-size-model";

export const newGame =  {
    gameDate: null,
    initGameDate: function() {
        const newDate = new Date();
        this.gameDate = newDate;
    },
    startNewGame: function() {
        this.initGameDate();
        const selectedSize: ConfigSizeModel = config.sizes.medium;
        emptyRowState.setCurrentEmptyRow(selectedSize.rows - selectedSize.startingRows);
        startingBlockRows(selectedSize, config.colours);
        assists.refreshAssists();
        moveBlock.setupMoveEventListener();
        createRowInterval.setTimer();
        swipeGestures.setupTouchStartListener();
        swipeGestures.setupTouchEndListener();
        submitScore.resetSubmitScore();
    }
}