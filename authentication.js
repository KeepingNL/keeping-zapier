module.exports = {
  type: 'oauth2',
  test: {
    url: 'https://api.keeping.nl/v1/organisations',
    method: 'GET',
    params: {},
    headers: { Authorization: 'Bearer {{bundle.authData.access_token}}' },
    body: {},
    removeMissingValuesFrom: {}
  },
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
    scope: 'time reporting team project_management',
    autoRefresh: true
  }
};
