// create a particular create_project by name
const createCreateproject = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: JSON.stringify({
      name: bundle.inputData.name
    })
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'create_project',
  noun: 'Project',

  display: {
    label: 'Create Project',
    description: 'Creates a project.'
  },

  operation: {
    inputFields: [
      {key: 'name', required: true}
    ],
    perform: createCreateproject,

    sample: {
      id: 1,
      name: 'Test'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'}
    ]
  }
};
