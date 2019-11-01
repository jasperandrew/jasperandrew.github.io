'use strict';

class FSFile { // text, fold, link
    constructor(name, type, data) {
        this.name = name; //validate name and type
        this.type = type;
        this.parent = null;
        this.data = data;
    }

    toString() { return `${this.name}*`; }

    getObject() { return this; }
    getData() { return this.data; }

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

    addFiles(array) {
        array.forEach(f => {
            let tmp;
            switch(f.type){
                case 'text': tmp = new FSFile(f.name, f.type, f.text); break;
                case 'link': tmp = new FSLink(f.name, f.path); break;
                case 'fold':
                    tmp = new FSFolder(f.name);
                    tmp.addFiles(f.contents);
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
    }

    getObject() {
        return filesystem.getFileFromPath(this.data).getObject();
    }

    getData() {
        return filesystem.getFileFromPath(this.data).getData();
    }

    toString() {
        return this.name + ' -> ' + this.data;
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
        this.root.addFiles(FS_IMPORT);
        shell.cd('/home/jasper');
    },

    getFileFromPath(path) {
        let data_str = 'filesystem.root';
        if(path[0] !== '/'){
            path = filesystem.curr_dir.getPath() + '/' + path;
        }
        path = path.split('/');
        path.forEach(p => {
            if(p !== '') data_str += `.getData()['${p}']`;
        });
        return new Function(`return ${data_str};`)();
    },

    resolveFileFromPath(path) {
        const file = this.getFileFromPath(path);
        return file ? file.getObject() : null;
    }
};