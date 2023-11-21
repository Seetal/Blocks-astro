// Checks if a row is complete post moving a block

export const checkIfRowComplete = (rows: number[]) => {
    const completedRows: number[] = [];
    const addUpRowColourAmount = (rowBlocks: HTMLDivElement[]) => {
        let colourTotals = {};
        rowBlocks.forEach((block: HTMLDivElement) => {
            const colour = block.dataset.colour;
            const size = Number(block.dataset.size);
            // @ts-ignore
            colourTotals[colour] ? colourTotals[colour] += size : colourTotals[colour] = size;
        });
        const colourArray = Object.keys(colourTotals);
        if (colourArray.length === 1) {
            return true;
        } else {
            return false;
        }
    };
    rows.forEach((row: number) => {
        const rowBlocks = document.querySelectorAll(`[data-row="${row}"]`);
        const rowBlocksArray = Array.from(rowBlocks);
        // @ts-ignore
        const isRowComplete = addUpRowColourAmount(rowBlocksArray);
        if (isRowComplete) {
            completedRows.push(row);
        }
    });
    return completedRows;
}