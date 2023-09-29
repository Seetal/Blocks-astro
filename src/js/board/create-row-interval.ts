import { config } from '../config';
import { emptyRowState } from "./empty-row-state";
import { generateBlockNumbers } from './generate-block-number';
import { buildBlockRow } from './build-block-row';
import { gameOver } from '../game-over/game-over';

// Models
import { ConfigSizeModel } from "../../models/config-size-model";
import { ConfigColoursModel } from '../../models/config-colours-model';

const selectedSize: ConfigSizeModel = config.sizes.medium;
const colours: ConfigColoursModel = config.colours;

export const createRowInterval = {
    currentTimeInterval: config.rowAddTime,
    updateTime: function() {
        const newTime = this.currentTimeInterval - config.rowAddTimeReduction;
        this.currentTimeInterval = newTime;
        console.log(this.currentTimeInterval);
        this.clearIntervalTimer();
        this.setTimer();
    },
    intervalCounter: 0,
    showTimerBar: function() {
        const bar = document.querySelector(`.b${this.intervalCounter}`);
        bar?.classList.add('show');
    },
    resetBars: function() {
        const bars = document.querySelectorAll('[data-bar]');
        bars.forEach(bar => {
            bar.classList.remove('show');
        })
    },
    setTimer: function() {
        //@ts-ignore
        this.intervalTimer = setInterval(() => {
            if(this.intervalCounter === 0) {
                this.resetBars();
            }
            this.intervalCounter++;
            this.showTimerBar();
            if(this.intervalCounter === 12) {
                setTimeout(() => {
                    this.addNewRow();
                }, this.currentTimeInterval / 12);
                this.intervalCounter = 0;
            }
            
        }, this.currentTimeInterval / 12);
    },
    addNewRow: function() {
        const currentEmptyRow = emptyRowState.currentEmptyRow;
        if (currentEmptyRow === 0) {
            this.clearIntervalTimer();
            gameOver();
        } else {
            const boardElement: HTMLDivElement | null  = document.querySelector('[data-board]');
            const gridRowDetails = {
                row: currentEmptyRow,
                gridRowPosition: `${currentEmptyRow} / ${currentEmptyRow + 1}`
            };
            const rowBlockNumbers = generateBlockNumbers(config.blockSizes.min, config.blockSizes.max, selectedSize.columns);
            const generateBlocksRow = buildBlockRow(rowBlockNumbers, colours, gridRowDetails, selectedSize);
            if (boardElement) {
                boardElement.insertAdjacentHTML('beforeend', generateBlocksRow.html);
            }
            emptyRowState.setCurrentEmptyRow(currentEmptyRow - 1);
        }
    },
    clearIntervalTimer: function() {
        //@ts-ignore
        clearInterval(this.intervalTimer);
        console.log('cleared');
    }
};