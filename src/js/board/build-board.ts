// Builds the initial board grid without the blocks

import { ConfigSizeModel } from '../../models/config-size-model';

export const buildBoard = (size: ConfigSizeModel) => {
    const boardElement: HTMLDivElement | null = document.querySelector('[data-board]');
    let blockElements = ``;
    for(let i = 0; i < size.rows; i++) {
        for(let j = 0; j < size.columns; j++) {
            let cellNumber = (i + 1) * (j + 1);
            blockElements += `<span class="-js-blank" style="grid-column: ${j + 1} / ${j + 2}; grid-row: ${i + 1} / ${i + 2}" data-pos="${cellNumber}"></span>`;
        }
    }
    if (boardElement) {
        boardElement.style.gridTemplateColumns = `repeat(${size.columns}, 1fr)`;
        boardElement.innerHTML = blockElements;
    }
}