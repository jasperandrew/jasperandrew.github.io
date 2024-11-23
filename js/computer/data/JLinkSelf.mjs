import {JLink} from './JLink.mjs';

export class JLinkSelf extends JLink {
    constructor() {
        super('.', null);

        // Public Fields //////////////////
        this.getData = () => { return this.getParent().getPath(); };
        this.toString = () => { return this.getName(); };
    }
}