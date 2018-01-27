function keyNameFromEvent(e) {
    const side = { 0:'', 1:'l', 2:'r', 3:'num' }[e.location];
    const keys = {
        '`':'grave', '~':'grave',
        '1':'one', '!':'one',
        '2':'two', '@':'two',
        '3':'three', '#':'three',
        '4':'four', '$':'four',
        '5':'five', '%':'five',
        '6':'six', '^':'six',
        '7':'seven', '&':'seven',
        '8':'eight', '*':'eight',
        '9':'nine', '(':'nine',
        '0':'zero', ')':'zero',
        '-':'dash', '_':'dash',
        '=':'equal', '+':'equal',
        '[':'lbracket', '{':'lbracket',
        ']':'rbracket', '}':'rbracket',
        '\\':'backslash', '|':'backslash',
        ';':'semicolon', ':':'semicolon',
        "'":'quote', '"':'quote',
        ',':'comma', '<':'comma',
        '.':'period', '>':'period',
        '/':'slash', '?':'slash',
        ' ':'space'
    };
    const key = keys[e.key];
    return side + (key !== undefined ? key : e.key.toLowerCase());
};

function keyToggle(key_name, state) {
    let key = docQS('.key.' + key_name);
    if(key !== null) {
        if(state){
            key.classList.add('on');
        }else{
            key.classList.remove('on');
        }
    }
};

function capsToggle() {
    if(caps_on)
        docQS('.key.capslock').classList.remove('locked');
    else
        docQS('.key.capslock').classList.add('locked');
};

function keyDown(e) {
    const event = window.event ? window.event : e;
    const key_pressed = keyNameFromEvent(event);

    if(key_pressed !== 'error' && !passwd_mode) keyToggle(key_pressed, 1);
    if(typey_keys.indexOf(key_pressed) > -1){
        if(passwd_mode){
            docQS('#command').value += '*';
            return false;
        }
        histLvl = 0;
    }

    if(key_pressed === 'capslock') capsToggle();
    if(key_pressed === 'enter') shell.submit();

    if(!screen_on && key_pressed !== 'error') return false;
    if(key_pressed === 'arrowup' || key_pressed === 'arrowdown') shell.history.nav(key_pressed);
    if(['arrowup','arrowdown','tab'].indexOf(key_pressed) > -1) return false;
};

function keyUp(e) {
    const event = window.event ? window.event : e;
    const key_pressed = keyNameFromEvent(event);

    if(key_pressed !== 'error') keyToggle(key_pressed, 0);
    if(key_pressed === 'capslock') caps_on = (caps_on ? false : true);
};

function togglePower() {
    docQS('#light').classList.toggle('on');
    docQS('#screen').classList.toggle('on');
    screen_on = (screen_on ? false : true);
    var cmd = docQS('#command');
    cmd.selectionStart = cmd.selectionEnd = cmd.value.length;
    cmd.focus();
};

function allKeysOff() {
    var keys = document.getElementsByClassName('key');
    for(var i = 0; i < keys.length; i++){
        if(keys[i].classList.contains('on'))
        keys[i].classList.remove('on');
    }
};

function caretBlink() {
    if(docQS('#caret').style.color === 'transparent')
        docQS('#caret').style.color = '#1baf20';
    else
        docQS('#caret').style.color = 'transparent';
};

function caretUpdate() {
    docQS('#caret').innerHTML = '&nbsp;'.repeat(docQS('#command').value.length) + '<span>▋</span>';
}

function initialize() {
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    docQS('.button.power').onclick = togglePower;
    docQS('html').onmousedown = function() { docQS('#command').focus(); return false;};
    window.onblur = allKeysOff;
    togglePower(); // temporary
    setInterval(caretBlink, 500);
    setInterval(caretUpdate, 10);
};

initialize();
