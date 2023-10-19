import { createRowInterval } from '../board/create-row-interval';
import { assists } from '../assists/assists';
import { config } from '../config';


export const score = {
    currentScore: 0,
    updateScoreState: function(amount: number) {
        this.currentScore += amount;
        this.refreshScore();
        const isDoubleLines = amount > config.scoreRewarded ? true : false;
        if ((this.currentScore % config.newRowspeedAndAddAssistThreshold === 0) || (isDoubleLines && (this.currentScore % config.newRowspeedAndAddAssistThreshold === config.scoreRewarded ))) {
            createRowInterval.updateTime();
            assists.addAssist();
        }
    },
    refreshScore: function() {
        const scoreElement: HTMLParagraphElement | null = document.querySelector('[data-score]');
        if (scoreElement) {
            scoreElement.innerText = this.currentScore.toString();
        }
    }
}