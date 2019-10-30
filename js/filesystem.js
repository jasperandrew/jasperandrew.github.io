'use strict';

class FSFile { // text, fold, link
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
                "type": "text",
                "name": "about",
                "text": 
`shell.print('Hey, I\\'m Jasper.');
return false;`
            },
            {
                "type": "text",
                "name": "cat",
                "text": 
`shell.print(filesystem.fileFromPath(args[1]).data);
return true;`
            },
            {
                "type": "text",
                "name": "clear",
                "text": 
`document.querySelector('#readout').innerHTML = '';
return true;`
            },
            {
                "type": "text",
                "name": "contact",
                "text": 
`shell.print([
    '☎ +1 (831) 334-7779',
    '✉ <a href="mailto:jasper.q.andrew@gmail.com">jasper.q.andrew@gmail.com</a>']);
return true;`
            },
            {
                "type": "link",
                "name": "cv",
                "path": "/bin/resume"
            },
            {
                "type": "text",
                "name": "echo",
                "text": 
`[, ...args] = args;
let str = '';
args.forEach(arg => { str += arg + ' '; });
shell.print(str);
return true;`
            },
            {
                "type": "text",
                "name": "help",
                "text": 
`[, ...args] = args;
shell.print('blah');
args.forEach(arg => {shell.print(arg);});
return true;`
            },
            {
                "type": "text",
                "name": "jasper",
                "text": 
`shell.print(util.jasper_str);
return true;`
            },
            {
                "type": "text",
                "name": "login",
                "text": 
`shell.error('login: program not implemented');
return false;`
            },
            {
                "type": "text",
                "name": "ls",
                "text": 
`for(let f in filesystem.curr_dir.data){
    shell.print(filesystem.curr_dir.data[f].toString());
}`
            },
            {
                "type": "text",
                "name": "pwd",
                "text": `shell.print(filesystem.curr_dir.getPath());`
            },
            {
                "type": "text",
                "name": "resume",
                "text": 
`shell.print('opening in new window...');
window.setTimeout(() => { window.open('http://www.jasperandrew.me/resume.pdf'); }, 500);
return true;`
            },
            {
                "type": "text",
                "name": "welcome",
                "text": 
`shell.print(util.welcome_str);
return true;`
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