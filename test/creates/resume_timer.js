require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - resume_timer', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {access_token: process.env.ACCESS_TOKEN},
      inputData: {organisation_id: 1, user_id: 1},
    };

    const result = await appTester(
      App.creates['resume_timer'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
