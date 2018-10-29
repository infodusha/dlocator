module.exports = class Module {

    constructor() {
        this._dependecies = new Set();
        this._services = new Map();
    }

    async init(locator) {
        this._locator = locator;
        
    }

    async afterInit() {}

}