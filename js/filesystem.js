'use strict';

class FSFile { // text, func, fold, link
    constructor(name, type, data) {
        this.name = name; //validate name and type
        this.type = type;
        this.parent = null;
        this.data = data;
    }

    toString() { return this.name + '*'; }
}

class FSFolder extends FSFile {
    constructor(name) {
        super(name, 'fold', {});
    }

    addFile(file) {
        this.data[file.name] = file;
        file.parent = this;
    }

    import(json_array) {
        json_array.forEach(f => {
            let tmp;
            switch(f.type){
                case 'text': tmp = new FSFile(f.name, f.type, f.data); break;
                case 'func': tmp = new FSFile(f.name, f.type, new Function(f.args, f.body)); break;
                case 'fold':
                    tmp = new FSFolder(f.name);
                    tmp.import(f.data);
                    break;
            }
            this.addFile(tmp);
        });
    }

    toString(depth=0,i=0) {
        if(depth === -1) depth = Infinity;
        let str = this.name + '/';
        if(depth === i) return str;
        for(let d in this.data){
            str += '\n' + '    '.repeat(i+1) + this.data[d].toString(depth,i+1);
        }
        return str;
    }
}

class FSLink extends FSFile {
    constructor(name, path) {
        super(name, 'link', path);
        // link data at path to this data
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
    getFromPath
};



const import_data = [
    {
        "name": "test",
        "type": "text",
        "data": 'blah'
    },
    {
        "name": "bin",
        "type": "fold",
        "contents": [
            {
                "name": "about",
                "type": "func",
                "args": [],
                "body": `shell.print([
                            'Hey! I\\'m Jasper, an aspiring developer with',
                            'a love for that place where aesthetics and',
                            'function coexist.',
                            '']);
                        return false;`
            },
            {
                "name": "clear",
                "type": "func",
                "args": [],
                "body": `document.querySelector('#readout').innerHTML = '';
                        return true;`
            },
            {
                "name": "contact",
                "type": "func",
                "args": [],
                "body": `shell.print([
                            '☎ +1 (831) 334-7779',
                            '✉ <a href="mailto:jasper.q.andrew@gmail.com">jasper.q.andrew@gmail.com</a>']);
                        return true;`
            },
            {
                "name": "cv",
                "type": "link",
                "path": "/bin/resume"
            },
            {
                "name": "",
                "type": "",
                "args": [],
                "body": ``
            },
            {
                "name": "",
                "type": "",
                "args": [],
                "body": ``
            },
            {
                "name": "",
                "type": "",
                "args": [],
                "body": ``
            },
            {
                "name": "",
                "type": "",
                "args": [],
                "body": ``
            },
        ]
    }
];