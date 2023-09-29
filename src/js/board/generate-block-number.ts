export const generateBlockNumbers = (minBlockSize: number, maxBlockSize: number, rowTotal: number) => {
    const blockNumbers: number[] = [];
    let counter = 0;
    let maxSize;

    while (counter < rowTotal) {
        switch (counter) {
            case rowTotal - 2:
                maxSize = maxBlockSize;
                break;
            case rowTotal - 1:
                maxSize = maxBlockSize - 1;
                break;
            default:
                maxSize = maxBlockSize + 1;
        }
        const randomNumber = Math.floor(Math.random() * (maxSize - minBlockSize) + minBlockSize);
        blockNumbers.push(randomNumber);
        counter += randomNumber;
    }
    return blockNumbers;
}