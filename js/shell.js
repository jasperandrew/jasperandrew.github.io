const shell = {
	history: {
		lvl: 0,
		list: [],
		curr: '',

		nav(dir) {
			let self = shell.history;
			if(self.lvl === 0) self.curr = docQS('#command').value;

			if(dir === 'ArrowUp'){
				self.lvl += (self.lvl > self.list.length-1 ? 0 : 1);
			}else{
				self.lvl += (self.lvl < 0 ? 0 : -1);
			}
		
			if(self.lvl > 0) docQS('#command').value = self.list[self.lvl-1];
			else docQS('#command').value = self.curr;		
		},

		add(cmd) {
			let self = shell.history;
			if(self.list[0] !== cmd) self.list.unshift(cmd);
		}
	},

	print(txt, newline=true) {
		docQS('#readout').innerHTML += (newline ? '<br/>' : '') + txt + '&nbsp;';
	},

	run(cmd, args) {
		if(cmd === '') return;
		if (bin[cmd] !== undefined){
			return bin[cmd](args);
		}else{
			shell.print(cmd + ': command not found');
			return false;
		}
	},

	submit() {
		shell.history.lvl = 0;
		let cmd = docQS('#command').value;
		shell.print('guest~$ ' + cmd, 1);
		docQS('#command').value = '';
	
		shell.history.add(cmd);
		cmd = removeAll(cmd.split(' '), '');
		shell.run(cmd[0], cmd.splice(1));	
	}
}