// create a particular create_client by name
const createClient = (z, bundle) => {
  return z.request({
      method: 'POST',
      url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/clients`,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
      body: { name: bundle.inputData.name, code: ('code' in bundle.inputData) ? bundle.inputData.code : null }
  })
  .then(response => {
      response.throwForStatus();
      return z.JSON.parse(response.content).client;
  });
};

module.exports = {
  key: 'create_client',
  noun: 'Client',

  display: {
    label: 'Create Client',
    description: 'Creates a new client.'
  },

  operation: {
    inputFields: [
      {
        key: 'organisation_id',
        required: true,
        label: 'Organisation',
        dynamic: 'organisation.id.name'
      },
      {key: 'name', required: true},
      {key: 'code'}
    ],
    perform: createClient,
    sample: {
      id: 123456,
      name: "Ms. Francis",
      code: null,
      state: "active"
    },
    outputFields: [
      {key: 'id', label: 'Client ID'},
      {key: 'name', label: 'Client name'},
      {key: 'code', label: 'Code'}
    ]
  }
};
