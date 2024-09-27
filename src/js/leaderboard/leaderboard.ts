import { newGame } from "../new-game/new-game";

interface scoreType {
    score: number;
    date: Date;
}
interface globalScoreType {
    score: number;
    date: Date;
    name: string;
}

export const leaderboard =  {
    localScores: [],
    users: [],
    globalTopTen: [],
    getGlobalTopTenScores: async function() {
        // API endpoint
        const response = await fetch('/getTopTen.json', {
            method: 'GET'
        });
        const topTen = await response.json();
        this.globalTopTen = topTen.data;
        this.updateGlobalLeaderboardUi();
    },
    getLocalScores: function() {
        const localScores = localStorage.getItem('blockScores');
        if (localScores) {
            const scores = JSON.parse(localScores);
            this.localScores = scores;
            this.updateLeaderboardUi();
        }
    },
    updateLeaderboardUi: function() {
        const yourScoresList = document.querySelector('[data-leaderboard="your-scores"]');
        // @ts-ignore
        yourScoresList.innerHTML = "";
        let scoresHtml = ``;
        this.sortScores(this.localScores);
        this.localScores.map((score: scoreType) => {
            const date = new Date(score.date);
            const formattedDate = date.toDateString();
            const currentScore = `
                <li class="leaderboard__item">
                    <div class="leaderboard__inner">
                        <p class="leaderboard__date">${formattedDate}</p>
                        <p class="leaderboard__score">${score.score}</p>
                    </div>
                </li>`;
            scoresHtml += currentScore;
        })
        yourScoresList?.insertAdjacentHTML('afterbegin', scoresHtml);
    },
    updateGlobalLeaderboardUi: function() {
        const globalScoresList = document.querySelector('[data-leaderboard="global-scores"]');
        // @ts-ignore
        globalScoresList.innerHTML = "";
        let scoresHtml = ``;
        this.sortScores(this.globalTopTen);
        this.globalTopTen.map((score: globalScoreType) => {
            const date = new Date(score.date);
            const formattedDate = date.toDateString();
            const currentScore = `
                <li class="leaderboard__item">
                    <div class="leaderboard__inner">
                        <p class="leaderboard__date">${formattedDate}</p>
                        <p class="leaderboard__score">${score.score} - ${score.name}</p>
                    </div>
                </li>`;
            scoresHtml += currentScore;
        })
        globalScoresList?.insertAdjacentHTML('afterbegin', scoresHtml);
    },
    sortScores: function(array: scoreType[]) {
        array.sort(function(a: scoreType, b: scoreType) {
            return b.score - a.score;
        });
    },
    saveScoresToLocalStorage: function() {
        localStorage.setItem('blockScores', JSON.stringify(this.localScores));
    },
    isNewScoreInLeaderboard: function(newScore: number) {
        const lowestLocalScore = this.localScores[this.localScores.length - 1].score;
        const isHigher = newScore >= lowestLocalScore ? true : false;
        return isHigher;
    },
    updateScores: function(newScore: number) {
        const newScoreObject: scoreType = { score: newScore, date: newGame.gameDate }
        if ((this.localScores.length > 9) && (this.isNewScoreInLeaderboard(newScore))) {
            this.localScores.pop();
            //@ts-ignore
            this.localScores.push(newScoreObject);
            this.updateLeaderboardUi();
            this.updatelocalStorageScores();
        }
        if (this.localScores.length < 10) {
            //@ts-ignore
            this.localScores.push(newScoreObject);
            this.updateLeaderboardUi();
            this.updatelocalStorageScores();
        }
    },
    updatelocalStorageScores: function() {
        this.sortScores(this.localScores);
        this.saveScoresToLocalStorage();
    },
    getLocalUsers: function() {
        const localUsers = localStorage.getItem('users');
        if (localUsers) {
            const users = JSON.parse(localUsers);
            this.users = users;
        }
    }
}