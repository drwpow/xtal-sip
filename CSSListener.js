const eventNames = [
    "animationstart",
    "MSAnimationStart",
    "webkitAnimationStart"
];
export class CSSListener {
    constructor(selector, host, target, animationName, callback) {
        this.selector = selector;
        this.host = host;
        this.target = target;
        this.animationName = animationName;
        this.callback = callback;
    }
    insertListener(e) {
        if (e.animationName === this.animationName) {
            setTimeout(() => {
                this.callback(e.target);
            }, 0);
        }
    }
    addCSSListener(id, selector, insertListener) {
        // See https://davidwalsh.name/detect-node-insertion
        if (this._boundInsertListener)
            return;
        const styleInner = /* css */ `
        @keyframes ${id} {
            from {
                opacity: 0.99;
            }
            to {
                opacity: 1;
            }
        }
  
        ${selector}{
            animation-duration: 0.001s;
            animation-name: ${id};
        }
        `;
        const style = document.createElement("style");
        style.innerHTML = styleInner;
        if (this.host !== null) {
            this.host.shadowRoot.appendChild(style);
        }
        else {
            document.head.appendChild(style);
        }
        this._boundInsertListener = insertListener.bind(this);
        const container = this.host ? this.host.shadowRoot : document;
        eventNames.forEach(name => {
            container.addEventListener(name, this._boundInsertListener, false);
        });
    }
    disconnect() {
        if (this._boundInsertListener) {
            const container = this.host ? this.host.shadowRoot : document;
            eventNames.forEach(name => {
                container.removeEventListener(name, this._boundInsertListener);
            });
        }
    }
}