export const rowComplete = (rows: number[]) => {
    for (let i = 0; i < rows.length; i++) {
        const blocks = document.querySelectorAll(`[data-row="${rows[i]}"]`);
        blocks.forEach(block => {
            // @ts-ignore
            block.parentNode?.remove();
        })
    }
    return rows;
}