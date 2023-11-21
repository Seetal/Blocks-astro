import { changeView } from "./change-view";

export const closeView = () => {
    const homePageView: HTMLElement | null = document.querySelector('[data-home-view]');
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        if(target?.classList.contains('-js-close')) {
            const viewToClose = target.dataset.targetView;
            const currentView: HTMLElement | null = document.querySelector(`[data-${viewToClose}-view]`);
            changeView(currentView, homePageView);
        }
    })
}