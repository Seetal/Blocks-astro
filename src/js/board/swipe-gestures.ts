import { breakBlock } from './break-block';
import { createBlock } from './create-block';
import { assists } from '../assists/assists';

export const swipeGestures = () => {
    let startX: number;
    let startY: number;
    let endX: number;
    let endY: number;
    const threshold: number = 30;
    const board = document.querySelector('[data-board]');

    const setupNewBlocks = (target: HTMLElement) => {
        const size: number = Number(target.dataset.size);
        if(assists.remainingAssists === 0) return;
        if(size === 1) return;
        const newBlocksData = breakBlock(target);
        let newBlockHtml = ``;
        newBlocksData?.forEach(block => {
            const { blockSize, colour, row, gridPosition } = block;
            const newBlock = createBlock(blockSize, colour, gridPosition, row);
            newBlockHtml += newBlock;
        });
        target.parentElement?.remove();
        board?.insertAdjacentHTML('beforeend', newBlockHtml);
        assists.removeAssist();
    }

    const calculateSwipe = (target: HTMLElement) => {
        const xDist = Math.abs(endX - startX);
        const yDist = Math.abs(endY - startY);

        if (xDist > yDist && xDist > threshold) {
            if (endX > startX) {
                // swipe right
            } else {
                // swipe left
            }
        };
        if (yDist > xDist && yDist > threshold) {
            if (endY > startY) {
                // swipe down
            } else {
                // swipe up
                setupNewBlocks(target);
            }
        };
    }

    board?.addEventListener('touchstart', (e) => {
        const touchEvent = e as TouchEvent;
        const target = e.target as HTMLElement;
        if(target.classList.contains('-js-block')) {
            startX = touchEvent.touches[0].clientX;
            startY = touchEvent.touches[0].clientY;
        }
    });
    board?.addEventListener('touchend', (e) => {
        const touchEvent = e as TouchEvent;
        const target = e.target as HTMLElement;
        if(target.classList.contains('-js-block')) {
            endX = touchEvent.changedTouches[0].clientX;
            endY = touchEvent.changedTouches[0].clientY;
            calculateSwipe(target);
        }
    });
}