var screenOn = false,
		capsOn = false,
		typeyKeys = "graveonetwothreefourfivesixseveneightninezerodashequalbksplbrktrbrktbslshscolnapostcommastopfslshspaceqyj";

function keyNameFromEvent(event) {
	var side;
  switch(event.location){
    case 1: side = "l"; break;
    case 2: side = "r"; break;
    default: side = "";
  }
  switch(event.keyCode){
    case 8: return "bksp";
    case 9: return "tab";
    case 13: return "enter";
    case 16: return side + "shft";
    case 17: return side + "ctrl";
    case 18: return side + "alt";
    case 20: return "caplk";
    case 32: return "space";
    case 37: return "left";
    case 38: return "up";
    case 39: return "right";
    case 40: return "down";
    case 48: return "zero";
    case 49: return "one";
    case 50: return "two";
    case 51: return "three";
    case 52: return "four";
    case 53: return "five";
    case 54: return "six";
    case 55: return "seven";
    case 56: return "eight";
    case 57: return "nine";
    case 65: return "a";
    case 66: return "b";
    case 67: return "c";
    case 68: return "d";
    case 69: return "e";
    case 70: return "f";
    case 71: return "g";
    case 72: return "h";
    case 73: return "i";
    case 74: return "j";
    case 75: return "k";
    case 76: return "l";
    case 77: return "m";
    case 78: return "n";
    case 79: return "o";
    case 80: return "p";
    case 81: return "q";
    case 82: return "r";
    case 83: return "s";
    case 84: return "t";
    case 85: return "u";
    case 86: return "v";
    case 87: return "w";
    case 88: return "x";
    case 89: return "y";
    case 90: return "z";
    case 186: return "scoln";
    case 187: return "equal";
    case 188: return "comma";
    case 189: return "dash";
    case 190: return "stop";
    case 191: return "fslsh";
    case 192: return "grave";
    case 219: return "lbrkt";
    case 220: return "bslsh";
    case 221: return "rbrkt";
    case 222: return "apost";
    default: return "error";
  }
};

function keyToggle(key, state) {
	if(state)
		document.querySelector(".key." + key).classList.add("on");
	else
		document.querySelector(".key." + key).classList.remove("on");		
};

function capsToggle() {
	if(capsOn)
		document.querySelector(".key.caplk").classList.remove("lkd");
	else
		document.querySelector(".key.caplk").classList.add("lkd");		
};

/* function cmdLineBegin() {
	return document.querySelector("#command").selectionStart === 8;
}; */

function keyDown(e) {
  var event = window.event ? window.event : e;
  var keyPressed = keyNameFromEvent(event);
	
  if(keyPressed !== "error") keyToggle(keyPressed, 1);
	if(typeyKeys.indexOf(keyPressed) > -1) histLvl = 0;

  if(keyPressed === "caplk") capsToggle();
	if(keyPressed === "enter") submitLine();
	
	if(!screenOn && keyPressed !== "error") return false;
	//if(["bksp","left"].indexOf(keyPressed) > -1 && cmdLineBegin()) return false;
	if(keyPressed === "up" || keyPressed === "down") cmdHistory(keyPressed);
	if(["up","down","tab"].indexOf(keyPressed) > -1) return false;
};

function keyUp(e) {
  var event = window.event ? window.event : e;
  var keyPressed = keyNameFromEvent(event);

  if(keyPressed !== "error") keyToggle(keyPressed, 0);
	if(keyPressed === "caplk") capsOn = (capsOn ? false : true);
};

function focusCommand() {
	var cmd = document.querySelector("#command");
	cmd.focus();
};

function togglePower() {
	document.querySelector('#light').classList.toggle('on');
  document.querySelector('#screen').classList.toggle('on');
	screenOn = (screenOn ? false : true);
	var cmd = document.querySelector("#command");
	cmd.selectionStart = cmd.selectionEnd = cmd.value.length;
};

function initialize() {
	document.onkeydown = keyDown;
	document.onkeyup = keyUp;
	document.ondragstart = function(){return false;};
	document.querySelector('.button.power').onclick = togglePower;
	setInterval(focusCommand, 10);
	togglePower(); // temporary
};

initialize();