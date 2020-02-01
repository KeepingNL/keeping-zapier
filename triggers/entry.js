// triggers on entry with a certain tag
const triggerEntry = (z, bundle) => {
  return z.request({
      method: 'GET',
      url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/time-entries`,
      params: {user_id: bundle.inputData.user_id},
      headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`}
  })
  .then(response => {
      response.throwForStatus();
      return z.JSON.parse(response.content).time_entries;
  });
};

module.exports = {
  key: 'entry',
  noun: 'Time entry',

  display: {
    label: 'New Time Entry',
    description: 'Triggers when a new time entry is created for today.',
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
    perform: triggerEntry,

    sample: {
      id: 456789123,
      user_id: 789456,
      date: "2020-02-01",
      purpose: "work",
      project_id: 56790,
      task_id: 34567,
      note: "Working on some e-mails",
      external_references: [
        {
          id: "d69e192e3827b90e9d13e888317113e1",
          type: "generic_work_reference",
          name: "Send e-mail to venue",
          url: "https://planner.ellas-evenementen.nl/todos/123456789"
        }
      ],
      start: "2020-02-01T13:45:10+01:00",
      end: "2020-02-01T15:15:10+01:00",
      hours: 1.5,
      ongoing: false,
      locked: false
    },

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
