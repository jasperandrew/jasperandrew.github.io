'use strict';

const bin = {
    // prints a text version of a condensed version of my resume
    about() {
        print('error: program not implemented!');
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

    // prints 'jasper' to the console all fancy-like
    jasper() {
        shell.print('          _____   _____ ____  __________ <br>         / /   | / ___// __ \\/ ____/ __ \\<br>    __  / / /| | \\__ \\/ /_/ / __/ / /_/ /<br>   / /_/ / ___ |___/ / ____/ /___/ _, _/ <br>   \\____/_/  |_/____/_/   /_____/_/ |_|  ');
        return true;
    },

    login() {
        shell.print('error: program not implemented!');
        return false;
    },

    // opens resume in new window
    resume() {
        print('opening in new window...');
        window.open('http://www.jasperandrew.me/resume.pdf');
        return true;
    },

    welcome() {
        shell.submit('clear');
        shell.print('                  WELCOME TO<br><br>     MMMMMMMM""M              oo<br>     MMMMMMMM  M<br>     MMMMMMMM  M     88d888b. dP dP.  .dP<br>     MMMMMMMM  M 888 88\'  `88 88  `8bd8\'<br>     M. `MMM\' .M     88    88 88  .d88b.<br>     MM.     .MM     dP    dP dP dP\'  `dP<br>     MMMMMMMMMMM<br><br>');
        shell.print('         WARNING: Under Construction<br>');
        return true;
    }
};
