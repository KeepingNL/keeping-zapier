// create a particular create_client by name
const createCreateclient = (z, bundle) => {
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
  key: 'create_client',
  noun: 'Create_client',

  display: {
    label: 'Create Create_client',
    description: 'Creates a create_client.'
  },

  operation: {
    inputFields: [
      {key: 'name', required: true}
    ],
    perform: createCreateclient,

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
