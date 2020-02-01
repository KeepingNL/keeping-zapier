// triggers on task with a certain tag
const triggerTask = (z, bundle) => {
  return z.request({
    method: 'GET',
    url: `https://api.keeping.nl/v1/organisations`,
    headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
  }).then(response => {
      response.throwForStatus();

      const organisation = z.JSON.parse(response.content)
        .organisations
        .filter(organisation => organisation.id == bundle.inputData.organisation_id)[0];

      if (typeof organisation == 'undefined') {
        return [];
      }

      if (organisation.features.tasks !== true) {
        return [];
      }

      return z.request({
        method: 'GET',
        url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/tasks`,
        params: {page: bundle.meta.page + 1, per_page: 100, 'state[]': ["active", "archived"]},
        headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
      }).then(response => z.JSON.parse(response.content).tasks);
    });
};

module.exports = {
  key: 'task',
  noun: 'Task',

  display: {
    label: 'New Task',
    description: 'Triggers when a new task was created.'
  },

  operation: {
    inputFields: [
      {
        key: 'organisation_id',
        required: true,
        label: 'Organisation',
        dynamic: 'organisation.id.name'
      }
    ],
    perform: triggerTask,

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
