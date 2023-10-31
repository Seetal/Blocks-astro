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
    updateShowShapes: (setting: boolean) => void;
}

export const settings: SettingsModel = {
    currentSettings: {
        darkMode: false,
        showShapes: true
    },
    bodyElement: document.querySelector('body'),
    settingsView: document.querySelector('[data-settings-view]'),

    getLocalSettings: function() {
        const localSettings = localStorage.getItem('blockSettings');
        if (localSettings) {
            const settings = JSON.parse(localSettings);
            this.currentSettings = settings;
            this.updateDarkModeUi();
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
    updateShowShapes: function(setting) {
        this.currentSettings.showShapes = setting;
    }
}