import {JFolder} from './JFolder.mjs';
export class JFolderRoot extends JFolder {
    constructor() {
        super();

        // Public Fields //////////////////
        this.getName = () => '';
        this.getType = () => 'fldr_root';
        this.getParent = () => this;
    }
}