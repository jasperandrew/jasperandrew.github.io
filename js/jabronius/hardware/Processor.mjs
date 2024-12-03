export class Processor {
    constructor(_sys, _shell, _filesys) {

        ////// Public Fields //////////////////

        this.execute = (script, args, input, outFn, errFn) => {
            try {
                const f = new Function(['SYS','SHELL','FS','ARGS','IN','OUT','ERR'], script);
                return f(_sys, _shell, _filesys, args, input, outFn, errFn);
            } catch (e) {
                let msg = e.name;
                if (e.lineNumber) {
                    msg += ` (${e.lineNumber}`;
                    if (e.columnNumber) msg += `,${e.columnNumber}`;
                    msg += ')';
                }
                msg += `: ${e.message}`;
                errFn(msg);
                console.error(e);
                return false;
            }
        };
    }
}