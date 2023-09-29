export const moveRowDown = (removedRows: number[]) => {
    // find highest number in removedRows array which will be the lowest row to remove if there are more than 2 removed
    const highestNumberRow: number = Math.max(...removedRows);
    const blockElement: HTMLSpanElement | null = document.querySelector('.-js-blank');
    const blockHeight: number | undefined = blockElement?.offsetHeight;

    // A blank row counter so we now how many rows to transition the previous row blocks by
    let rowCounter: number = 0;

    const updateRowPositions = (block: HTMLDivElement, counter: number) => {
        block.addEventListener('transitionend', function updateGridRow() {
            const currentRow: number = Number(block.dataset.row);
            // @ts-ignore
            block.parentNode.style.gridRow = `${currentRow + counter} / ${currentRow + counter + 1}`;
            block.style.transform = '';
            block.style.transition = '';
            block.setAttribute('data-row', `${currentRow + counter}`);
            block.removeEventListener('transitionend', updateGridRow, false);
        });
    }

    for ( let i = highestNumberRow; i > 0; i--) {
        const prevRow: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-row="${i}"]`);
        if(prevRow.length === 0) {
            rowCounter++;
        } else {
            prevRow.forEach((block) => {
                // @ts-ignore
                block.style.transform = `translateY(${(blockHeight * rowCounter) + (2 * rowCounter)}px)`;
                block.style.transition = `transform .3s ease`;
                const currentRowCounter = rowCounter; 
                updateRowPositions(block, currentRowCounter);
            });
        };
    };
};