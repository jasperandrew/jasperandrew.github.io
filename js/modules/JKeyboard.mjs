export class JKeyboard {
    constructor(_computer) {
        ////// Private Fields /////////////////
        let _caps, _passwd, _key_elems = {},
        _char_keys = [
            'Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal',
            'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash',
            'KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote',
            'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','Space'
        ],
        lefties = ['Backspace','ArrowLeft'],

        _keyOn = (code) => {
            if(_key_elems[code] === undefined){
                const key = document.querySelector('.key.' + code);
                if(!key) _key_elems[code] = null;
                else _key_elems[code] = key;
            }
            const el = _key_elems[code];
            if(el) el.classList.add('on');
        },

        _keyOff = (code) => {
            const el = _key_elems[code];
            if(el) el.classList.remove('on');
        },

        _allOff = () => {
            document.querySelectorAll('.key').forEach(key => key.classList.remove('on'));
        },

        _capsToggle = () => {
            _caps = !_caps;
            _key_elems['CapsLock'].classList.toggle('locked');
        },

        _keyDown = (e) => {
            const event = window.event ? window.event : e;
            const prompt = document.querySelector('#command');

            if(!event.altKey) {
                document.querySelector('.AltLeft').classList.remove('on');
                document.querySelector('.AltRight').classList.remove('on');
            }

            if(!_passwd) _keyOn(event.code);
            if(_char_keys.indexOf(event.code) > -1){
                if(_passwd){
                    prompt.value += '*';
                    event.preventDefault();
                }
                _computer.keyInput('CHAR_KEY');
            }
        
            if(event.code === 'CapsLock' && !event.repeat) _capsToggle();

            _computer.keyInput(event.code);

            // if(!_computer.isOn() && event.code !== undefined) return false;
            // if(['ArrowUp','ArrowDown','Tab'].indexOf(event.code) > -1) event.preventDefault();
        },

        _keyUp = (e) => {
            const event = window.event ? window.event : e;
            _keyOff(event.code);
        };

        ////// Initialize /////////////////////
        _passwd = false;

        document.onkeydown = _keyDown;
        document.onkeyup = _keyUp;
        document.onblur = _allOff;
    }
}
