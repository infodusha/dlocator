const should = require('should');
const Module = require('../module');

describe('Module', () => {
    let testModule;
    it('should costruct without errors', () => {
        testModule = new Module();
    });
    it('should init without errors', () => {
        const locator = Math.random();
        testModule.init(locator);
        testModule.should.have.property('_locator');
        testModule._locator.should.be.exactly(locator).and.be.a.Number();
    });
    it('should have empty dependecies', () => {
        testModule.should.have.property('_dependecies');
        testModule._dependecies.size.should.be.exactly(0).and.be.a.Number();
    });
    it('should have empty services', () => {
        testModule.should.have.property('_services');
        testModule._services.size.should.be.exactly(0).and.be.a.Number();
    });
});