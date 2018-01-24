const bin = {
    // prints a text version of a condensed version of my resume
    about: () => {},

    // clears the console
    clear: () => {
        docQS("#readout").innerHTML = "";
        return null;
    },

    // opens cv in new window (hint: same as resume)
    cv: () => {
        return bin["resume"]();
    },

    // prints to the console
    echo: args => {
        for (var i = args.length; i >= 0; i--) {
            if (args[i] === '"') {
                for (var j = i - 1; j >= 0; j--) {
                    if (args[j] === '"') {
                        args = args.slice(0, j) + args.slice(j + 1);
                        args = args.slice(0, i - 1) + args.slice(i);
                        break;
                    }
                }
            }
        }
        return args;
    },

    // prints "jasper" to the console all fancy-like
    jasper: () => {
        return jasper_str;
    },

    login: () => {

    },

    // opens resume in new window
    resume: () => {
        window.open("http://www.jasperandrew.me/resume.pdf");
        return null;
    }
};
