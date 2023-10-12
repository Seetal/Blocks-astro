import { rowComplete } from './row-complete';
import { moveRowDown } from './move-row-down';
import { checkIfRowComplete } from './check-if-row-complete';
import { score } from '../score/score';
import { emptyRowState } from "./empty-row-state";
import { config } from '../config';

// TYPES / MODELS imports

interface MoveBlockModel {
    boardElement: HTMLDivElement | null;
    selectedBlock: HTMLDivElement | null;
    updateBlockPosition: (target: HTMLDivElement) => void;
    checkifMoveBlock: (target: HTMLDivElement) => void;
    moveBlockFunction: (e: Event) => void;
    setupMoveEventListener: () => void;
    removeMoveEventListener: () => void;
}

export const moveBlock: MoveBlockModel = {
    boardElement: document.querySelector('[data-board]'),
    selectedBlock: null,
    updateBlockPosition: function(target) {
        if (this.selectedBlock) {
            const currentEmptyRow = emptyRowState.currentEmptyRow;
            const targetColour = target.dataset.colour;
            target.dataset.colour = this.selectedBlock.dataset.colour;
            this.selectedBlock.dataset.colour = targetColour;
            this.selectedBlock.classList.remove('selected');

            const updatedRows: number[] = [];
            updatedRows.push(Number(this.selectedBlock.dataset.row));
            updatedRows.push(Number(target.dataset.row));
            this.selectedBlock = null;
            const completedRows = checkIfRowComplete(updatedRows);
            const rowsRemoved = completedRows.length > 0 && rowComplete(completedRows);
            if (completedRows.length > 0) {
                completedRows.length > 1 ? emptyRowState.setCurrentEmptyRow(currentEmptyRow + 2) : emptyRowState.setCurrentEmptyRow(currentEmptyRow + 1);
            }
            if(rowsRemoved) { 
                moveRowDown(rowsRemoved);
                const newScore: number = completedRows.length * config.scoreRewarded;
                score.updateScoreState(newScore);
            }
        }
    },
    checkifMoveBlock: function(target) {
        if(!this.selectedBlock) {
            target.classList.add('selected');
            this.selectedBlock = target;
            return;
        }
        if(this.selectedBlock && target === this.selectedBlock) {
            target.classList.remove('selected');
            this.selectedBlock = null;
            return;
        }
        if(this.selectedBlock && this.selectedBlock !== target) {
            if (target.dataset.size === this.selectedBlock.dataset.size && target.dataset.colour !== this.selectedBlock.dataset.colour) {
                this.updateBlockPosition(target);
            }
        }
    },
    moveBlockFunction: function(e) {
        if ((e.target as HTMLDivElement).classList.contains('-js-block')) {
            moveBlock.checkifMoveBlock(e.target as HTMLDivElement);
        }
    },
    setupMoveEventListener: function() {
        this.boardElement?.addEventListener('click', this.moveBlockFunction);
    },
    removeMoveEventListener: function() {
        this.boardElement?.removeEventListener('click', this.moveBlockFunction);
    }
} 