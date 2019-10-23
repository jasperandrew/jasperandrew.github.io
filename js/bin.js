'use strict';

const bin = {
    // prints a bit of info about me
    about() {
        shell.print([
            'Hey! I\'m Jasper, an aspiring developer with',
            'a love for that place where aesthetics and',
            'function coexist.',
            '']);
        return false;
    },

    // navigation
    cd() {

    },

    // clears the console
    clear() {
        document.querySelector('#readout').innerHTML = '';
        return true;
    },

    // displays my contact information
    contact() {
        shell.print([
            '☎ +1 (831) 334-7779',
            '✉ <a href="mailto:jasper.q.andrew@gmail.com">jasper.q.andrew@gmail.com</a>']);
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

    help(args) {
        shell.print('blah');
        args.forEach(arg => {shell.print(arg);});
        return true;
    },

    // prints JASPER to the console all fancy-like
    jasper() {
        shell.print([
            '          _____   _____ ____  __________',
            '         / /   | / ___// __ \\/ ____/ __ \\',
            '    __  / / /| | \\__ \\/ /_/ / __/ / /_/ /',
            '   / /_/ / ___ |___/ / ____/ /___/ _, _/',
            '   \\____/_/  |_/____/_/   /_____/_/ |_|','',''
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
            '                  WELCOME TO',
            '',
            '            J . E . S . U . S . S .',
            '',
            '        Jasper\'s Extremely Simplified',
            '             Unix Shell Simulator','','','',''
        ]);
        return true;
    }
};
