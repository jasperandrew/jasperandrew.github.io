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
        shell.print('&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_____<br>&nbsp;&nbsp;&nbsp;|_&nbsp;&nbsp;|&nbsp;/&nbsp;_&nbsp;\\&nbsp;/&nbsp;&nbsp;___||&nbsp;&nbsp;_&nbsp;&nbsp;\\|&nbsp;&nbsp;___||&nbsp;&nbsp;_&nbsp;&nbsp;\\<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|/&nbsp;/_\\&nbsp;\\\\&nbsp;`--.&nbsp;|&nbsp;|_/&nbsp;/|&nbsp;|__&nbsp;&nbsp;|&nbsp;|_/&nbsp;/<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;||&nbsp;&nbsp;_&nbsp;&nbsp;|&nbsp;`--.&nbsp;\\|&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;__|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;/<br>&nbsp;/\\__/&nbsp;/|&nbsp;|&nbsp;|&nbsp;|/\\__/&nbsp;/|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|___&nbsp;|&nbsp;|\\&nbsp;\\<br>&nbsp;\\____/&nbsp;\\_|&nbsp;|_/\\____/&nbsp;\\_|&nbsp;&nbsp;&nbsp;&nbsp;\\____/&nbsp;\\_|&nbsp;\\_|<br>');
        return true;
    },

    login() {
        print('error: program not implemented!');
        return false;
    },

    // opens resume in new window
    resume() {
        print('opening in new window...');
        window.open('http://www.jasperandrew.me/resume.pdf');
        return true;
    }
};
