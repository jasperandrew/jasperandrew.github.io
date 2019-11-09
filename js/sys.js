(() => {
    'use strict';
    class FSFile { // data, fold, link
        constructor(name, type, data) {
            ////// Private ////////////////////
            let _name = name, //validate name and type
                _type = type,
                _parent = null,
                _data = data;

            this.getName = () => _name;
            this.getType = () => _type;
            this.getParent = () => _parent;
            this.getData = () => _data;
            this.getObject = () => this;

            this.setName = (s) => { _name = s; };
            this.setParent = (f) => {  _parent = f; };
            this.setData = (d) => { _data = d; };
            this.getPath = () => {
                let p = _parent,
                    s = `/${_name}`;
                if(!p) return 'err';
                while(p.getType() !== 'fold_root'){
                    s = `/${p.getName() + s}`;
                    p = p.getParent();
                }
                return s;
            };

            this.toString = () => `${_name}*`;
        }
    }
    
    class FSFolder extends FSFile {
        constructor(name) {
            super(name, 'fold', {});

            this.addFile = (f) => {
                _data[f.getName()] = f;
                file.parent = this;
            }

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
    
    ////// Public /////////////////////

    
    ////// Interface //////////////////
    this.sys = {
    };
})();