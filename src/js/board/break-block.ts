// Generates two new blocks when an assist is used to break up a larger block

import { NewBlockDataModel } from '../../models/new-block-data-model';

export const breakBlock = (target: HTMLElement) => {
    const row = Number(target.dataset.row);
    let colour: string = '';
    if (target.dataset.colour) {
        colour = target.dataset.colour
    };
    const size: number = Number(target.dataset.size);
    const gridColumn: number = Number(target.parentElement?.style.gridColumnStart);
    const newBlocksData: NewBlockDataModel[] = [];

    const generateBlockData = (newBlockSizes: number[]) => {
        let colCounter = 0;
        for (let i = 0; i < newBlockSizes.length; i++) {
            const gridPosition = {
                gridColumn: `${gridColumn + colCounter} / ${gridColumn + colCounter + newBlockSizes[i]}`,
                gridRow: `${row} / ${row + 1}`
            };
            const newBlock = {
                blockSize: newBlockSizes[i],
                colour: colour,
                row: row,
                gridPosition: gridPosition
            };
            newBlocksData.push(newBlock);
            colCounter += newBlockSizes[i];
        };
    }

    if(size === 2) {
        const newBlockSizes = [1, 1];
        generateBlockData(newBlockSizes);
    };
    if(size === 3) {
        const newBlockSizes = [2, 1];
        generateBlockData(newBlockSizes);
    };
    return newBlocksData;
};