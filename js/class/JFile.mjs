export class JFile {
    constructor(_name, _type, _data) {
        // Private Fields /////////////////
        let _parent = null;

        // Public Fields //////////////////
        this.getName = () => _name;
        this.getType = () => _type;
        this.getParent = () => _parent;
        this.getData = () => _data;
        this.getObject = () => this;

        this.setName = (s) => { _name = s; };
        this.setParent = (f) => {  _parent = f; };
        this.setData = (d) => { _data = d; };

        this.toString = () => `${_name}*`;
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
    }
}