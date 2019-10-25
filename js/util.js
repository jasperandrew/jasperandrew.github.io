'use strict';
let _x; // trash variable
const util = {
    parseArgs(str) {
        let delims = ['"', '\''],
            args = [],
            start = 0, i = 0;

        while(i < str.length){
            let arg = '';

            if(i >= str.length-1){ // e "u c" f
                arg = str.slice(start);
            }else if(str[i] === ' '){
                arg = str.slice(start, i);
                start = i+1;
            }else if(delims.indexOf(str[i]) > -1){
                let d = str[i++];
                start = i;
                while(str[i] !== d){
                    i++;
                    if(i >= str.length){
                        shell.error(`parse: missing delimiter (${d})`);
                        return null;
                    }
                }
                arg = str.slice(start, i);
                start = i+1;
            }

            if(arg !== '' && arg !== ' ') args.push(arg);
            i++;
        }
        
        return args;
    },

    typeof(x) {
        return x ? x.constructor.name : x;
    }
}
