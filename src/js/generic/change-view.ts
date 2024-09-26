export const changeView = (viewToHide: HTMLElement | null, viewToShow: HTMLElement | null) => {
    return new Promise((resolve) => {
        const waitForViewToShow = () => {
            viewToShow?.addEventListener('transitionend', function() {
                resolve(true);
            }, {once : true});
        };

        viewToHide?.classList.add('fade-off');
        viewToHide?.classList.remove('fade-on');
        viewToHide?.addEventListener('transitionend', function() {
            // Wait for fade off transition to end before adding 'display: none' to view
            viewToHide?.classList.add('hide');
            viewToShow?.classList.remove('hide');
            setTimeout(function() {
                viewToShow?.classList.add('fade-on');
                waitForViewToShow();
            }, 10);
        }, {once : true});
    });
};