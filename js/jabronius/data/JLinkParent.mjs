import {JLink} from './JLink.mjs';

export class JLinkParent extends JLink {
    constructor() {
        super('..', null);
    
        // Public Fields //////////////////
        this.getData = () => { return this.getParent().getParent().getPath(); };
        this.toString = () => { return this.getName(); };
    }
}