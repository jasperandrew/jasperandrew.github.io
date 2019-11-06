'use strict';

const computer = {
    settings: {
        list: {
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
                    ['1','true','yes','yep','on'],
                    ['0','false','no','nope','off']
                ];

            pairs.forEach(pair => {
                let p = pair.split('=', 2);
                let name = decodeURIComponent(p[0]).trim(), // setting name
                    val = decodeURIComponent(p[1]); // setting value
                let s = util.typeof(self.list[name]);

                if(bool[0].indexOf(name) > -1){ // one of the boolean settings
                    if(bool[1].indexOf(val) > -1){ // true
                        self.list[name] = true;
                    }else if(bool[2].indexOf(val) > -1){ // false
                        self.list[name] = false;
                    }else{ // invalid value
                        console.log(`Value '${val}' is invalid for setting '${name}'. Skipping...`);
                    }
                }else if(s !== undefined){ // any other setting
                    if(s === "String") self.list[name] = val;
                    if(s === "Array") self.list[name].push(val);
                }else{
                    console.log(`Setting '${name}' does not exist. Skipping...`);
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
            const prompt = document.querySelector('#command');

            if(!event.altKey) {
                document.querySelector('.AltLeft').classList.remove('on');
                document.querySelector('.AltRight').classList.remove('on');
            }

            if(!self.passwd) self.keyToggle(event.code, 1);
            if(self.char_keys.indexOf(event.code) > -1){
                if(self.passwd){
                    prompt.value += '*';
                    event.preventDefault();
                }
                shell.history.lvl = 0;
            }
        
            if(event.code === 'CapsLock' && !event.repeat) self.capsToggle();
            if(event.code === 'Enter'){
                shell.submit();
            }
        
            if(!computer.power.on && event.code !== undefined) return false;
            if(event.code === 'ArrowUp' || event.code === 'ArrowDown') shell.history.nav(event.code);
            if(['ArrowUp','ArrowDown','Tab'].indexOf(event.code) > -1) event.preventDefault();
        },

        keyUp(e) {
            const event = window.event ? window.event : e;
            const self = computer.keyboard;
            self.keyToggle(event.code, 0);
        },

        toggleAll(on=false) {
            document.querySelectorAll('.key').forEach(key => key.classList.remove('on'));
        }

    },

    init() {
        sys.init();

        // listeners
        document.onkeydown = computer.keyboard.keyDown;
        document.onkeyup = computer.keyboard.keyUp;
        document.querySelector('.button.power').onclick = computer.power.toggle;
        document.querySelector('html').onmousedown = function() { document.querySelector('#command').focus(); return false;};
        document.onblur = computer.keyboard.toggleAll;
        
        // import settings from url
        computer.settings.importFromURL();
        if(computer.settings.list.on) computer.power.toggle();

        // temporary construction stuff
        computer.power.toggle();
        //shell.submit('echo "Under Construction"');
    }
}