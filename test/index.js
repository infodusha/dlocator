const Application = require('../index');

describe('Application', () => {
    let app;
    it('should costruct without errors', () => {
        app = new Application([]);
    });
    it('should init without errors', () => {
        app.init();
    });
});