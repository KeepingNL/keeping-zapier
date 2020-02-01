// create a particular create_task by name
const createCreatetask = (z, bundle) => {
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
  key: 'create_task',
  noun: 'Task',

  display: {
    label: 'Create a Task',
    description: 'Creates a task.'
  },

  operation: {
    inputFields: [
      {key: 'name', required: true}
    ],
    perform: createCreatetask,

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
