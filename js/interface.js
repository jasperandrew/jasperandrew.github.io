const interface = {
    power: {
        on: false,

        toggle() {
            let self = interface.power;
            docQS('#light').classList.toggle('on');
            docQS('#screen').classList.toggle('on');
            self.on = (self.on ? false : true);
            docQS('#command').focus();
        }
    },

    keyboard: {
        caps: false,
        passwd: false,
        char_keys: [
            'Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal',
            'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash',
            'KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote',
            'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash'
        ],
        
        keyToggle(code, state) {
            let key = docQS('.key.' + code);
            if(key !== null) {
                if(state){
                    key.classList.add('on');
                }else{
                    key.classList.remove('on');
                }
            }
        },

        capsToggle() {
            caps_on = (caps_on ? false : true);
            if(interface.keyboard.caps)
                docQS('.key.CapsLock').classList.remove('locked');
            else
                docQS('.key.CapsLock').classList.add('locked');
        },

        keyDown(e) {
            const event = window.event ? window.event : e;
            const self = interface.keyboard;

            if(!self.passwd) self.keyToggle(event.code, 1);
            if(self.char_keys.indexOf(event.code) > -1){
                if(self.passwd){
                    docQS('#command').value += '*';
                    event.preventDefault();
                }
                shell.history.lvl = 0;
            }
        
            if(event.code === 'CapsLock' && !event.repeat) self.capsToggle();
            if(event.code === 'Enter') shell.submit();
        
            if(!interface.power.on && event.code !== undefined) return false;
            if(event.code === 'ArrowUp' || event.code === 'ArrowDown') shell.history.nav(event.code);
            if(['ArrowUp','ArrowDown','Tab'].indexOf(event.code) > -1) event.preventDefault();
        },

        keyUp(e) {
            const event = window.event ? window.event : e;
            const self = interface.keyboard;

            self.keyToggle(event.code, 0);
        }

    },

    caret: {
        color: '#1baf20',
        pos: 0,
        
        blink() {
            let self = interface.caret;
            if(self.color === 'transparent')
                docQS('#caret').style.color = self.color = '#1baf20';
            else
                docQS('#caret').style.color = self.color = 'transparent';    
        },
        
        update() {
            docQS('#caret').innerHTML = '&nbsp;'.repeat(docQS('#command').value.length) + '<span>▋</span>';
        }
    },

    init() {
        document.onkeydown = interface.keyboard.keyDown;
        document.onkeyup = interface.keyboard.keyUp;
        docQS('.button.power').onclick = interface.power.toggle;
        docQS('html').onmousedown = function() { docQS('#command').focus(); return false;};
        window.onblur = interface.keyboard.allOff;
        interface.power.toggle(); // temporary
        setInterval(interface.caret.blink, 500);
        setInterval(interface.caret.update, 10);
    }
}

interface.init();