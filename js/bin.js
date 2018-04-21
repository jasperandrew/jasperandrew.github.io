'use strict';

const bin = {
    // prints a text version of a condensed version of my resume
    about() {
        shell.error('about: program not implemented');
        return false;
    },

    // clears the console
    clear() {
        document.querySelector('#readout').innerHTML = '';
        return true;
    },

    // opens cv in new window (hint: same as resume)
    cv() {
        return bin['resume']();
    },

    // prints to the console
    echo(args) {
        let str = '';
        args.forEach(arg => {
            str += arg + ' ';
        });
        shell.print(str);
        return true;
    },

    // prints JASPER to the console all fancy-like
    jasper() {
        shell.print([
            '\v          _____   _____ ____  __________',
            '\v         / /   | / ___// __ \\/ ____/ __ \\',
            '\v    __  / / /| | \\__ \\/ /_/ / __/ / /_/ /',
            '\v   / /_/ / ___ |___/ / ____/ /___/ _, _/',
            '\v   \\____/_/  |_/____/_/   /_____/_/ |_|','',''
        ]);
        return true;
    },

    login() {
        shell.error('login: program not implemented');
        return false;
    },

    // opens resume in new window
    resume() {
        shell.print('opening in new window...');
        window.setTimeout(() => { window.open('http://www.jasperandrew.me/resume.pdf'); }, 500);
        return true;
    },

    welcome() {
        shell.print([
            '\v                  WELCOME TO',
            '',
            '\v     AMMMMMMMMMA              oo',
            '\v     MMMMMMMM  M',
            '\v     MMMMMMMM  M     88d888b. dP dP.  .dP',
            '\v     MMMMMMMM  M 888 88\'  `88 88  `8bd8\'',
            '\v     M. `MMM\' .M     88    88 88  .d88b.',
            '\v     MM.     .MM     dP    dP dP dP\'  `dP',
            '\v     VMMMMMMMMMV','','',''
        ]);
        return true;
    }
};
