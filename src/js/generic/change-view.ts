export const changeView = (viewToHide: HTMLElement | null, viewToShow: HTMLElement | null) => {
    return new Promise((resolve) => {
        const waitForViewToShow = () => {
            viewToShow.addEventListener('transitionend', function showView() {
                viewToShow?.removeEventListener('transitionend', showView);
                resolve(true);
            });
        };

        viewToHide.classList.add('fade-off');
        viewToHide?.addEventListener('transitionend', function hideView() {
            viewToHide?.classList.add('hide');
            viewToShow?.classList.remove('hide');
            setTimeout(function() {
                viewToShow?.classList.add('fade-on');
                waitForViewToShow();
            }, 10);
            viewToHide?.removeEventListener('transitionend', hideView);
        });
    });
};