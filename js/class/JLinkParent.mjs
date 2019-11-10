import JLink from './JLink.mjs';

export class JLinkParent extends JLink {
    constructor() {
        super('..', null);
    
        // Public Fields //////////////////
        this.getObject = () => { return this.getParent().getParent(); };
        this.getData = () => { return this.getParent().getParent().getData(); };
        this.toString = () => { return this.getName(); };
    }
}