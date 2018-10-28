module.exports = class Module {

    async init(locator) {
        this._locator = locator;
    }

    async afterInit() {}

    get _dependecies() {
        return new Set();
    }

    get _services() {
        return new Map();
    }

}