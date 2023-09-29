// Create a function that adds a block, 3 params, size, colour and position

// TYPES / MODELS imports

import { GridBlockPositionModel } from '../../models/gird-block-position-model';

export const createBlock = (blockSize: number, colour: string, position: GridBlockPositionModel, row: number) => {
    return `<div class="block" style="grid-column: ${position.gridColumn}; grid-row: ${position.gridRow};">
                <div class="block__inner -js-block" data-colour="${colour}" data-size="${blockSize}" data-row="${row}"></div>
            </div>`
};