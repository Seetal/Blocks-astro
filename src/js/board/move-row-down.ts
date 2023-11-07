// Move rows above down once a row is completed

export const moveRowDown = (removedRows: number[]) => {
    return new Promise((resolve) => {
        console.log(removedRows);
        // find highest number in removedRows array which will be the lowest row to remove if there are more than 2 removed
        const highestNumberRow: number = Math.max(...removedRows);
        const blockElement: HTMLSpanElement | null = document.querySelector('.-js-blank');
        const blockHeight: number | undefined = blockElement?.offsetHeight;

        // A blank row counter, this counts how many rows have been removed so we know how many rows to transition the previous row blocks by
        let removedRowsCounter: number = 1;

        // Check to see if there are any rows to move move down, if its the top blocks row then nothing to move
        let isRowsToMove: boolean = false;

        const updateRowPositions = (block: HTMLDivElement, counter: number, prevRowLength: number, index: number) => {
            block.addEventListener('transitionend', function() {
                const currentRow: number = Number(block.dataset.row);
                // @ts-ignore
                block.parentNode.style.gridRow = `${currentRow + counter} / ${currentRow + counter + 1}`;
                block.style.transform = '';
                block.style.transition = '';
                block.setAttribute('data-row', `${currentRow + counter}`);
                const lowestRow = Math.min(...removedRows);

                if ((currentRow === lowestRow - 1) && (index === prevRowLength - 1)) {
                    resolve(true);
                }
            }, { once: true });
        }

        for ( let i = highestNumberRow - 1; i > -1; i--) {
            const prevRow: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-row="${i}"]`);
            if(prevRow.length === 0) {
                removedRowsCounter = removedRowsCounter + 1;
            } else {
                isRowsToMove = true;
                prevRow.forEach((block, i) => {
                    // @ts-ignore
                    block.style.transform = `translateY(${(blockHeight * removedRowsCounter) + (2 * removedRowsCounter)}px)`;
                    block.style.transition = `transform .3s ease`;
                    const currentRowCounter = removedRowsCounter; 
                    updateRowPositions(block, currentRowCounter, prevRow.length, i);
                });
            };
            // If it is on the last row and no rows have been moved down then we need to resolve.
            if( i === 0 && !isRowsToMove ) {
                resolve(true);
            }
        };
    });
};