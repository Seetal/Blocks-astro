// Models

type CurentSettings = {
    darkMode: string | boolean;
    showShapes: boolean;
}

interface SettingsModel {
    currentSettings: CurentSettings;
    bodyElement: HTMLBodyElement | null;
    settingsView: HTMLBodyElement | null;
    getLocalSettings: () => void;
    saveToLocalStorage: () => void;
    updateDarkModeUi: () => void;
    updateDarkMode: () => void;
    updateShowShapesUi: () => void;
    updateShowShapes: () => void;
}

export const settings: SettingsModel = {
    currentSettings: {
        darkMode: false,
        showShapes: false
    },
    bodyElement: document.querySelector('body'),
    settingsView: document.querySelector('[data-settings-view]'),

    getLocalSettings: function() {
        const localSettings = localStorage.getItem('blockSettings');
        if (localSettings) {
            const settings = JSON.parse(localSettings);
            this.currentSettings = settings;
            this.updateDarkModeUi();
            this.updateShowShapesUi();
        }
    },
    saveToLocalStorage: function() {
        localStorage.setItem('blockSettings', JSON.stringify(this.currentSettings));
    },
    updateDarkModeUi: function() {
        const darkModeSwitch = document.querySelector('#darkMode');
        darkModeSwitch?.setAttribute('aria-pressed', String(this.currentSettings.darkMode));
        this.currentSettings.darkMode ? this.bodyElement?.classList.add(`dark-mode`) : this.bodyElement?.classList.remove(`dark-mode`);
    },
    updateDarkMode: function() {
        const darkModeSwitch = document.querySelector('#darkMode');
        darkModeSwitch?.addEventListener('click', (e) => {
            this.currentSettings.darkMode = !this.currentSettings.darkMode;
            this.updateDarkModeUi();
            this.saveToLocalStorage();
        });
    },
    updateShowShapesUi: function() {
        const showShapesSwitch = document.querySelector('#showShapes');
        showShapesSwitch?.setAttribute('aria-pressed', String(this.currentSettings.showShapes));
        const boardElement = document.querySelector('[data-board]');
        this.currentSettings.showShapes ? boardElement?.classList.add(`show-shapes`) : boardElement?.classList.remove(`show-shapes`);
    },
    updateShowShapes: function() {
        const showShapesSwitch = document.querySelector('#showShapes');
        showShapesSwitch?.addEventListener('click', (e) => {
            this.currentSettings.showShapes = !this.currentSettings.showShapes;
            this.updateShowShapesUi();
            this.saveToLocalStorage();
        });
    }
}