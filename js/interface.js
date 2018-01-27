const interface = {
    power: {
        on: false,

        toggle() {
            let self = interface.power;
            document.querySelector('#light').classList.toggle('on');
            document.querySelector('#screen').classList.toggle('on');
            self.on = (self.on ? false : true);
            document.querySelector('#command').focus();
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
        
        keyToggle(code, state) {
            let key = document.querySelector('.key.' + code);
            if(key !== null) {
                if(state) key.classList.add('on');
                else key.classList.remove('on');
            }
        },

        capsToggle() {
            let cap = interface.keyboard.caps;
            cap = !cap;
            document.querySelector('.key.CapsLock').classList.toggle('locked');
        },

        keyDown(e) {
            const event = window.event ? window.event : e;
            const self = interface.keyboard;
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
        
            if(!interface.power.on && event.code !== undefined) return false;
            if(event.code === 'ArrowUp' || event.code === 'ArrowDown') shell.history.nav(event.code);
            if(['ArrowUp','ArrowDown','Tab'].indexOf(event.code) > -1) event.preventDefault();

            interface.caret.update(event.code);
        },

        keyUp(e) {
            const event = window.event ? window.event : e;
            const self = interface.keyboard;
            self.keyToggle(event.code, 0);
        },

        toggleAll(on=false) {
            document.querySelectorAll('.key').forEach(key => key.classList.remove('on'));
        }

    },

    caret: {
        color: 'transparent',
        pos: 0,
        
        blink() {
            let self = interface.caret;
            if(self.color === 'transparent')
                document.querySelector('#caret').style.color = self.color = '#1baf20';
            else
                document.querySelector('#caret').style.color = self.color = 'transparent';    
        },
        
        update(code) {
            let self = interface.caret;
            let cmd = document.querySelector('#command');
    
            if(code === 'Enter') self.pos = 0;
            if((code === 'ArrowRight' && self.pos < cmd.value.length) || 
                (interface.keyboard.char_keys.indexOf(code) > -1 && self.pos < interface.keyboard.max_chars)) self.pos++;
            if(['ArrowLeft','Backspace'].indexOf(code) > -1 && self.pos > 0) self.pos--;

            if(!code || ['ArrowUp','ArrowDown'].indexOf(code) > -1){
                self.pos = cmd.value.length;
                cmd.selectionStart = cmd.selectionEnd = cmd.value.length;
            }

            document.querySelector('#caret').innerHTML = '&nbsp;'.repeat(self.pos) + '<span>▋</span>';
        }
    },

    init() {
        document.onkeydown = interface.keyboard.keyDown;
        document.onkeyup = interface.keyboard.keyUp;
        document.querySelector('.button.power').onclick = interface.power.toggle;
        document.querySelector('html').onmousedown = function() { document.querySelector('#command').focus(); return false;};
        document.onblur = interface.keyboard.toggleAll;
        interface.caret.update();
        setInterval(interface.caret.blink, 500);

        // temporary construction stuff
        interface.power.toggle();
        shell.submit('echo "Under Construction"');
    }
}