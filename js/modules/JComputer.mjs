import {JSystem} from './JSystem.mjs';
import {JShell} from './JShell.mjs';
import {JKeyboard} from './JKeyboard.mjs';

export class JComputer {
    constructor() {
        ////// Private Fields /////////////////
        let _sys, _shell, _keyboard, _settings, _on;

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

        this.togglePower = () => {
            document.querySelector('#light').classList.toggle('on');
            document.querySelector('#screen').classList.toggle('on');
            _on = !_on;

            document.querySelector('#command').focus();
        };

        this.isOn = () => _on;

        this.keyInput = (key) => {
            // console.log(key);
            switch(key) {
                case 'CHAR_KEY': _shell.history.setLvl(0); break;
                case 'Enter': _shell.submit(); break;
                case 'ArrowUp':
                case 'ArrowDown': _shell.history.nav(key); break;
                default: console.log('unsupported key');
            }
        };

        ////// Initialize /////////////////////
        document.querySelector('.button.power').onclick = this.togglePower;
        document.querySelector('html').onmousedown = () => {
            document.querySelector('#command').focus();
            return false;
        };

        _sys = new JSystem();
        _shell = new JShell(_sys);
        _keyboard = new JKeyboard(this);

        _settings = {
            on: true,
            welcome: true,
            cmd: []
        };
        _on = false;

        this.importSettingsFromURL();
        if(_settings['on']) this.togglePower();

        _sys.startup(_settings);
    }
}