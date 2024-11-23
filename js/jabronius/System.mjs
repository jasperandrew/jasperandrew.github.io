import { Shell } from './firmware/Shell.mjs';
import { Keyboard, ModCtrl } from './hardware/Keyboard.mjs';
import { Display } from './hardware/Display.mjs';
import { JFileStructure } from './data/JFileStructure.mjs';
import { JPath } from './data/JPath.mjs';

export class System {
    constructor() {
        ////// Private Fields /////////////////
        let _settings,
            _display, _keyboard, _cpu, _drive,
            _shell;

        let _file_struct, _user, _pc;

        ////// Public Fields //////////////////
        this.importSettingsFromURL = () => {
            const url = window.location.href,
                start = url.indexOf('?') + 1;

            if (start === 0) return false;

            const end = (url.indexOf('#') + 1 || url.length + 1) - 1,
                paramStr = url.slice(start, end);
            if (paramStr.length < 1) return false;
            
            const pairs = paramStr.replace(/\+/g, ' ').split('&'),
                truthy = ['1','true','yes','yep','on'],
                falsey = ['0','false','no','nope','off'];

            pairs.forEach(pair => {
                let p = pair.split('=', 2);
                let name = decodeURIComponent(p[0]).trim(), // setting name
                    val = decodeURIComponent(p[1]); // setting value
                let type = util.typeof(_settings[name]);

                switch (type) {
                    case 'Boolean': {
                        if (truthy.indexOf(val) > -1) {
                            _settings[name] = true;
                            break;
                        }
                        if (falsey.indexOf(val) > -1) {
                            _settings[name] = false;
                            break;
                        }
                        console.log(`Value '${val}' is invalid for setting '${name}'. Skipping...`);
                        break;
                    }
                    case "String": {
                        _settings[name] = val;
                        break;
                    }
                    case "Array": {
                        _settings[name].push(val);
                        break;
                    }
                    default:
                        console.log(`Setting '${name}' does not exist. Skipping...`);
                }
            });

            return true;
        };

        this.onKeySignal = (signal) => {
            const prompt = document.querySelector('#command');

            if (signal.char) {
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

        this.getFileStruct = () => _file_struct;
        this.getShell = () => _shell;
        this.getUser = () => _user;
        this.getPC = () => _pc;

        this.cd = (path) => {
            if(!path) path = '/home/jasper';
            let file = _file_struct.getFileFromPath(path, true);
            if(!file){
                _shell.error(`${path}: does not exist`);
                return false;
            }
            
            if(file.getType().search('fldr') === -1){
                _shell.error(`${path}: not a directory`);
                return false;
            }

            _file_struct.setCurDir(file);
            return true;
        };

        this.run = (argstr, dir=_file_struct.getFileFromPath('/bin')) => {
            if(util.typeof(argstr) !== 'String'){
                console.error('Arguments must be a string');
                return false;
            }

            const args = util.parseArgs(argstr),
                    cmd = args[0];
            // console.log(args);

            if(cmd === 'cd'){
                this.cd(args[1]);
                return true;
            }
            // console.log(dir.getName());

            if (dir.getData()[cmd] !== undefined){
                const f = new Function(['sys','shell','fs','args'], dir.getData()[cmd].getData());
                return f(this, _shell, _file_struct, args);
            }else{
                _shell.error(`${cmd}: command not found`);
                return false;
            }
        };

        this.startup = (settings) => {
            this.run('clear');
            if(settings.welcome) this.run('welcome');
            if(settings.cmd) settings.cmd.forEach(c => this.run(c));	
        };

        this.write = (data='', path, append=false) => {
            const fp = new JPath(path);
            let file;
            if(!_file_struct.isValidPath(fp.toString())){
                fp.up();
                if(!_file_struct.isValidPath(fp.toString())){
                    _shell.error(`${fp.toString()} does not exist`);
                    return false;
                }
                file = new JFile(fp.getLeaf(), 'data', null);
                _file_struct.getFileFromPath(fp.toString()).addFile(file);
            }else{
                file = fp.getFile();
            }

            if(file.type !== 'data'){
                _shell.error(`${file.getPath()} is not writable`);
                return false;
            }
            
            file.setData(append ? file.getData() + data : data);
            return true;
        };

        ////// Initialize /////////////////////
        _settings = {
            on: true,
            welcome: true,
            cmd: []
        };

        _display = new Display();
        _keyboard = new Keyboard(this);
        // _cpu = new Processor();
        // _drive = new Drive();
        _shell = new Shell(this);

        this.importSettingsFromURL();
        if (_settings['on']) _display.togglePower();

        _file_struct = new JFileStructure();
        _user = 'jasper';
        _pc = 'PC';

        this.startup(_settings);
    }
}