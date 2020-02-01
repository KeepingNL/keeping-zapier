/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('My App', () => {

  it('should run triggers.organisation', done => {
    const bundle = {
      authData: {access_token: process.env.ACCESS_TOKEN},
      inputData: {}
    };

    appTester(App.triggers.organisation.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        done();
      })
      .catch(done);
  });
});
