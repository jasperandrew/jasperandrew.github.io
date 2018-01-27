const bin = {
    // prints a text version of a condensed version of my resume
    about() {
        print('error: program not implemented!');
        return false;
    },

    // clears the console
    clear() {
        docQS('#readout').innerHTML = '';
        return true;
    },

    // opens cv in new window (hint: same as resume)
    cv() {
        return bin['resume']();
    },

    // prints to the console
    echo(args) { // this will change when I do better argument parsing based on "/' and stuff
        let str = '';
        args.forEach(arg => {
            if(arg[0] === '"' || arg[0] === "'"){ // just removes quotes if they're on both sides
                if(arg[arg.length-1] === arg[0]) arg = arg.slice(1,arg.length-1);
            }
            str += arg + ' ';
        });
        shell.print(str);
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
