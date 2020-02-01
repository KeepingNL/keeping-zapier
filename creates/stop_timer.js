// create a particular stop_timer by name
const createStoptimer = (z, bundle) => {
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
  key: 'stop_timer',
  noun: 'Stop_timer',

  display: {
    label: 'Create Stop_timer',
    description: 'Creates a stop_timer.'
  },

  operation: {
    inputFields: [
      {key: 'name', required: true}
    ],
    perform: createStoptimer,

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
