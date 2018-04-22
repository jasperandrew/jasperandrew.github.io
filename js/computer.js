'use strict';

const computer = {
    settings: {
        default: {
            on: false,
            welcome: true,
            cmd: [],
        },

        importFromURL() {
            let self = computer.settings;
            const url = window.location.href,
                start = url.indexOf('?') + 1;

            if(start === 0) return false;

            const end = (url.indexOf('#') + 1 || url.length + 1) - 1,
                params = url.slice(start, end);

            if(params.length < 1) return false;
            
            const pairs = params.replace(/\+/g, ' ').split('&'),
                bool = [
                    ['on', 'welcome'], 
                    ['1','true','yes','yep'],
                    ['0','false','no','nope']
                ];

            pairs.forEach(pair => {
                let p = pair.split('=', 2);
                let name = decodeURIComponent(p[0]).trim(), // setting name
                    val = decodeURIComponent(p[1]); // setting value

                if(bool[0].indexOf(name) > -1){ // one of the boolean settings
                    if(bool[1].indexOf(val) > -1){ // true
                        self.default[name] = true;
                    }else if(bool[2].indexOf(val) > -1){ // false
                        self.default[name] = false;
                    }else{ // invalid value
                        console.log('Value \'' + val + '\' is invalid for setting \'' + name + '\'. Skipping...');
                    }
                }else if(self.default[name] !== undefined){ // any other setting
                    if(typeof(self.default[name]) === 'string') self.default[name] = val;
                    if(typeof(self.default[name]) === 'object') self.default[name].push(val);
                }else{
                    console.log('Setting \'' + val + '\' does not exist. Skipping...');
                }
            });

            return true;
        }
    },

    power: {
        on: false,

        toggle(state=0) {
            let self = computer.power;

            document.querySelector('#light').classList.toggle('on');
            document.querySelector('#screen').classList.toggle('on');
            self.on = !self.on;

            document.querySelector('#command').focus();

            if(self.on) shell.startup(250);
        }
    },

    keyboard: {
        max_chars: 36,
        caps: false,
        passwd: false,
        char_keys: [
            'Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal',
            'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash',
            'KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote',
            'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','Space'
        ],
        lefties: ['Backspace','ArrowLeft'],
        
        keyToggle(code, state) {
            let key = document.querySelector('.key.' + code);
            if(key !== null) {
                if(state) key.classList.add('on');
                else key.classList.remove('on');
            }
        },

        capsToggle() {
            let cap = computer.keyboard.caps;
            cap = !cap;
            document.querySelector('.key.CapsLock').classList.toggle('locked');
        },

        keyDown(e) {
            const event = window.event ? window.event : e;
            const self = computer.keyboard;
            const cmd = document.querySelector('#command');

            if(!event.altKey) {
                document.querySelector('.AltLeft').classList.remove('on');
                document.querySelector('.AltRight').classList.remove('on');
            }

            if(!self.passwd) self.keyToggle(event.code, 1);
            if(self.char_keys.indexOf(event.code) > -1){
                if(self.passwd){
                    cmd.value += '*';
                    event.preventDefault();
                }
                shell.history.lvl = 0;
            }
        
            if(event.code === 'CapsLock' && !event.repeat) self.capsToggle();
            if(event.code === 'Enter'){
                shell.submit(cmd.value);
                cmd.value = '';
            }
        
            if(!computer.power.on && event.code !== undefined) return false;
            if(event.code === 'ArrowUp' || event.code === 'ArrowDown') shell.history.nav(event.code);
            if(['ArrowUp','ArrowDown','Tab'].indexOf(event.code) > -1) event.preventDefault();

            computer.caret.update(event);
        },

        keyUp(e) {
            const event = window.event ? window.event : e;
            const self = computer.keyboard;
            self.keyToggle(event.code, 0);
            
            computer.caret.update();
        },

        toggleAll(on=false) {
            document.querySelectorAll('.key').forEach(key => key.classList.remove('on'));
        }

    },

    caret: {
        color: '#39ab3d',
        
        blink() {
            let self = computer.caret;
            if(self.color === 'transparent')
                document.querySelector('#caret').style.color = self.color = '#39ab3d';
            else
                document.querySelector('#caret').style.color = self.color = 'transparent';    
        },
        
        update(e) {
            let cmd = document.querySelector('#command'),
            pos = cmd.selectionStart,
            diff = 0;

            if(e){
                if(e.ctrlKey){
                }else if(computer.keyboard.char_keys.indexOf(e.code) > -1 && cmd.value.length < cmd.attributes.maxlength.value){
                    diff = 1;
                }else if(e.code === "ArrowRight" && pos < cmd.attributes.maxlength.value && cmd.value.length > 0 && pos < cmd.value.length){
                    diff = 1;
                }else if(computer.keyboard.lefties.indexOf(e.code) > -1 && pos > 0){
                    diff = -1;
                }
            }

            document.querySelector('#caret').innerHTML = '&nbsp;'.repeat(pos + diff) + '<span>█</span>';
        }
    },

    init() {
        // listeners
        document.onkeydown = computer.keyboard.keyDown;
        document.onkeyup = computer.keyboard.keyUp;
        document.querySelector('.button.power').onclick = computer.power.toggle;
        document.querySelector('html').onmousedown = function() { document.querySelector('#command').focus(); return false;};
        document.onblur = computer.keyboard.toggleAll;
        
        // caret
        computer.caret.update();
        //setInterval(computer.caret.blink, 500);

        // import settings from url
        computer.settings.importFromURL();
        if(computer.settings.default.on) computer.power.toggle();

        // temporary construction stuff
        computer.power.toggle();
        //shell.submit('echo "Under Construction"');
    }
}