const Locator = require('./locator');

module.exports = class Application {

    constructor(moduleClasses) {
        if(!moduleClasses)
            throw new Error('Modules array in not specified');
        this.services = new Map();
        this.moduleClasses = moduleClasses;
        this.getService = this.getService.bind(this);
    }

    getServices(module) {
        for (const [serviceName, service] of module._services) {
            if (this.services.has(serviceName))
                throw new Error(`Service ${serviceName} has already been added`);
            this.services.set(serviceName, service);
        }
    }

    createModules() {
        const modules = new Set();
        for (const moduleClass of this.moduleClasses) {
            const module = new moduleClass();
            this.getServices(module);
            modules.add(module);
        }
        return modules;
    }

    createLocator(module) {
        return new Locator(module, this.getService);
    }

    async initModules(modules) {
        for (const module of modules) {
            const locator = this.createLocator(module);
            await module.init(locator);
        }
    }

    async afterInitModules(modules) {
        for (const module of modules) {
            module.afterInit && await module.afterInit();
        }
    }

    async init() {
        const modules = this.createModules();
        await this.initModules(modules);
        await this.afterInitModules(modules);
    }

    getService(serviceName) {
        return this.services.get(serviceName);
    }

}