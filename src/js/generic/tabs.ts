export const tabs = () => {
    const tabContainer = document.querySelector('[data-tabs]');
    const updateTab = (target: HTMLButtonElement) => {
        if (target.classList.contains('selected')) return;
        const currentlySelectedTab = tabContainer?.querySelector('.selected');
        document.querySelector('.active-panel')?.classList.remove('active-panel');
        currentlySelectedTab?.classList.remove('selected');
        currentlySelectedTab?.setAttribute('aria-selected', 'false');
        const tragetPanelId = target.getAttribute('aria-controls');
        document.querySelector(`#${tragetPanelId}`)?.classList.add('active-panel');
        target.classList.add('selected');
        target?.setAttribute('aria-selected', 'true');
    }
    tabContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        if(target?.classList.contains('tabs__tab')) {
            updateTab(target);
        };
    });
};