// Sets the next empty row to place the next new row of blocks

export const emptyRowState = {
    currentEmptyRow: 0,
    setCurrentEmptyRow: function(row: number) {
        this.currentEmptyRow = row;
    }
}