'use strict';
(() => {
    ////// Private Fields /////////////////
    let _user = 'jasper',
        _pc = 'PC',
        _printing = false,
        _print_queue = [],
        _print_delay = true,

        _updateHeader = () => {
            document.querySelector('#header').innerHTML = `${user}@${pc}:${sys.curr_dir.getPath()}`;
        },

    ////// Public Fields //////////////////
        history = (() => {
            let _lvl = 0,
                _list = [],
                _curr = '',
                
                nav = (key) => {
                    if(_lvl === 0) _curr = document.querySelector('#command').value;

                    if(key === 'ArrowUp'){
                        _lvl += (_lvl > _list.length-1 ? 0 : 1);
                    }else if(key === 'ArrowDown'){
                        _lvl += (_lvl < 0 ? 0 : -1);
                    }
                
                    if(_lvl > 0) document.querySelector('#command').value = _list[_lvl-1];
                    else document.querySelector('#command').value = _curr;    
                },
                
                add = (cmd) => {
                    _lvl = 0;
                    if(_list[0] !== cmd) _list.unshift(cmd);
                };

            return { nav: nav, add: add };
        })(),

        changeDirectory = (path) => {
            if(!path) path = '/home/jasper';
            let file = sys.getFileFromPath(path, true);
            if(!file){
                error(`${path}: does not exist`);
                return false;
            }
            
            if(file.type.search('fold') === -1){
                error(`${path}: not a directory`);
                return false;
            }

            sys.curr_dir = file;
            // header.update();
            return true;    
        },
        printError = (msg) => {
            shell.print('[!] ' + msg);
        },
        printData = (input='', newline=true) => {
            function doPrint() {
                if(queue.length === 0){
                    if(print_queue.length > 0){
                        let p;
                        [p, ...print_queue] = print_queue;
                        if(util.typeof(p) === 'Array') queue = p;
                        else queue = [p];
                    }else{
                        printing = false;
                        return true;    
                    }
                }
    
                let out, split;
                [out, ...queue] = queue;
    
                if(out === null){
                    doPrint();
                    return true;
                }
                
                out = out.toString();
                if(out === undefined) out = '<<ERR>>';
    
                split = out.split(/[\n\r]/);
                if(out !== split[0]){
                    [out, ...split] = split;
                    for(let i = split.length-1; i >= 0; i--)
                        queue.unshift(split[i]);
                }
    
                if(newline && out === '') out = ' '; // fix for visual glitch with <br>
                window.setTimeout(() => {
                    doPrint();
                }, print_delay ? 17 : 0);
                document.querySelector('#readout').innerHTML += out + (newline ? '\n' : '');
            }
    
            print_queue.push(input);
            if(printing) return true;
    
            let queue = [];
            printing = true;
            doPrint();
        },
        runCommand = (argstr, dir=sys.getFileFromPath('/bin')) => {
            if(util.typeof(argstr) !== 'String'){
                console.error('Arguments must be a string');
                return false;
            }
    
            const args = util.parseArgs(argstr),
                  cmd = args[0];
            console.log(args);
    
            if(cmd === 'cd'){
                cd(args[1]);
                return true;
            }
    
            if (dir.getData()[cmd] !== undefined){
                const f = new Function(['args'], dir.getData()[cmd].getData());
                return f(args);
            }else{
                error(`${cmd}: command not found`);
                return false;
            }
        },
        startupShell = (delay=0) => {
            run('clear');
            window.setTimeout(() => {
                const set = computer.settings.list;
                if(set.welcome) run('welcome');
                if(set.cmd.length) set.cmd.forEach(c => submit(c));	
            }, delay);
        },
        submitLine = (cmd) => {
            if(!cmd){
                const prompt = document.querySelector('#command');
                cmd = prompt.value;
                prompt.value = '';
            }
    
            print('> ' + cmd);
    
            if(/\S/.test(cmd)){
                history.add(cmd);
                run(cmd);
            }
        },
        writeFile = (data='', path, append=false) => {
            const fp = new FilePath(path);
            let file;
            if(!fp.isValid()){
                fp.up();
                if(!fp.isValid()){
                    error(`${fp.toString()} does not exist`);
                    return false;
                }
                file = new FSFile(fp.leaf, 'data', null);
                fp.getFile().addFile(file);
            }else{
                file = fp.getFile();
            }
    
            if(file.type !== 'data'){
                error(`${file.getPath()} is not writable`);
                return false;
            }
            
            file.data = append ? file.data + data : data;
            return true;
        };
    
    ////// Interface //////////////////
    this.shell = {
        history: history,

        cd: changeDirectory,
        error: printError,
        print: printData,
        run: runCommand,
        startup: startupShell,
        submit: submitLine,
        write: writeFile
    };
})();