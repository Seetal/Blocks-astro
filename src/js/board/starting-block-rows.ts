import { config } from '../config';
import { generateBlockNumbers } from './generate-block-number';
import { buildBlockRow } from './build-block-row';

// TYPES / MODELS imports

import { ConfigSizeModel } from '../../models/config-size-model';
import { ConfigColoursModel } from '../../models/config-colours-model';

export const startingBlockRows = (selectedSize: ConfigSizeModel, colours: ConfigColoursModel) => {
    const boardElement: HTMLDivElement | null  = document.querySelector('[data-board]');
    let startingRows = ``;
    for (let i = 0; i < selectedSize.startingRows; i++) {
        const gridRowDetails = {
            row: selectedSize.rows - i,
            gridRowPosition: `${selectedSize.rows - i} / ${(selectedSize.rows - i) + 1}`
        };
        const rowBlockNumbers = generateBlockNumbers(config.blockSizes.min, config.blockSizes.max, selectedSize.columns);
        const generateBlocksRow = buildBlockRow(rowBlockNumbers, colours, gridRowDetails, selectedSize);
        startingRows += `${generateBlocksRow.html}`;
    }
    if (boardElement) {
        boardElement.insertAdjacentHTML('beforeend', startingRows);
    }
}