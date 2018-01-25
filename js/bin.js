const bin = {
    // prints a text version of a condensed version of my resume
    about() {},

    // clears the console
    clear() {
        docQS('#readout').innerHTML = '';
        return null;
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
        return str;
    },

    // prints 'jasper' to the console all fancy-like
    jasper() {
        return jasper_str;
    },

    login() {

    },

    // opens resume in new window
    resume() {
        window.open('http://www.jasperandrew.me/resume.pdf');
        return null;
    }
};
