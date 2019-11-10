import {JPath} from './data/JPath.mjs';
import {JFileStructure} from './data/JFileStructure.mjs';

export class JShell {
    constructor(_sys) {
        ////// Private Fields /////////////////
        let _printing, _print_queue, _print_delay,
            _el_command, _el_readout, _el_header;

        const _updateHeader = () => {
            _el_header.innerHTML = `${_sys.getUser()}@${_sys.getPC()}:${_file_struct.getCurrDir().getPath()}`;
        };

        ////// Public Fields //////////////////
        this.history = (() => {
            let _lvl = 0, _list = [], _curr = '',
                
            nav = (key) => {
                if(_lvl === 0) _curr = _el_command.value;

                if(key === 'ArrowUp'){
                    _lvl += (_lvl > _list.length-1 ? 0 : 1);
                }else if(key === 'ArrowDown'){
                    _lvl += (_lvl < 0 ? 0 : -1);
                }
            
                if(_lvl > 0) _el_command.value = _list[_lvl-1];
                else _el_command.value = _curr;    
            },
            
            add = (cmd) => {
                _lvl = 0;
                if(_list[0] !== cmd) _list.unshift(cmd);
            };

            return { nav: nav, add: add };
        })();

        this.error = (msg) => {
            this.print('[!] ' + msg);
        };

        this.print = (input='', newline=true) => {
            function doPrint() {
                if(queue.length === 0){
                    if(_print_queue.length > 0){
                        let p;
                        [p, ..._print_queue] = _print_queue;
                        if(util.typeof(p) === 'Array') queue = p;
                        else queue = [p];
                    }else{
                        _printing = false;
                        return true;    
                    }
                }

                let out, split;
                [out, ...queue] = queue;

                if(out === null){
                    doPrint();
                    return true;
                }
                
                out = out.toString();
                if(out === undefined) out = '<<ERR>>';

                split = out.split(/[\n\r]/);
                if(out !== split[0]){
                    [out, ...split] = split;
                    for(let i = split.length-1; i >= 0; i--)
                        queue.unshift(split[i]);
                }

                if(newline && out === '') out = ' '; // fix for visual glitch with <br>
                window.setTimeout(() => {
                    doPrint();
                }, _print_delay ? 17 : 0);
                _el_readout.innerHTML += out + (newline ? '\n' : '');
            }

            _print_queue.push(input);
            if(_printing) return true;

            let queue = [];
            _printing = true;
            doPrint();
        };

        this.submit = (cmd) => {
            if(!cmd){
                cmd = _el_command.value;
                _el_command.value = '';
            }

            this.print('> ' + cmd);

            if(/\S/.test(cmd)){
                this.history.add(cmd);
                _sys.run(cmd);
            }
        };
        
        ////// Initialize /////////////////
        _printing = false;
        _print_queue = [];
        _print_delay = true;

        _el_command = document.querySelector('#command');
        _el_readout = document.querySelector('#readout');
        _el_header = document.querySelector('#header');
    }
}