// Functions for when a block is moved

import { rowComplete } from './row-complete';
import { moveRowDown } from './move-row-down';
import { checkIfRowComplete } from './check-if-row-complete';
import { score } from '../score/score';
import { emptyRowState } from "./empty-row-state";
import { config } from '../config';
import { createRowInterval } from './create-row-interval';

// TYPES / MODELS imports

type SelectedBlockModel = {
    element: HTMLDivElement | null; 
    offsetX: number; 
    offsetY: number;
}

interface MoveBlockModel {
    boardElement: HTMLDivElement | null;
    selectedBlock: SelectedBlockModel;
    isChangingColour: boolean;
    isRemovingRowInProgress: boolean;
    updateBlockPosition: (e: MouseEvent) => void;
    animateNotAllowed: (target: HTMLDivElement) => void;
    checkifMoveBlock: (e: MouseEvent) => void;
    moveBlockFunction: (e: MouseEvent) => void;
    setupMoveEventListener: () => void;
    removeMoveEventListener: () => void;
    animateSwapColours: (e: MouseEvent) => boolean;
    completeRowCheck: (selectedElement: HTMLDivElement, target: HTMLDivElement) => [];
    initBlockChange: (e: MouseEvent) => void;
}

export const moveBlock: MoveBlockModel = {
    boardElement: document.querySelector('[data-board]'),
    selectedBlock: { element: null, offsetX: 0, offsetY: 0 },
    isChangingColour: false,
    isRemovingRowInProgress: false,
    animateNotAllowed: function(target) {
        this.selectedBlock.element?.classList.add('not-allowed');
        target.classList.add('not-allowed');
        this.selectedBlock.element?.addEventListener('animationend', function removeSelectedClass() {
            moveBlock.selectedBlock.element?.classList.remove('not-allowed', 'selected');
            moveBlock.selectedBlock.element?.removeEventListener('animationend', removeSelectedClass);
            moveBlock.selectedBlock.element = null;
        });
        target.addEventListener('animationend', function removeSelectedClass() {
            target.classList.remove('not-allowed');
            target.removeEventListener('animationend', removeSelectedClass);
        });
    },
    animateSwapColours: function(e) {
        const selectedElement = this.selectedBlock.element;
        this.selectedBlock.element = null;
        return new Promise((resolve) => {
            const target = e.target as HTMLDivElement;
            let rowAnimationCounter = 0;
            if (selectedElement) {
                this.isChangingColour = true;
                const addProperties = (item: HTMLDivElement, xPosition: number, yPosition: number, colour: string | undefined ) => {
                    const selectedCenterPoint = item.offsetWidth / 2;
                    const selectedCircleTransformSize = xPosition > selectedCenterPoint ? 
                    xPosition * 2 : 
                    (selectedElement.offsetWidth - xPosition) * 2;

                    item.style.setProperty('--x', `${xPosition - 5}px`);
                    item.style.setProperty('--y', `${yPosition - 5}px`);
                    item.style.setProperty('--transform-size', `${(selectedCircleTransformSize + 30) / 10 }`);
                    item.style.setProperty('--updated-colour', `var(--clr-${colour})`);
                    item.classList.add('addElement');
                    
                    const animationEnd = () => {
                        item.dataset.colour = colour;
                        item.classList.remove('addElement');
                        item.classList.remove('animate');
                        item.setAttribute('style', '');
                        rowAnimationCounter = rowAnimationCounter + 1;
                        if (rowAnimationCounter === 2) {
                            rowAnimationCounter = 0;
                            resolve(true);
                        };
                    };

                    setTimeout(() => {
                        item.classList.remove('selected');
                        item.classList.add('animate');
                        item.addEventListener('transitionend', () => {
                            animationEnd();
                        }, { once: true });
                    }, 10);
                };
                addProperties(selectedElement, this.selectedBlock.offsetX, this.selectedBlock.offsetY, target.dataset.colour);
                addProperties(target, e.offsetX, e.offsetY, selectedElement.dataset.colour);    
            }
        })
    },
    completeRowCheck: function(selectedElement, target) {
        const updatedRows: number[] = [];
        updatedRows.push(Number(selectedElement.dataset.row));
        updatedRows.push(Number(target.dataset.row));
        const completedRows = checkIfRowComplete(updatedRows);
        return completedRows;
    },
    initBlockChange: async function(e) {
        const selectedElement = this.selectedBlock.element;
        const animatedBlocks = await this.animateSwapColours(e);
        const completedRows = this.completeRowCheck(selectedElement, e.target as HTMLDivElement);
        this.isChangingColour = false;
        if (completedRows.length === 0 && createRowInterval.isWaitingToAddANewRow) {
            createRowInterval.addNewRowAfterWaiting();
        }
        if (completedRows.length > 0) {
            this.isRemovingRowInProgress = true;
            const isRowsRemoved = await rowComplete(completedRows);
            const rowsMovedDown = await moveRowDown(completedRows);
            if (rowsMovedDown) {
                completedRows.length > 1 ? emptyRowState.setCurrentEmptyRow(emptyRowState.currentEmptyRow + 2) : emptyRowState.setCurrentEmptyRow(emptyRowState.currentEmptyRow + 1);
                moveBlock.isRemovingRowInProgress = false;
                if(createRowInterval.isWaitingToAddANewRow) {
                    createRowInterval.addNewRowAfterWaiting();
                };
                const newScore: number = completedRows.length * config.scoreRewarded;
                score.updateScoreState(newScore);
            }
        }
    },
    checkifMoveBlock: function(e) {
        const target = e.target as HTMLDivElement;
        if(!this.selectedBlock.element) {
            target.classList.add('selected');
            moveBlock.selectedBlock.element = target;
            moveBlock.selectedBlock.offsetX = e.offsetX;
            moveBlock.selectedBlock.offsetY = e.offsetY;
            return;
        }
        if(this.selectedBlock.element && target === this.selectedBlock.element) {
            target.classList.remove('selected');
            this.selectedBlock.element = null;
            return;
        }
        if(this.selectedBlock.element && this.selectedBlock.element !== target) {
            if(target.dataset.size !== this.selectedBlock.element.dataset.size) {
                this.animateNotAllowed(target);
            };
            if (target.dataset.size === this.selectedBlock.element.dataset.size && target.dataset.colour !== this.selectedBlock.element.dataset.colour) {
                this.initBlockChange(e);
            };
        }
    },
    moveBlockFunction: function(e) {
        if ((e.target as HTMLDivElement).classList.contains('-js-block')) {
            moveBlock.checkifMoveBlock(e);
        }
    },
    setupMoveEventListener: function() {
        this.boardElement?.addEventListener('click', this.moveBlockFunction);
    },
    removeMoveEventListener: function() {
        this.boardElement?.removeEventListener('click', this.moveBlockFunction);
    }
} 