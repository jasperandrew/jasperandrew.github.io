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
		shell.header.update();
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

		if(txt[0] == '\v') txt = '<span class="pre">' + txt.substr(1) + '</span>';

		document.querySelector('#readout').innerHTML += (newline ? '<br/>' : '') + txt;
		if(!next) shell.printing = false;
	},

	error(msg) {
		shell.print('[!] ' + msg);
	},

	run(cmd, args=null, dir=filesystem.fileFromPath('/bin')) {
		// console.log(cmd, args);
		if(cmd === undefined) return;
		if(cmd === 'cd'){
			shell.cd(args[0]);
			return true;
		}

		if (dir.data[cmd] !== undefined){
			return dir.data[cmd].data(args);
		}else{
			shell.error(cmd + ': command not found');
			return false;
		}
	},

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
						shell.error('parse: missing delimiter (' + d + ')');
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

	submit(cmd) {
		shell.history.lvl = 0;
		shell.print('> ' + cmd, 1, 0);
		shell.history.add(cmd);
		let args = shell.parseArgs(cmd);
		if(args) shell.run(args[0], args.splice(1));
	},

	startup(delay=0) {
		shell.run('clear');
		window.setTimeout(() => {
			const set = computer.settings.default;
			if(set.welcome) shell.run('welcome');
			if(set.cmd.length) set.cmd.forEach(c => shell.submit(c));	
		}, delay);
	}
}