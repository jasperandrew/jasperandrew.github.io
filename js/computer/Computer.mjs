import { JSystem } from './firmware/JSystem.mjs';
import { JShell } from './firmware/JShell.mjs';
import { Keyboard, ModCtrl } from './hardware/Keyboard.mjs';
import { Display } from './hardware/Display.mjs';

export class Computer {
    constructor() {
        ////// Private Fields /////////////////
        let _sys, _shell, _display, _keyboard, _settings;

        ////// Public Fields //////////////////
        this.importSettingsFromURL = () => {
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
                        _settings[name] = true;
                    }else if(bool[2].indexOf(val) > -1){ // false
                        _settings[name] = false;
                    }else{ // invalid value
                        console.log(`Value '${val}' is invalid for setting '${name}'. Skipping...`);
                    }
                }else if(s !== undefined){ // any other setting
                    if(s === "String") _settings[name] = val;
                    if(s === "Array") _settings[name].push(val);
                }else{
                    console.log(`Setting '${name}' does not exist. Skipping...`);
                }
            });

            return true;
        };

        this.onKeySignal = (signal) => {
            console.log(signal);
            let char_key_codes = [
                'Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal',
                'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash',
                'KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote',
                'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','Space'
            ];
            
            const prompt = document.querySelector('#command');

            if (char_key_codes.indexOf(signal.code) > -1){
                prompt.value += signal.char;
                _shell.history.setLvl(0);
                return;
            }
    
            switch (signal.code) {
                case 'Enter': _shell.submit(); break;
                case 'ArrowUp':
                case 'ArrowDown': _shell.history.nav(signal); break;
                case 'Backspace':
                    if (signal.mod(ModCtrl)) {
                        let val = prompt.value;
                        const match = val.match(/\S*\s*$/);
                        prompt.value = val.slice(0, val.lastIndexOf(match));
                    } else {
                        prompt.value = prompt.value.slice(0, -1);
                    }
                default:
            }
        };

        ////// Initialize /////////////////////
        _sys = new JSystem();
        _shell = new JShell(_sys);
        _display = new Display();
        _keyboard = new Keyboard(this);

        _settings = {
            on: true,
            welcome: true,
            cmd: []
        };

        this.importSettingsFromURL();
        if(_settings['on']) _display.togglePower();

        _sys.startup(_settings);
    }
}