export class Display {
    constructor() {
        ////// Private Fields /////////////////
        let _on;

        ////// Public Fields //////////////////
        this.togglePower = () => {
            document.querySelector('#light').classList.toggle('on');
            document.querySelector('#screen').classList.toggle('on');
            _on = !_on;

            document.querySelector('#command').focus();
        };

        this.isOn = () => _on;

        ////// Initialize /////////////////////
        document.querySelector('.button.power').onclick = this.togglePower;
        document.querySelector('html').onmousedown = () => {
            document.querySelector('#command').focus();
            return false;
        };

        _on = false;
    }
}