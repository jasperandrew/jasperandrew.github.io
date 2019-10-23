'use strict';

class FSFile { // text, func, fold, 
    constructor(name, type, parent, data){
        this.meta = {};
        this.meta.name = name; // validate name
        this.meta.type = type;

        if(parent === null || parent === 'null') parent = filesystem.root;
        if(parent.meta.type !== 'folder'){
            return 'parent must be folder';
        }else{
            parent.data[name] = this;
            this.meta.parent = parent;
        }

        this.data = data;
    }
}

class Folder extends FSFile {
    constructor(name, parent){
        super(name, 'folder', parent, {});
    }
}

const filesystem = {
    root: {
        meta: { parent: null, name: '', type: 'folder' },
        data: {}
    },

    import(data_tree) {
        
    }
};



const import_data = {
    "root": [
        {
            "name": "",
            "type": "",
            "data": {
                "args": [],
                "code": ``
            }
        },
        {
            "name": "about",
            "type": "func",
            "data": {
                "args": [],
                "code": `shell.print([
                            'Hey! I\\'m Jasper, an aspiring developer with',
                            'a love for that place where aesthetics and',
                            'function coexist.',
                            '']);
                        return false;`
            }
        },
        {
            "name": "clear",
            "type": "func",
            "data": {
                "args": [],
                "code": `document.querySelector('#readout').innerHTML = '';
                        return true;`
            }
        },
    ]
}