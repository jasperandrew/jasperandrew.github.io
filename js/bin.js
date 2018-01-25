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
    echo(args) {
        let str = '';
        args.forEach(arg => {
            console.log(arg);
            if(arg[0] !== '"' && arg[0] !== "'"){ // handle possible variables and stuff
            }else{
                console.log(arg[arg.length-1] === arg[0]);
                if(arg[arg.length-1] === arg[0]){
                    arg = arg.slice(1,arg.length-1);
                }
            }
            console.log(arg);
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
