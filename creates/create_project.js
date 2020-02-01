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
    sample: {
      id: 56790,
      client: {
        id: 123456,
        name: "Ms. Francis",
        code: null,
        state: "active"
      },
      name: "Branch Opening",
      code: "fr1",
      direct: "is_direct_through_task_assignments",
      task_assignments: [
          {
              task_id: 34567,
              direct: true
          }
      ],
      participations: [
        {
            "user_id": 789456
        }
      ],
      state: "active"
    },
    outputFields: [
      {key: 'id', label: 'Project ID'},
      {key: 'name', label: 'Project name'},
      {key: 'code', label: 'Code'}
    ]
  }
};
