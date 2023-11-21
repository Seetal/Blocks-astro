// Updates the number of assists remaining

import { config } from '../config';

export const assists = {
    remainingAssists: config.assists,
    removeAssist: function() {
        this.remainingAssists--;
        this.refreshAssists();
    },
    refreshAssists: function() {
        const assistsElement: HTMLDivElement | null = document.querySelector('[data-assists]');
        if (assistsElement) {
            assistsElement.innerText = this.remainingAssists.toString();
        }
    },
    addAssist: function() {
        if (assists.remainingAssists < 10) {
            assists.remainingAssists++;
            assists.refreshAssists();
        }
    },
    resetAssists: function() {
        this.remainingAssists = config.assists;
    }
}