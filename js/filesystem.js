'use strict';

class FSFile { // text, func, fold, link
    constructor(name, type, data) {
        this.name = name; //validate name and type
        this.type = type;
        this.parent = null;
        this.data = data;
    }

    toString() { return `${this.name}*`; }

    getPath() {
        let p = this.parent,
            s = `/${this.name}`;
        if(!p) return s;
        while(p.parent){
            s = `/${p.name + s}`;
            p = p.parent;
        }
        return s;
    }
}

class FSFolder extends FSFile {
    constructor(name) {
        super(name, 'fold', {});
    }

    addFile(file) {
        this.data[file.name] = file;
        file.parent = this;
    }

    import(array) {
        array.forEach(f => {
            let tmp;
            switch(f.type){
                case 'text': tmp = new FSFile(f.name, f.type, f.text); break;
                case 'func': tmp = new FSFile(f.name, f.type, new Function(f.args, f.body)); break;
                case 'func_obj': tmp = new FSFile(f.name, 'func', f.func); break;
                case 'link': tmp = new FSLink(f.name, f.path); break;
                case 'fold':
                    tmp = new FSFolder(f.name);
                    tmp.import(f.contents);
            }
            this.addFile(tmp);
        });
    }

    toString(depth=0,i=0) {
        if(depth === -1) depth = Infinity;
        let str = this.name + '/';
        if(depth === i) return str;
        for(let d in this.data){
            str += `\n${'    '.repeat(i+1) + this.data[d].toString(depth,i+1)}`;
        }
        return str;
    }
}

class FSLink extends FSFile {
    constructor(name, path) {
        super(name, 'link', path);
        // link data at path to this data
    }

    toString() {
        return this.name + ' -> ' + this.data; //temporary
    }
}

class FSRoot extends FSFolder {
    constructor() {
        super();
        this.name = '';
    }
}

const filesystem = {
    root: new FSRoot(),
    curr_dir: null,

    init() {
        this.root.import(import_data);
        shell.cd('/home/jasper');
    },

    fileFromPath(path) {
        if(path[0] !== '/'){
            console.log('relative path not supported yet');
            return;
        }
        path = path.split('/');
        let data_str = 'filesystem.root';
        path.forEach(p => {
            if(p !== '') data_str += `.data['${p}']`;
        });
        return new Function(`return ${data_str};`)();
    }
};

const import_data = [
    {
        "type": "fold",
        "name": "bin",
        "contents": [
            {
                "type": "func_obj",
                "name": "about",
                "func": () => {
                    shell.print('Hey, I\'m Jasper.');
                    return false;
                }
            },
            {
                "type": "func_obj",
                "name": "clear",
                "func": () => {
                    document.querySelector('#readout').innerHTML = '';
                    return true;
                }
            },
            {
                "type": "func_obj",
                "name": "contact",
                "func": () => {
                    shell.print([
                        '☎ +1 (831) 334-7779',
                        '✉ <a href="mailto:jasper.q.andrew@gmail.com">jasper.q.andrew@gmail.com</a>']);
                    return true;
                }
            },
            {
                "type": "link",
                "name": "cv",
                "path": "/bin/resume"
            },
            {
                "type": "func_obj",
                "name": "echo",
                "func": (argv) => {
                    [, ...argv] = argv;
                    let str = '';
                    argv.forEach(arg => { str += arg + ' '; });
                    shell.print(str);
                    return true;
                }
            },
            {
                "type": "func_obj",
                "name": "help",
                "func": (argv) => {
                    [, ...argv] = argv;
                    shell.print('blah');
                    argv.forEach(arg => {shell.print(arg);});
                    return true;
                }
            },
            {
                "type": "func_obj",
                "name": "jasper",
                "func": () => {
                    shell.print([
                        '          _____   _____ ____  __________',
                        '         / /   | / ___// __ \\/ ____/ __ \\',
                        '    __  / / /| | \\__ \\/ /_/ / __/ / /_/ /',
                        '   / /_/ / ___ |___/ / ____/ /___/ _, _/',
                        '   \\____/_/  |_/____/_/   /_____/_/ |_|','',''
                    ]);
                    return true;
                }
            },
            {
                "type": "func_obj",
                "name": "login",
                "func": () => {
                    shell.error('login: program not implemented');
                    return false;
                }
            },
            {
                "type": "func_obj",
                "name": "ls",
                "func": () => {
                    for(let f in filesystem.curr_dir.data){
                        shell.print(filesystem.curr_dir.data[f].toString());
                    }
                }
            },
            {
                "type": "func_obj",
                "name": "pwd",
                "func": () => {
                    shell.print(filesystem.curr_dir.getPath());
                }
            },
            {
                "type": "func_obj",
                "name": "resume",
                "func": () => {
                    shell.print('opening in new window...');
                    window.setTimeout(() => { window.open('http://www.jasperandrew.me/resume.pdf'); }, 500);
                    return true;
                }
            },
            {
                "type": "func_obj",
                "name": "welcome",
                "func": () => {
                    shell.print([
                        '                  WELCOME TO',
                        '',
                        '            J . E . S . U . S . S .',
                        '',
                        '        Jasper\'s Extremely Simplified',
                        '             Unix Shell Simulator','','','',''
                    ]);
                    return true;
                }
            },
        ]
    },
    {
        "type": "fold",
        "name": "home",
        "contents": [
            {
                "type": "fold",
                "name": "jasper",
                "contents": [
                    {
                        "type": "text",
                        "name": "test",
                        "text": 'blah'
                    }
                ]
            }
        ]
    }
];