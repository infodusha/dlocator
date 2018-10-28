module.exports = class Locator {

    constructor(_module, _getService) {
        this._module = _module;
        this._getService = _getService;
        this._moduleName = _module.constructor.name;
    }

    getService(serviceName) {
        const service = this._getService(serviceName);
        if (!service)
            throw new Error(`Application has no service ${serviceName}, but module ${this._moduleName} requests it`);
        if (!this._module._dependecies.has(serviceName))
            throw new Error(`Module ${this._moduleName} has no dependecy ${serviceName}, but requests it`);
        return service;
    }

}