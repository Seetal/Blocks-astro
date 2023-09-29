export const checkIfRowComplete = (rows: number[]) => {
    const completedRows: number[] = [];
    rows.forEach((row: number) => {
        const rowBlocks = document.querySelectorAll(`[data-row="${row}"]`);
        const rowBlocksArray = Array.from(rowBlocks);
        const rowColourAmount = rowBlocksArray.reduce((acc: {}, rowBlock) => {
            // @ts-ignore
            const key: string = rowBlock.dataset.colour;
            const doesColourExist = acc[key as keyof typeof acc] || 0;
            // @ts-ignore
            return { ...acc, [key]: doesColourExist + Number(rowBlock.dataset.size)};
        }, {});
        Object.keys(rowColourAmount).length === 1 && completedRows.push(row);
    });
    return completedRows;
}