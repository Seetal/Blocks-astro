import { createRowInterval } from '../board/create-row-interval';
import { config } from '../config';


export const score = {
    currentScore: 0,
    updateScoreState: function(amount: number) {
        this.currentScore += amount;
        this.refreshScore();
        const isDoubleLines = amount > config.scoreRewarded ? true : false;
        if ((this.currentScore % 1000 === 0) || (isDoubleLines && (this.currentScore % 1000 === config.scoreRewarded ))) {
            createRowInterval.updateTime();
            console.log(`New Time  ${createRowInterval.currentTimeInterval}`);
        }
    },
    refreshScore: function() {
        const scoreElement: HTMLParagraphElement | null = document.querySelector('[data-score]');
        if (scoreElement) {
            scoreElement.innerText = this.currentScore.toString();
        }
    }
}