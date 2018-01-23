var hist_lvl = 0,
		cmd_hist_list = [],
		curr_cmd = "";

function cmdHistory(direction) {
	if(hist_lvl === 0) curr_cmd = docQS("#command").value;

	if(direction === "up"){
		hist_lvl++;
		if(hist_lvl > cmd_hist_list.length) hist_lvl--;
	}else{
		hist_lvl--;
		if(hist_lvl < 0) hist_lvl++;
	}

	if(hist_lvl > 0) docQS("#command").value = cmd_hist_list[hist_lvl-1];
	else docQS("#command").value = curr_cmd;
};

function addCmdToHistory(cmd) {
	if(cmd_hist_list[0] !== cmd)
		cmd_hist_list.unshift(cmd);
};

function printLine(line) {
	docQS("#readout").innerHTML += "<br/>" + line + "&nbsp;";
};

function runCmd(cmd_name, args) {
	if(cmd_name === "") return;
	if (bin[cmd_name] !== undefined){
		var cmd_print = bin[cmd_name](args);
		if(cmd_print !== null){
			printLine(cmd_print);
			return true;
		}
		return false;
	}else{
		printLine(cmd_name + ": command not found");
	}
};

function submitLine() {
	hist_lvl = 0;
	var cmd = docQS("#command").value;
	printLine("guest~$ " + cmd);
	docQS("#command").value = "";

	addCmdToHistory(cmd);
	cmd = cmd.split(" ");
	runCmd(cmd[0], cmd.splice(1).join(" "));
};
