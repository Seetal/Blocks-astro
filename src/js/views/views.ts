interface Views {
    homePageView: HTMLElement | null;
    gameView: HTMLElement | null;
    settingsView: HTMLElement | null;
    leaderboardView: HTMLElement | null;
    tutorialView: HTMLElement | null;
}

export const views: Views = {
    homePageView: document.querySelector('[data-home-view]'),
    gameView: document.querySelector('[data-game-view]'),
    settingsView: document.querySelector('[data-settings-view]'),
    leaderboardView: document.querySelector('[data-leaderboard-view]'),
    tutorialView: document.querySelector('[data-tutorial-view]')
}