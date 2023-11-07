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
    const selectedSize: ConfigSizeModel = config.sizes.medium;
    emptyRowState.setCurrentEmptyRow(selectedSize.rows - selectedSize.startingRows);
    startingBlockRows(selectedSize, config.colours);
    assists.refreshAssists();
    moveBlock.setupMoveEventListener();
    createRowInterval.setTimer();
    swipeGestures.setupTouchStartListener();
    swipeGestures.setupTouchEndListener();
    //swipeGestures.setupTouchMoveListener();
}