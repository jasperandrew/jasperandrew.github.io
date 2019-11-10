export class FilePath {
    constructor(path) {
        // Validate ///////////////////////
        if(util.typeof(path) !== 'String') throw new Error('FilePath: Invalid input type');
        if(/\/\//.test(path)) throw new Error('FilePath: Invalid string (//)');

        // Private Fields /////////////////
        let _parts, _head, _leaf;

        // Public Fields //////////////////
        this.getLeaf = () => _leaf;
        this.getFile = () => { return sys.getFileFromPath(this.toString()); };

        this.toString = (full=false) => {
            const i = full ? _parts.length : _head;
            return _parts.slice(0, i).join('/');
        };
        this.toArray = () => _parts;
        
        this.isValid = (full=false) => {
            const i = full ? _parts.length : _head;
            const f = sys.getFileFromPath(_parts.slice(0, i).join('/'));
            return f === undefined ? false : true;
        };
        this.up = () => {
            if(_head > 0){
                _head--;
                return true;
            }
            return false;
        };
        this.down = () => {
            if(_head < _parts.length){
                _head++;
                return true;
            }
            return false;
        };
        this.reset = () => { _head = _parts.length; };
    

        // Initialize /////////////////////
        _parts = path.split('/');
        if(_parts[_parts.length-1] === '') _parts.pop();
        _head = _parts.length;
        _leaf = _parts[_parts.length-1];
    }
}