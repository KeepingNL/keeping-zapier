// create a particular create_project by name
const createProject = (z, bundle) => {
   return z.request({
      method: 'POST',
      url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/projects`,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
      body: {
        name: bundle.inputData.name,
        client_id: ('client_id' in bundle.inputData) ? bundle.inputData.client_id : null,
        code: ('code' in bundle.inputData) ? bundle.inputData.code : null
      }
  })
  .then(response => {
      response.throwForStatus();
      return z.JSON.parse(response.content).project;
  });
};

module.exports = {
  key: 'create_project',
  noun: 'Project',

  display: {
    label: 'Create Project',
    description: 'Creates a new project.'
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
      {
        key: 'client_id',
        label: 'Client',
        dynamic: 'client.id.name'
      },
      {key: 'code'}
    ],
    perform: createProject,
    outputFields: [
      {key: 'id', label: 'Project ID'},
      {key: 'name', label: 'Project name'},
      {key: 'code', label: 'Code'}
    ]
  }
};
