const stopTimer = (z, bundle) => {
  return z.request({
      method: 'GET',
      url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/time-entries/last`,
      params: {user_id: bundle.inputData.user_id, ongoing: 1},
      headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`}
  })
  .then(response => {
      response.throwForStatus();
      const time_entry = z.JSON.parse(response.content).time_entry;

      return z.request({
          method: 'PATCH',
          url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/time-entries/${time_entry.id}/stop`,
          headers: {Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`}
      })
      .then(response => {
          response.throwForStatus();
          return z.JSON.parse(response.content).time_entry;
      });
  });
};

module.exports = {
  key: 'stop_timer',
  noun: 'Time entry',

  display: {
    label: 'Stop Timer',
    description: 'Stops the running timer.',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'organisation_id',
        required: true,
        label: 'Organisation',
        dynamic: 'organisation.id.name'
      },
      {
        key: 'user_id',
        required: true,
        label: 'User',
        dynamic: 'user.id.first_name'
      }
    ],
    perform: stopTimer,
    outputFields: [
      {key: 'id', label: 'Time entry ID'},
      {key: 'user_id', label: 'User ID'},
      {key: 'project_id', label: 'Project ID'},
      {key: 'task_id', label: 'Task ID'},
      {key: 'note', label: 'Note'},
      {key: 'hours', label: 'Hours'},
      {key: 'start', label: 'Start'},
      {key: 'end', label: 'End'},
      {key: 'ongoing', label: 'Ongoing'}
    ]
  }
};
