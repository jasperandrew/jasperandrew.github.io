
'use strict';
(() => {
    ////// Private ////////////////////
    let user = 'jasper',
        pc = 'PC',
        printing = false,
        print_queue = [],
        print_delay = true,

        error = (msg) => {
            shell.print('[!] ' + msg);
        },
        updateHeader = () => {
            document.querySelector('#header').innerHTML = `${user}@${pc}:${sys.curr_dir.getPath()}`;
        },

    ////// Public /////////////////////
        history = (() => {
            let lvl = 0,
                list = [],
                curr = '',
                
                nav = (key) => {
                    if(lvl === 0) curr = document.querySelector('#command').value;

                    if(key === 'ArrowUp'){
                        lvl += (lvl > list.length-1 ? 0 : 1);
                    }else if(key === 'ArrowDown'){
                        lvl += (lvl < 0 ? 0 : -1);
                    }
                
                    if(lvl > 0) document.querySelector('#command').value = list[lvl-1];
                    else document.querySelector('#command').value = curr;    
                },
                
                add = (cmd) => {
                    if(list[0] !== cmd) list.unshift(cmd);
                };

            return { nav: nav, add: add };
        })(),

        cd = (path) => {
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
        print = (input='', newline=true) => {
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
        run = (argstr, dir=sys.getFileFromPath('/bin')) => {
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
        startup = (delay=0) => {
            run('clear');
            window.setTimeout(() => {
                const set = computer.settings.list;
                if(set.welcome) run('welcome');
                if(set.cmd.length) set.cmd.forEach(c => submit(c));	
            }, delay);
        },
        submit = (cmd) => {
            if(!cmd){
                const prompt = document.querySelector('#command');
                cmd = prompt.value;
                prompt.value = '';
            }
    
            print('> ' + cmd);
    
            if(/\S/.test(cmd)){
                history.lvl = 0;
                history.add(cmd);
                run(cmd);
            }
        },
        write = (data='', path, append=false) => {
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
    
    ////// Output /////////////////////
    this.shell = {
        history: history,

        cd: cd,
        print: print,
        run: run,
        startup: startup,
        submit: submit,
        write: write,
    };
})();