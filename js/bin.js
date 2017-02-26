var bin = {

  // prints to the console
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
		return args;
	},

  // clears the console
	clear: function() {
		document.querySelector("#readout").innerHTML = "";
    return null;
	},

  // opens resume in new window
	resume: function() {
		window.open("http://www.jasperandrew.me/resume.pdf");
    return null;
	},

  // opens cv in new window (hint: same as resume)
	cv: function() {
		window.open("http://www.jasperandrew.me/resume.pdf");
    return null;
	},

  // prints "jasper" to the console all fancy-like
	jasper: function() {
    var str = "";
    str += "&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_____&nbsp;&nbsp;_____<br>";
		str += "&nbsp;&nbsp;&nbsp;|_&nbsp;&nbsp;|&nbsp;/&nbsp;_&nbsp;\\&nbsp;/&nbsp;&nbsp;___||&nbsp;&nbsp;_&nbsp;&nbsp;\\|&nbsp;&nbsp;___||&nbsp;&nbsp;_&nbsp;&nbsp;\\<br>";
		str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|/&nbsp;/_\\&nbsp;\\\\&nbsp;`--.&nbsp;|&nbsp;|_/&nbsp;/|&nbsp;|__&nbsp;&nbsp;|&nbsp;|_/&nbsp;/<br>";
		str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;||&nbsp;&nbsp;_&nbsp;&nbsp;|&nbsp;`--.&nbsp;\\|&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;__|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;/<br>";
		str += "&nbsp;/\\__/&nbsp;/|&nbsp;|&nbsp;|&nbsp;|/\\__/&nbsp;/|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|___&nbsp;|&nbsp;|\\&nbsp;\\<br>";
		str += "&nbsp;\\____/&nbsp;\\_|&nbsp;|_/\\____/&nbsp;\\_|&nbsp;&nbsp;&nbsp;&nbsp;\\____/&nbsp;\\_|&nbsp;\\_|<br>";
    return str;
	}
};
