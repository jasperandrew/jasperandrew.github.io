'use strict';

const shell = {
    printing: false,
    print_queue: [],

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
        let file = filesystem.fileFromPath(path);
        if(!file || file.type !== 'fold'){
            shell.error(`${path}: not a directory`);
            return;
        }
        filesystem.curr_dir = file;
        // shell.header.update();
    },

    print(txt='', newline=true, delay=true, seq=false) {
        if(!seq && shell.printing){
            shell.print_queue.push(txt);
            return;
        }

        shell.printing = true;
        let next = false;
        if(typeof(txt) === 'object'){
            if(txt.length > 1) [, ...next] = txt;
            txt = txt[0];
        }

        if(next){
            window.setTimeout(() => {
                shell.print(next, 1, 1, 1);
            }, delay ? 17 : 0);
        }else{
            if(shell.print_queue.length > 0){
                let p;
                [p, ...shell.print_queue] = shell.print_queue;
                window.setTimeout(() => {
                    shell.print(p);
                }, delay ? 17 : 0);
            }
        }

        document.querySelector('#readout').innerHTML += (newline ? '<br/>' : '') + txt;
        if(!next) shell.printing = false;
    },

    error(msg) {
        shell.print('[!] ' + msg);
    },

    run(argstr, dir=filesystem.fileFromPath('/bin')) {
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

        if (dir.data[cmd] !== undefined){
            return dir.data[cmd].data(args);
        }else{
            shell.error(`${cmd}: command not found`);
            return false;
        }
    },

    submit(cmd) {
        shell.history.lvl = 0;
        shell.print('> ' + cmd, 1, 0);
        shell.history.add(cmd);
        shell.run(cmd);
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