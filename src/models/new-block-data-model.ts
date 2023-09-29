export interface NewBlockDataModel {
    blockSize: number;
    colour: string;
    row: number;
    gridPosition: {
        gridColumn: string;
        gridRow: string;
    }
}