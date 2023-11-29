import { score } from "../score/score";
import { newGame } from "../new-game/new-game";

export const submitScore = {
    isValidationErrorShowing: false,
    errorMessage: document.querySelector('[data-error-message]'),
    submittingElement: document.querySelector('[data-submitting]'),
    removeScore: { id: null, remove: false },
    setRemoveScore: function(id) {
        this.removeScore.id = id;
        this.removeScore.remove = true;
    },
    setupGameOverSubmitScoreListener: function() {
        const submitBtn = document.querySelector('[data-submit-score-btn]');
        submitBtn?.addEventListener('click', function() {
            submitScore.validateName();
        });
    },
    setupSubmitScoreCancelListener: function() {
        const cancelButton = document.querySelector('[data-submit-score-cancel]');
        cancelButton?.addEventListener('click', function() {
            submitScore.cancelSubmitScore();
        });
    },
    cancelSubmitScore: function() {
        const enterLeadeboardPanel = document.querySelector('[data-enter-global-leaderboard]');
        const gameOverButtons = document.querySelector('[data-game-over-buttons]');
        enterLeadeboardPanel?.classList.remove('active');
        gameOverButtons?.classList.add('active');
    },
    validateName: function() {
        // @ts-ignore
        const nameValue = document.querySelector('[data-name-input]').value;
        if(nameValue.length === 0) {
            this.showValidationError('Please enter a name');
            return;
        };
        if(nameValue.length > 0 && nameValue.length < 3) {
            this.showValidationError('Minimum length is 3');
            return;
        };
        if(nameValue.length > 50) {
            this.showValidationError('Maximum length is 50');
            return;
        };
        if(this.isValidationErrorShowing) {
            this.removeValidationError();
        };
        this.submitScoreToLeaderboard(nameValue, score.currentScore, newGame.gameDate.toDateString());
        if(this.removeScore.remove) {
            this.removeScoreFromLeaderboard();
            this.removeScore.remove = false;
            this.removeScore.id = null;
        };
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
    submitDone: function() {
        this.submittingElement.textContent = 'Done';
    },
    submitScoreToLeaderboard: async function(name: string, score: number, date: string) {
        this.submittingElement?.classList.add('active');
        const data = { 
            name: name,
            score: score,
            date: date
        };
        const response = await fetch('/.netlify/functions/submitScore', {
            method: "POST",
            headers: { 	
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        const returnedResponse = await response.json();
        this.submitDone();
        console.log('returnedResponse', returnedResponse);
    },
    removeScoreFromLeaderboard: async function() {
        const data = { 
            id: this.removeScore.id
        };
        const response = await fetch('/.netlify/functions/removeScore', {
            method: "POST",
            headers: { 	
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(response);
    }
}