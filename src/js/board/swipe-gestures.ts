import { breakBlock } from './break-block';
import { createBlock } from './create-block';
import { assists } from '../assists/assists';

export const swipeGestures = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    threshold: 30,
    boardElement: document.querySelector('[data-board]'),

    setupNewBlocks: function (target: HTMLElement) {
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
        this.boardElement?.insertAdjacentHTML('beforeend', newBlockHtml);
        assists.removeAssist();
    },

    calculateSwipe: function (target: HTMLElement) {
        const xDist = Math.abs(this.endX - this.startX);
        const yDist = Math.abs(this.endY - this.startY);

        if (xDist > yDist && xDist > swipeGestures.threshold) {
            if (swipeGestures.endX > swipeGestures.startX) {
                // swipe right
            } else {
                // swipe left
            }
        };
        if (yDist > xDist && yDist > swipeGestures.threshold) {
            if (swipeGestures.endY > swipeGestures.startY) {
                // swipe down
            } else {
                // swipe up
                swipeGestures.setupNewBlocks(target);
            }
        };
    },
    touchStartFunction: function(e) {
        const touchEvent = e as TouchEvent;
        const target = e.target as HTMLElement;
        if(target.classList.contains('-js-block')) {
            swipeGestures.startX = touchEvent.touches[0].clientX;
            swipeGestures.startY = touchEvent.touches[0].clientY;
        }
    },
    touchEndFunction: function(e) {
        const touchEvent = e as TouchEvent;
        const target = e.target as HTMLElement;
        if(target.classList.contains('-js-block')) {
            swipeGestures.endX = touchEvent.changedTouches[0].clientX;
            swipeGestures.endY = touchEvent.changedTouches[0].clientY;
            swipeGestures.calculateSwipe(target);
        }
    },
    setupTouchStartListener: function() {
        this.boardElement?.addEventListener('touchstart', this.touchStartFunction);
    },
    setupTouchEndListener: function() {
        this.boardElement?.addEventListener('touchend', this.touchEndFunction);
    },
    removeTouchStartListener: function() {
        this.boardElement?.removeEventListener('touchstart', this.touchStartFunction);
    },
    removeTouchEndListener: function() {
        this.boardElement?.removeEventListener('touchend', this.touchEndFunction);
    }
}