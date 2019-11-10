import {JFileStructure} from './data/JFileStructure.mjs';
import {JShell} from './JShell.mjs';
import {JPath} from './data/JPath.mjs';

export class JSystem {
    constructor() {
        ////// Private Fields /////////////////
        let _file_struct, _shell, _user, _pc;

        ////// Public Fields //////////////////
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
            // header.update();
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

        this.startup = (settings, delay=0) => {
            this.run('clear');
            window.setTimeout(() => {
                if(settings.welcome) this.run('welcome');
                if(settings.cmd) settings.cmd.forEach(c => this.run(c));	
            }, delay);
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
        
        ////// Initialize /////////////////
        _shell = new JShell(this);
        _file_struct = new JFileStructure();
        _user = 'jasper';
        _pc = 'PC';
    }
}