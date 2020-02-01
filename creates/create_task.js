// create a particular create_task by name
const createTask = (z, bundle) => {
  return z.request({
      method: 'POST',
      url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/tasks`,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
      body: { name: bundle.inputData.name, code: ('code' in bundle.inputData) ? bundle.inputData.code : null }
  })
  .then(response => {
      response.throwForStatus();
      return z.JSON.parse(response.content).task;
  });
};

module.exports = {
  key: 'create_task',
  noun: 'Task',

  display: {
    label: 'Create a Task',
    description: 'Creates a new task.'
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
    perform: createTask,
    sample: {
      id: 34567,
      name: "Marketing",
      code: null,
      direct: true,
      state: "active"
    },
    outputFields: [
      {key: 'id', label: 'Task ID'},
      {key: 'name', label: 'Task name'},
      {key: 'code', label: 'Code'}
    ]
  }
};
