// Animation to remove a completed row

export const rowComplete = (rows: number[]) => {
    return new Promise((resolve) => {
        rows.sort(function(a, b) {
            return b - a;
        });
    
        const animateAndRemoveBlocks = (blocks: NodeList, row: number) => {
            blocks.forEach((block, i) => {
                // @ts-ignore
                block.classList.add('shrink');
                block.addEventListener('transitionend', function() {
                    // @ts-ignore
                    block.parentNode?.remove();
                    if((row === rows.length - 1) && (i === blocks.length - 1)) {
                        resolve(true);
                    };
                }, {once: true});
            });
        }
        for (let j = 0; j < rows.length; j++) {
            const blocks = document.querySelectorAll(`[data-row="${rows[j]}"]`);
            animateAndRemoveBlocks(blocks, j);
        };
    });
}