// create a particular create_entry by name
const createCreateentry = (z, bundle) => {
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
  key: 'create_entry',
  noun: 'Time entry',

  display: {
    label: 'Create a Time Entry',
    description: 'Creates a time entry.'
  },

  operation: {
    inputFields: [
      {key: 'name', required: true}
    ],
    perform: createCreateentry,

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
