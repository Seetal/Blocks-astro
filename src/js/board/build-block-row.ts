// Builds a row of block to be added to board
import { createBlock } from './create-block';

// TYPES / MODELS imports

import { ConfigSizeModel } from '../../models/config-size-model';
import { ConfigColoursModel } from '../../models/config-colours-model';
import { GridRowDetailsModel } from '../../models/grid-row-details-model';
import { BlockSizeColour } from '../../models/block-size-colour-model';

type ColorCounter = { [key: string]: number };
interface BlockRowModel {
    html: string;
    rowState: BlockSizeColour[];
}

export const buildBlockRow = (rowBlockNumbers: number [], colours: ConfigColoursModel, gridRowDetails: GridRowDetailsModel, selectedSize: ConfigSizeModel) => {

    const blockRow: BlockRowModel = {
        html: ``,
        rowState: []
    };
    let gridColPositionCounter = 0;
    let colourList = colours;
    const colourCounter: ColorCounter = {};

    function getRandomColourNumber() {
        const randomNumber = Math.floor(Math.random() * colourList.length);
        const colour = colourList[randomNumber];
        return colour;
    }

    rowBlockNumbers.forEach((number) => {
        // get a random number to select a colour from config file
        let selectedColour = getRandomColourNumber();

        // To avoid getting a full row of same colour, filter out the colour from the colourList array
        if (colourCounter[selectedColour] > (selectedSize.columns - 4) && number === 3) {
            colourList = colourList.filter(colour => colour !== selectedColour);
            selectedColour = getRandomColourNumber();
        } else if (colourCounter[selectedColour] > (selectedSize.columns - 3)) {
            colourList = colourList.filter(colour => colour !== selectedColour);
            selectedColour = getRandomColourNumber();
        }

        colourCounter[selectedColour] = (colourCounter[selectedColour]+number) || number;

        // work out grid position based on length of block and position in rowBlockNumbers array
        const gridPosition = { gridColumn: `${gridColPositionCounter + 1} / ${gridColPositionCounter + 1 + number}`, gridRow: gridRowDetails.gridRowPosition };
        const newBlock = createBlock(number, selectedColour, gridPosition, gridRowDetails.row);
        blockRow.html += newBlock;
        blockRow.rowState.push({ size: number, colour: selectedColour });

        // accumulate counter to get position for next block
        gridColPositionCounter += number;
    })
    return blockRow;
}