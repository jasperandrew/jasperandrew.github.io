var hist_lvl = 0,
		cmd_hist_list = [],
		curr_cmd = "";

function cmdHistory(direction) {
	if(hist_lvl === 0) curr_cmd = document.querySelector("#command").value;

	if(direction === "up"){
		hist_lvl++;
		if(hist_lvl > cmd_hist_list.length) hist_lvl--;
	}else{
		hist_lvl--;
		if(hist_lvl < 0) hist_lvl++;
	}

	if(hist_lvl > 0)	document.querySelector("#command").value = cmd_hist_list[hist_lvl-1];
	else document.querySelector("#command").value = curr_cmd;
};

function printLine(line) {
	document.querySelector("#readout").innerHTML += "<br/>" + line + "&nbsp;";
};

function runCmd(cmd_name, args) {
	if(cmd_name === "") return;
	if (bin[cmd_name] !== undefined){
		var cmd_result = bin[cmd_name];
		return bin[cmd_name](args);
	}else{
		printLine(cmd_name + ": command not found");
	}
};

function submitLine() {
	hist_lvl = 0;
	var cmd = document.querySelector("#command").value;
	printLine("guest~$ " + cmd);
	document.querySelector("#command").value = "";

	cmd_hist_list.unshift(cmd);
	cmd = cmd.split(" ");
	runCmd(cmd[0], cmd.splice(1).join(" "));
};
