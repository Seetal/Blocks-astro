export const countdown = () => {
    return new Promise((resolve) => {
        const oneTemplate = `
            <div class="block block--countdown" data-number="1" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>
            <div class="block block--countdown" data-number="1" style="grid-column: 3 / 4; grid-row: 2 / 3;"></div>
            <div class="block block--countdown" data-number="1" style="grid-column: 4 / 5; grid-row: 2 / 3;"></div>
            <div class="block block--countdown" data-number="1" style="grid-column: 4 / 5; grid-row: 3 / 4;"></div>
            <div class="block block--countdown" data-number="1" style="grid-column: 4 / 5; grid-row: 4 / 5;"></div>
            <div class="block block--countdown" data-number="1" style="grid-column: 4 / 5; grid-row: 5 / 6;"></div>
            <div class="block block--countdown" data-number="1" style="grid-column: 4 / 5; grid-row: 6 / 7;"></div>
            <div class="block block--countdown" data-number="1" style="grid-column: 4 / 5; grid-row: 7 / 8;"></div>
        `;
        const twoTemplate = `
            <div class="block block--countdown" data-number="2" style="grid-column: 3 / 4; grid-row: 1 / 2;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 2 / 3; grid-row: 2 / 3;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 5 / 6; grid-row: 2 / 3;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 5 / 6; grid-row: 3 / 4;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 4 / 5; grid-row: 4 / 5;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 3 / 4; grid-row: 5 / 6;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 2 / 3; grid-row: 6 / 7;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 2 / 3; grid-row: 7 / 8;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 3 / 4; grid-row: 7 / 8;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 4 / 5; grid-row: 7 / 8;"></div>
            <div class="block block--countdown" data-number="2" style="grid-column: 5 / 6; grid-row: 7 / 8;"></div>
        `;

        const threeTemplate = `
            <div class="block block--countdown" data-number="3" style="grid-column: 3 / 4; grid-row: 1 / 2;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 2 / 3; grid-row: 2 / 3;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 5 / 6; grid-row: 2 / 3;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 5 / 6; grid-row: 3 / 4;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 4 / 5; grid-row: 4 / 5;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 3 / 4; grid-row: 4 / 5;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 5 / 6; grid-row: 5 / 6;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 2 / 3; grid-row: 6 / 7;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 5 / 6; grid-row: 6 / 7;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 3 / 4; grid-row: 7 / 8;"></div>
            <div class="block block--countdown" data-number="3" style="grid-column: 4 / 5; grid-row: 7 / 8;"></div>
        `;
        const board = document.querySelector('[data-board]');
        let currentCount = 3;
        const numbers = [
            {
                counterNumber: 1,
                template: oneTemplate
            },
            {
                counterNumber: 2,
                template: twoTemplate
            },
            {
                counterNumber: 3,
                template: threeTemplate
            }
        ];
        
        const counter = (number: number) => {
            board?.insertAdjacentHTML('beforeend', numbers[number - 1].template);
            const addedNumberElement = document.querySelector(`[data-number="${number}"]`);
            currentCount--;
            addedNumberElement?.addEventListener('animationend', function() {
                if(currentCount === 0) {
                    resolve(true);
                    return;
                }
                counter(currentCount);
            }, {once : true});
        };
        counter(currentCount);
    });
};