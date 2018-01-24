function keyNameFromEvent(event) {
    let side;
    switch(event.location){
        case 1: side = "l"; break;
        case 2: side = "r"; break;
        default: side = "";
    }
    //console.log(event.keyCode);
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
        case 59: return "scoln";
        case 61: return "equal";
        case 188: return "comma";
        case 173: return "dash";
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

function keyToggle(key_name, state) {
    if(state){
        docQS(".key." + key_name).classList.add("on");
    }else{
        docQS(".key." + key_name).classList.remove("on");
    }
};

function capsToggle() {
    if(caps_on)
        docQS(".key.caplk").classList.remove("lkd");
    else
        docQS(".key.caplk").classList.add("lkd");
};

function keyDown(e) {
    const event = window.event ? window.event : e;
    const key_pressed = keyNameFromEvent(event);

    if(key_pressed !== "error" && !passwd_mode) keyToggle(key_pressed, 1);
    if(typey_keys.indexOf(key_pressed) > -1){
        if(passwd_mode){
            docQS("#command").value += "*";
            return false;
        }
        histLvl = 0;
    }

    if(key_pressed === "caplk") capsToggle();
    if(key_pressed === "enter") submitLine();

    if(!screen_on && key_pressed !== "error") return false;
    if(key_pressed === "up" || key_pressed === "down") cmdHistory(key_pressed);
    if(["up","down","tab"].indexOf(key_pressed) > -1) return false;
};

function keyUp(e) {
    const event = window.event ? window.event : e;
    const key_pressed = keyNameFromEvent(event);

    if(key_pressed !== "error") keyToggle(key_pressed, 0);
    if(key_pressed === "caplk") caps_on = (caps_on ? false : true);
};

function togglePower() {
    docQS('#light').classList.toggle('on');
    docQS('#screen').classList.toggle('on');
    screen_on = (screen_on ? false : true);
    var cmd = docQS("#command");
    cmd.selectionStart = cmd.selectionEnd = cmd.value.length;
    cmd.focus();
};

function allKeysOff() {
    var keys = document.getElementsByClassName("key");
    for(var i = 0; i < keys.length; i++){
        if(keys[i].classList.contains("on"))
        keys[i].classList.remove("on");
    }
};

function caretBlink() {
    if(docQS("#caret").style.color === "transparent")
        docQS("#caret").style.color = "#1baf20";
    else
        docQS("#caret").style.color = "transparent";
};

function caretUpdate() {
    docQS("#caret").innerHTML = "&nbsp;".repeat(docQS("#command").value.length) + "▋";
}

function initialize() {
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    docQS('.button.power').onclick = togglePower;
    docQS('html').onmousedown = function() { docQS("#command").focus(); return false;};
    window.onblur = allKeysOff;
    togglePower(); // temporary
    setInterval(caretBlink, 500);
    setInterval(caretUpdate, 10);
};

initialize();
