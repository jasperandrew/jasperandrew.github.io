import JLink from './JLink.mjs';

export class JLinkSelf extends JLink {
    constructor() {
        super('.', null);

        // Public Fields //////////////////
        this.getObject = () => { return this.getParent(); };
        this.getData = () => { return this.getParent().getData(); };
        this.toString = () => { return this.getName(); };
    }
}