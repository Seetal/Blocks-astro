
export const gameOver = () => {
    console.log('GAME OVER');
    const allBlocks: NodeListOf<HTMLDivElement> = document.querySelectorAll('.-js-block');
    const allBlocksArray: HTMLDivElement[] = Array.from(allBlocks);
    const shuffleArray = (array: HTMLDivElement[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    }
    const shuffledBlocks = shuffleArray(allBlocksArray);

    console.log(shuffledBlocks);
    shuffledBlocks.forEach((block, i) => {
        setTimeout(function() {
            block.classList.add('faded');
        }, i * 70);
    })
}