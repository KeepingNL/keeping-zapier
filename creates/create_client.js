// create a particular create_client by name
const createCreateclient = (z, bundle) => {
  return z.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: JSON.stringify({
      name: bundle.inputData.name
    })
  }).then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'create_client',
  noun: 'Client',

  display: {
    label: 'Create Client',
    description: 'Creates a client.'
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
