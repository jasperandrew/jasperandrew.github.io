'use strict';

const util = {

    jasper_str:
`          _____   _____ ____  __________
         / /   | / ___// __ \\/ ____/ __ \\
    __  / / /| | \\__ \\/ /_/ / __/ / /_/ /
   / /_/ / ___ |___/ / ____/ /___/ _, _/
   \\____/_/  |_/____/_/   /_____/_/ |_|
`,

    welcome_str:
`                 WELCOME  TO


          <b>J  a  B  R  O  N  I  U  S</b>


               <b>Ja</b>vascript-<b>B</b>ased
  <b>R</b>eally <b>O</b>versimplified and <b>N</b>ot-very-useful
       <b>I</b>mplementation of the <b>U</b>nix <b>S</b>hell


`,
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