// Move rows above down once a row is completed

export const moveRowDown = (removedRows: number[]) => {
    return new Promise((resolve) => {
        // find highest number in removedRows array which will be the lowest row to remove if there are more than 2 removed
        const highestNumberRow: number = Math.max(...removedRows);
        const blockElement: HTMLSpanElement | null = document.querySelector('.-js-blank');
        const blockHeight: number | undefined = blockElement?.offsetHeight;

        // A blank row counter, this counts how many rows have been removed so we know how many rows to transition the previous row blocks by
        let removedRowsCounter: number = 1;

        // Check to see if there are any rows to move down, if its the top blocks row then nothing to move
        let isRemoveAnimationInProgress: boolean = false;

        const resolveTransitionEnd = (block: HTMLDivElement, index: number) => {
            block.addEventListener('transitionend', function() {
                
                block.style.transition = '';

                if ((index === 0)) {
                    resolve(true);
                    isRemoveAnimationInProgress = false;
                }
            }, { once: true });
        }

        for ( let i = highestNumberRow - 1; i > -1; i--) {
            const prevRow: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-row="${i}"]`);
            if(prevRow.length === 0) {
                removedRowsCounter = removedRowsCounter + 1;
            } else {
                isRemoveAnimationInProgress = true;
                prevRow.forEach((block, i) => {
                    const currentRow: number = Number(block.dataset.row);
                    // @ts-ignore
                    block.parentNode.style.gridRow = `${currentRow + removedRowsCounter} / ${currentRow + removedRowsCounter + 1}`;
                    block.setAttribute('data-row', `${currentRow + removedRowsCounter}`);
                    // @ts-ignore
                    block.style.transform = `translateY(-${(blockHeight * removedRowsCounter) + (2 * removedRowsCounter)}px)`;
                    setTimeout(function() {
                        block.style.transition = `transform .3s ease`;
                        block.style.transform = '';
                    }, 10);
                    
                    resolveTransitionEnd(block, i);
                });
            };
            // If it is on the last row and no rows have been moved down then we need to resolve.
            if( i === 0 && !isRemoveAnimationInProgress ) {
                resolve(true);
            }
        };
    });
};