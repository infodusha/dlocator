const should = require('should');
const Locator = require('../locator');

const testName = 'test';

function getService(service) {
    service.should.be.exactly(testName);
    return true;
}

class testModuleClass {

    constructor() {
        this._dependecies = new Set([testName]);
    }

}
const testModule = new testModuleClass();


describe('Locator', () => {
    let locator;
    it('should costruct without errors', () => {
        locator = new Locator(testModule, getService);
    });
    it('should get a service', () => {
        locator.getService(testName);
    });
});