const shell = {
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

	print(txt, newline=true) {
		document.querySelector('#readout').innerHTML += (newline ? '<br/>' : '') + (txt ? txt : '');
	},

	run(cmd, args) {
		//console.log(cmd, args);
		if(cmd === undefined) return;
		if (bin[cmd] !== undefined){
			return bin[cmd](args);
		}else{
			shell.print(cmd + ': command not found');
			return false;
		}
	},

	submit(cmd) {
		shell.history.lvl = 0;
		shell.print('guest~$ ' + cmd);
		shell.history.add(cmd);
		cmd = removeAll(cmd.split(' '), ''); // upgrade dat parsing dooo
		shell.run(cmd[0], cmd.splice(1));	
	}
}