import JFile from './JFile.mjs';

export class JLink extends JFile {
    constructor(name, path) {
        super(name, 'link', path);

        // Public Fields //////////////////
        this.getObject = () => { return sys.getFileFromPath(this.getData()).getObject(); };
        this.getData = () => { return sys.getFileFromPath(this.getData()).getData(); };
        this.toString = () => { return this.getName() + ' -> ' + this.getData(); };
    }
}