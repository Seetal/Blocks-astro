import { rowComplete } from './row-complete';
import { moveRowDown } from './move-row-down';
import { checkIfRowComplete } from './check-if-row-complete';
import { score } from '../score/score';
import { emptyRowState } from "./empty-row-state";
import { config } from '../config';

// TYPES / MODELS imports

export const moveBlock = () => {

    const boardElement = document.querySelector('[data-board]');
    let selectedBlock: HTMLDivElement | null;

    const updateBlockPosition = (target: HTMLDivElement) => {
        if (selectedBlock) {
            const currentEmptyRow = emptyRowState.currentEmptyRow;
            const targetColour = target.dataset.colour;
            target.dataset.colour = selectedBlock.dataset.colour;
            selectedBlock.dataset.colour = targetColour;
            selectedBlock.classList.remove('selected');

            const updatedRows: number[] = [];
            updatedRows.push(Number(selectedBlock.dataset.row));
            updatedRows.push(Number(target.dataset.row));
            selectedBlock = null;
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
    }

    const checkifMoveBlock = (target: HTMLDivElement) => {
        if(!selectedBlock) {
            target.classList.add('selected');
            selectedBlock = target;
            return;
        }
        if(selectedBlock && target === selectedBlock) {
            target.classList.remove('selected');
            selectedBlock = null;
            return;
        }
        if(selectedBlock && selectedBlock !== target) {
            if (target.dataset.size === selectedBlock.dataset.size && target.dataset.colour !== selectedBlock.dataset.colour) {
                updateBlockPosition(target);
            }
        }
    }
    boardElement?.addEventListener('click', (e) => {
        if ((e.target as HTMLDivElement).classList.contains('-js-block')) {
            checkifMoveBlock(e.target as HTMLDivElement);
        }
    })
} 