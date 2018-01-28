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
        shell.print();
        args.forEach(arg => {
            shell.print(arg + ' ', false);
        });
        return true;
    },

    // prints JASPER to the console all fancy-like
    jasper() {
        shell.print('          _____   _____ ____  __________<br>         / /   | / ___// __ \\/ ____/ __ \\<br>    __  / / /| | \\__ \\/ /_/ / __/ / /_/ /<br>   / /_/ / ___ |___/ / ____/ /___/ _, _/<br>   \\____/_/  |_/____/_/   /_____/_/ |_|<br><br>');
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
        shell.submit('clear');
        shell.print('                  WELCOME TO<br><br>     AMMMMMMMMMA              oo<br>     MMMMMMMM  M<br>     MMMMMMMM  M     88d888b. dP dP.  .dP<br>     MMMMMMMM  M 888 88\'  `88 88  `8bd8\'<br>     M. `MMM\' .M     88    88 88  .d88b.<br>     MM.     .MM     dP    dP dP dP\'  `dP<br>     VMMMMMMMMMV<br><br><br><br>');
        return true;
    }
};
