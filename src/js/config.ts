export const config = {
    sizes: {
        small: {
            columns: 5,
            rows: 6,
            startingRows: 3
        },
        medium: {
            columns: 6,
            rows: 7,
            startingRows: 7
        },
        large: {
            columns: 7,
            rows: 9,
            startingRows: 5
        }
    },
    colours: ['red', 'green', 'blue', 'orange'],
    blockSizes: { min: 1, max: 3 },
    rowAddTime: 7000,
    rowAddTimeReduction: 200,
    newRowspeedAndAddAssistThreshold: 1000,
    assists: 5,
    maxAssists: 10,
    scoreRewarded: 100,
    globalLeaderboardScores: 10
}