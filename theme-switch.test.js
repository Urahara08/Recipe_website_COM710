describe('Theme Switcher', () => {
    let themeSwitch;

    beforeEach(() => {
        // Mock the DOM
        document.body.innerHTML = `
            <button id="theme-switch">Switch Theme</button>
        `;
        themeSwitch = document.getElementById('theme-switch');
        document.body.className = ''; // Reset body classes before each test
    });

    describe('Event Listener', () => {
        test('should call enableDarkmode when themeSwitch is clicked', () => {
            const enableDarkmode = jest.fn();
            const disableDarkmode = jest.fn();

            // Mock localStorage
            localStorage.setItem('darkmode', 'inactive');

            // Mock the event listener
            themeSwitch.addEventListener('click', () => {
                const darkmode = localStorage.getItem('darkmode');
                darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
            });

            // Simulate a click
            themeSwitch.click();

            expect(enableDarkmode).toHaveBeenCalled();
            expect(disableDarkmode).not.toHaveBeenCalled();
        });

        test('should call disableDarkmode when darkmode is active and themeSwitch is clicked', () => {
            const enableDarkmode = jest.fn();
            const disableDarkmode = jest.fn();

            // Mock localStorage
            localStorage.setItem('darkmode', 'active');

            // Mock the event listener
            themeSwitch.addEventListener('click', () => {
                const darkmode = localStorage.getItem('darkmode');
                darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
            });

            // Simulate a click
            themeSwitch.click();

            expect(enableDarkmode).not.toHaveBeenCalled();
            expect(disableDarkmode).toHaveBeenCalled();
        });
    });
});