/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('My App', () => {
  it('should run creates.stop_timer', done => {
    const bundle = {
      authData: {access_token: process.env.ACCESS_TOKEN},
      inputData: {organisation_id: 1, user_id: 1},
    };

    appTester(App.creates.stop_timer.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        done();
      })
      .catch(done);
  });
});
