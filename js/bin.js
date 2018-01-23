const bin = {
    // prints a text version of a condensed version of my resume
    about: function() {},

    // clears the console
    clear: function() {
        docQS("#readout").innerHTML = "";
        return null;
    },

    // opens cv in new window (hint: same as resume)
    cv: function() {
        return bin["resume"]();
    },

    // prints to the console
    echo: function(args) {
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
    jasper: function() {
        return jasper_str;
    },

    // opens resume in new window
    resume: function() {
        window.open("http://www.jasperandrew.me/resume.pdf");
        return null;
    }
};
