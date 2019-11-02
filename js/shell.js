'use strict';

const shell = {
    printing: false,
    print_queue: [],
    print_delay: true,

    header: {
        user: 'jasper',
        pc: 'PC',

        update() {
            document.querySelector('#header').innerHTML = `${this.user}@${this.pc}:${filesystem.curr_dir.getPath()}`;
        }
    },

    history: {
        lvl: 0,
        list: [],
        curr: '',

        nav(dir) {
            let self = shell.history;
            if(self.lvl === 0) self.curr = document.querySelector('#command').value;

            if(dir === 'ArrowUp'){
                self.lvl += (self.lvl > self.list.length-1 ? 0 : 1);
            }else{
                self.lvl += (self.lvl < 0 ? 0 : -1);
            }
        
            if(self.lvl > 0) document.querySelector('#command').value = self.list[self.lvl-1];
            else document.querySelector('#command').value = self.curr;		
        },

        add(cmd) {
            let self = shell.history;
            if(self.list[0] !== cmd) self.list.unshift(cmd);
        }
    },

    cd(path) {
        if(!path) path = '/home/jasper';
        let file = filesystem.resolveFileFromPath(path);
        if(!file){
            shell.error(`${path}: does not exist`);
            return false;
        }
        
        if(file.type.search('fold') === -1){
            shell.error(`${path}: not a directory`);
            return false;
        }
        console.log(file);
        filesystem.curr_dir = file;
        // shell.header.update();
        return true;
    },

    print(input='', newline=true) {
        function doPrint() {
            if(queue.length === 0){
                if(shell.print_queue.length > 0){
                    let p;
                    [p, ...shell.print_queue] = shell.print_queue;
                    if(util.typeof(p) === 'Array') queue = p;
                    else queue = [p];
                }else{
                    shell.printing = false;
                    return true;    
                }
            }

            let out, split;
            [out, ...queue] = queue;
            
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
            }, shell.print_delay ? 17 : 0);
            document.querySelector('#readout').innerHTML += out + (newline ? '<br/>' : '');
        }

        shell.print_queue.push(input);
        if(shell.printing) return true;

        let queue = [];
        shell.printing = true;
        doPrint();
    },

    error(msg) {
        shell.print('[!] ' + msg);
    },

    run(argstr, dir=filesystem.getFileFromPath('/bin')) {
        if(util.typeof(argstr) !== 'String'){
            console.error('Arguments must be a string');
            return false;
        }

        const args = util.parseArgs(argstr),
              cmd = args[0];

        if(cmd === 'cd'){
            shell.cd(args[1]);
            return true;
        }

        if (dir.getData()[cmd] !== undefined){
            const f = new Function(['args'], dir.getData()[cmd].getData());
            return f(args);
        }else{
            shell.error(`${cmd}: command not found`);
            return false;
        }
    },

    submit(cmd) {
        if(!cmd){
            const prompt = document.querySelector('#command');
            cmd = prompt.value;
            prompt.value = '';
        }

        shell.print('> ' + cmd);

        if(/\S/.test(cmd)){
            shell.history.lvl = 0;
            shell.history.add(cmd);
            shell.run(cmd);
        }
    },

    startup(delay=0) {
        shell.run('clear');
        window.setTimeout(() => {
            const set = computer.settings.list;
            if(set.welcome) shell.run('welcome');
            if(set.cmd.length) set.cmd.forEach(c => shell.submit(c));	
        }, delay);
    }
}