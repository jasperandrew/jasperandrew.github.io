'use strict';

class FSFile { // data, fold, link
    constructor(name, type, data) {
        this.name = name; //validate name and type
        this.type = type;
        this.parent = null;
        this.data = data;
    }

    setParent(f) { this.parent = f; }

    toString() { return `${this.name}*`; }

    getObject() { return this; }
    getData() { return this.data; }

    getPath() {
        let p = this.parent,
            s = `/${this.name}`;
        if(!p) return 'err';
        while(p.type !== 'fold_root'){
            s = `/${p.name + s}`;
            p = p.parent;
        }
        return s;
    }
}

class FSFolder extends FSFile {
    constructor(name) {
        super(name, 'fold', {});
        this.addFile(new FSSelfLink());
        this.addFile(new FSParentLink());
    }

    addFile(file) {
        this.data[file.name] = file;
        file.parent = this;
    }

    import(array) {
        array.forEach(f => {
            let tmp;
            switch(f.type){
                case 'data': tmp = new FSFile(f.name, f.type, f.data); break;
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

class FSSelfLink extends FSLink {
    constructor() { super('.', null); }
    getObject() { return this.parent; }
    getData() { return this.parent.getData(); }
    toString() { return this.name; }
}

class FSParentLink extends FSLink {
    constructor() { super('..', null); }
    getObject() { return this.parent.parent; }
    getData() { return this.parent.parent.getData(); }
    toString() { return this.name; }
}

class FSRoot extends FSFolder {
    constructor() {
        super();
        this.name = '';
        this.type = 'fold_root';
        this.parent = this;
    }
}

class FilePath {
    constructor(path) {
        if(util.typeof(path) !== 'String') throw new Error('FilePath: Invalid input type');
        if(/\/\//.test(path)) throw new Error('FilePath: Invalid string (//)');
        this.parts = path.split('/');
        this.head = this.parts.length;
    }

    toString(full=false) {
        const i = full ? this.parts.length : this.head;
        return this.parts.slice(0, i).join('/');
    }

    isValid(full=false) {
        const i = full ? this.parts.length : this.head;
        const f = filesystem.getFileFromPath(this.parts.slice(0, i).join('/'));
        return f === undefined ? false : true;
    }

    up() { if(this.head > 0) this.head--; }
    down() { if(this.head < this.parts.length) this.head++; }
    reset() { this.head = this.parts.length; }
}

const filesystem = {
    root: new FSRoot(),
    curr_dir: null,

    init() {
        this.root.import(FS_IMPORT);
        shell.cd('/home/jasper');
    },

    getFileFromPath(path, resolve=false) {
        let data_str = 'filesystem.root';
        if(path[0] !== '/'){
            path = filesystem.curr_dir.getPath() + '/' + path;
        }
        path = path.split('/');
        path.forEach(p => {
            if(p !== '') data_str += `.getData()['${p}']`;
        });

        try{
            return new Function(`return ${data_str}${resolve ? '.getObject()' : ''};`)();
        }catch(e){
            // console.log(e);
            return undefined;
        }
    }
};