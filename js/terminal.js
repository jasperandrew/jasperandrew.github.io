var histLvl = 0,
		cmdHistList = [],
		currCmd = "";

function cmdHistory(direction) {
	if(histLvl === 0) currCmd = document.querySelector("#command").value;
	
	if(direction === "up"){
		histLvl++;
		if(histLvl > cmdHistList.length) histLvl--;
	}else{
		histLvl--;
		if(histLvl < 0) histLvl++;
	}

	if(histLvl > 0)	document.querySelector("#command").value = cmdHistList[histLvl-1];
	else document.querySelector("#command").value = currCmd;
};

function printLine(line) {
	document.querySelector("#readout").innerHTML += "<br/>" + line + "&nbsp;";
};

var commands = {
	echo: function(args) {
		for(var i = args.length; i >= 0; i--){
			if(args[i] === "\""){
				for(var j = i-1; j >= 0; j--){
					if(args[j] === "\""){
						args = args.slice(0,j) + args.slice(j+1);
						args = args.slice(0,i-1) + args.slice(i);
						break;
					}
				}
			}
		}
		printLine(args);
	},
	clear: function() {
		document.querySelector("#readout").innerHTML = "";
	},
	resume: function() {
		window.open("http://www.jasperandrew.com/resume/resume.pdf");
	},
	cv: function() {
		window.open("http://www.jasperandrew.com/resume/resume.pdf");
	},
	jasper: function() {
		printLine("&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_____");
		printLine("&nbsp;&nbsp;&nbsp;|_&nbsp;&nbsp;|&nbsp;/&nbsp;_&nbsp;\\&nbsp;/&nbsp;&nbsp;___||&nbsp;&nbsp;_&nbsp;&nbsp;\\|&nbsp;&nbsp;___||&nbsp;&nbsp;_&nbsp;&nbsp;\\");
		printLine("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|/&nbsp;/_\\&nbsp;\\\\&nbsp;`--.&nbsp;|&nbsp;|_/&nbsp;/|&nbsp;|__&nbsp;&nbsp;|&nbsp;|_/&nbsp;/");
		printLine("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;||&nbsp;&nbsp;_&nbsp;&nbsp;|&nbsp;`--.&nbsp;\\|&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;__|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;/");
		printLine("&nbsp;/\\__/&nbsp;/|&nbsp;|&nbsp;|&nbsp;|/\\__/&nbsp;/|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|___&nbsp;|&nbsp;|\\&nbsp;\\");
		printLine("&nbsp;\\____/&nbsp;\\_|&nbsp;|_/\\____/&nbsp;\\_|&nbsp;&nbsp;&nbsp;&nbsp;\\____/&nbsp;\\_|&nbsp;\\_|");
		/*printLine("&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;_");
		printLine("&nbsp;&nbsp;/&nbsp;_&nbsp;\\&nbsp;|&nbsp;\\&nbsp;|&nbsp;||&nbsp;&nbsp;_&nbsp;&nbsp;\\|&nbsp;&nbsp;_&nbsp;&nbsp;\\|&nbsp;&nbsp;___||&nbsp;|&nbsp;&nbsp;|&nbsp;|");
		printLine("&nbsp;/&nbsp;/_\\&nbsp;\\|&nbsp;&nbsp;\\|&nbsp;||&nbsp;|&nbsp;|&nbsp;||&nbsp;|_/&nbsp;/|&nbsp;|__&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|");
		printLine("&nbsp;|&nbsp;&nbsp;_&nbsp;&nbsp;||&nbsp;.&nbsp;`&nbsp;||&nbsp;|&nbsp;|&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;|&nbsp;&nbsp;__|&nbsp;|&nbsp;|/\\|&nbsp;|");
		printLine("&nbsp;|&nbsp;|&nbsp;|&nbsp;||&nbsp;|\\&nbsp;&nbsp;||&nbsp;|/&nbsp;/&nbsp;|&nbsp;|\\&nbsp;\\&nbsp;|&nbsp;|___&nbsp;\\&nbsp;&nbsp;/\\&nbsp;&nbsp;/");
		printLine("&nbsp;\\_|&nbsp;|_/\\_|&nbsp;\\_/|___/&nbsp;&nbsp;\\_|&nbsp;\\_|\\____/&nbsp;&nbsp;\\/&nbsp;&nbsp;\\/");*/
		printLine("");
	}
};

function runCmd(cmdName, args) {
	if(cmdName === "") return;
	if (commands[cmdName] !== undefined){
		return commands[cmdName](args);
	}else{
		printLine(cmdName + ": command not found");
	}
};

function submitLine() {
	histLvl = 0;
	var cmd = document.querySelector("#command").value;
	printLine("guest~$ " + cmd);
	document.querySelector("#command").value = "";
	
	cmdHistList.unshift(cmd);
	cmd = cmd.split(" ");
	runCmd(cmd[0], cmd.splice(1).join(" "));
};