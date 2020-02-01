
const testAuth = (z /*, bundle*/) => {
  return z.request({
    method: 'GET',
    url: 'https://api.keeping.nl/v1/organisations',
    headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
  }).then((response) => {
    response.throwForStatus();
    let organisations = z.JSON.parse(response.content).organisations;

    if (organisations.length == 0) {
      throw new Error('You do not have any organisation');
    }

    let firstOrganisation = organisations[0];

    return z.request({
      method: 'GET',
      url: `https://api.keeping.nl/v1/${firstOrganisation.id}/users/me`,
      headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
    }).then(response => {
      response.throwForStatus();
      const me = z.JSON.parse(response.content).user;
    });
  });
};

module.exports = {
  type: 'oauth2',
  test: testAuth,
  oauth2Config: {
    authorizeUrl: {
      method: 'GET',
      url: 'https://keeping.nl/oauth/authorize',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code'
      }
    },
    getAccessToken: {
      url: 'https://api.keeping.nl/v1/oauth/token',
      method: 'POST',
      params: {},
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json'
      },
      body: {
        code: '{{bundle.inputData.code}}',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
        grant_type: 'authorization_code',
        redirect_uri: '{{bundle.inputData.redirect_uri}}'
      },
      removeMissingValuesFrom: {}
    },
    refreshAccessToken: {
      url: 'https://api.keeping.nl/v1/oauth/token',
      method: 'POST',
      params: {},
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json'
      },
      body: {
        refresh_token: '{{bundle.authData.refresh_token}}',
        grant_type: 'refresh_token'
      },
      removeMissingValuesFrom: {}
    },
    scope: 'time team project_management',
    autoRefresh: true,
    connectionLabel: '{{first_name}} {{surname}}'
  }
};
