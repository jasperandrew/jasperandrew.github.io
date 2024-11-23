export class Keyboard {
    constructor(_computer) {
        ////// Private Fields /////////////////
        let _caps, _passwd, _key_elems = {},

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

            _computer.onKeySignal(KeyInputSignal.fromKeyboardEvent(event));

            if(!event.altKey) {
                document.querySelector('.AltLeft').classList.remove('on');
                document.querySelector('.AltRight').classList.remove('on');
            }

            if(!_passwd) _keyOn(event.code);
                    
            if(event.code === 'CapsLock' && !event.repeat) _capsToggle();

            event.preventDefault();

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

export const ModShift = "Shift";
export const ModCtrl = "Control";
export const ModAlt = "Alt";
export const ModMeta = "Meta";

export class KeyInputSignal {
    constructor(char, code, modifiers) {
        ////// Public Fields //////////////////
        this.char = char;
        this.code = code;
        this.modifiers = modifiers;

        this.mod = (modCode) => {
            if (![ModShift,ModCtrl,ModAlt,ModMeta].includes(modCode)) return undefined;
            return modifiers.includes(modCode);
        }
    }

    static fromKeyboardEvent(e) {
        const modifiers = [];
        if (e.shiftKey) modifiers.push(ModShift);
        if (e.ctrlKey) modifiers.push(ModCtrl);
        if (e.altKey) modifiers.push(ModAlt);
        if (e.metaKey || e.getModifierState("OS")) modifiers.push(ModMeta);
        return new KeyInputSignal(e.key, e.code, modifiers);
    }
}