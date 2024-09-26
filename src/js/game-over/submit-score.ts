import { score } from "../score/score";
import { newGame } from "../new-game/new-game";
import { gameOver } from "./game-over";
import { leaderboard } from "../leaderboard/leaderboard";

export const submitScore = {
    isValidationErrorShowing: false,
    errorMessage: document.querySelector('[data-error-message]'),
    submittingElement: document.querySelector('[data-submitting]'),
    submitBtn: document.querySelector('[data-submit-score-btn]'),
    cancelBtn: document.querySelector('[data-submit-score-cancel]'),
    submitConfirmation: document.querySelector('[data-submit-confirmation]'),
    nameInput: document.querySelector('[data-name-input]'),
    cancelSubmitScore: function() {
        const enterLeadeboardPanel = document.querySelector('[data-enter-global-leaderboard]');
        const gameOverButtons = document.querySelector('[data-game-over-buttons]');
        enterLeadeboardPanel?.classList.remove('active');
        gameOverButtons?.classList.add('active');
    },
    validateName: function() {
        // @ts-ignore
        const nameValue = submitScore.nameInput.value;
        if(nameValue.length === 0) {
            submitScore.showValidationError('Please enter a name');
            return;
        };
        if(nameValue.length > 0 && nameValue.length < 3) {
            submitScore.showValidationError('Minimum length is 3');
            return;
        };
        if(nameValue.length > 50) {
            submitScore.showValidationError('Maximum length is 50');
            return;
        };
        if(submitScore.isValidationErrorShowing) {
            submitScore.removeValidationError();
        };
        submitScore.checkIfScoreInGlobalTopTen(nameValue);
        submitScore.submitScoreToLeaderboard(nameValue, score.currentScore, newGame.gameDate.toDateString(), 'Leaderboard');
    },
    showValidationError: function(msg: string) {
        this.isValidationErrorShowing = true;
        this.errorMessage.textContent = msg;
        this.errorMessage?.classList.add('active');
    },
    removeValidationError: function() {
        this.isValidationErrorShowing = false;
        this.errorMessage.textContent = '';
        this.errorMessage?.classList.remove('active');
    },
    checkIfScoreInGlobalTopTen: async function(nameValue: string) {
        if (leaderboard.globalTopTen.length < 10) {
            submitScore.submitScoreToLeaderboard(nameValue, score.currentScore, newGame.gameDate.toDateString(), 'Topten');
            return;
        };
        const response = await fetch('/api/getLowestScore.json', {
            method: 'GET'
        });
        const lowestScore = await response.json();
        if (score.currentScore > lowestScore.data[0].score) {
            submitScore.submitScoreToLeaderboard(nameValue, score.currentScore, newGame.gameDate.toDateString(), 'Topten');
            submitScore.removeScoreFromTopten(lowestScore.data[0].id);
        };
    },
    resetSubmitScore: function() {
        this.submitConfirmation?.classList.add('hide');
        this.submittingElement?.classList.add('hide');
        this.submitBtn?.addEventListener('click', submitScore.validateName);
        this.submitBtn?.setAttribute('aria-disabled', 'false');
        this.cancelBtn?.addEventListener('click', submitScore.cancelSubmitScore);
        this.cancelBtn?.setAttribute('aria-disabled', 'false');
        this.nameInput.value = '';
    },
    submitDone: function() {
        this.submitConfirmation?.classList.remove('hide');
        gameOver.enterLeadeboardPanel?.classList.remove('active');
        gameOver.gameOverButtons?.classList.add('active');
    },
    startSubmittingUiChanges: function() {
        this.submittingElement?.classList.remove('hide');
        this.submitBtn?.removeEventListener('click', submitScore.validateName);
        this.submitBtn?.setAttribute('aria-disabled', 'true');
        this.cancelBtn?.removeEventListener('click', submitScore.cancelSubmitScore);
        this.cancelBtn?.setAttribute('aria-disabled', 'true');
    },
    submitScoreToLeaderboard: async function(name: string, score: number, date: string, table: string) {
        if(table === 'Leaderboard') {
            this.startSubmittingUiChanges();
        };
        const data = { 
            name: name,
            score: score,
            date: date
        };
        const response = await fetch(`/api/submitScoreTo${table}.json`, {
            method: 'POST',
            headers: { 	
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        const returnedResponse = await response.json();
        this.submitDone();
    },
    removeScoreFromTopten: async function(id: number) {
        
        const response = await fetch('/api/removeScore.json', {
            method: "DELETE",
            headers: { 	
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(id)
        });
    }
}