const resumeEntry = (z, bundle) => {

  return z.request({
      method: 'GET',
      url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/time-entries/last`,
      params: {
        user_id: bundle.inputData.user_id,
        ongoing: 0,
        locked: 0
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`
      },
      body: {}
  })
  .then(response => {
      response.throwForStatus();
      const results = z.JSON.parse(response.content);

      return z.request({
          method: 'POST',
          url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/time-entries/${results.time_entry.id}/resume`,
          params: {},
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${bundle.authData.access_token}`
          },
          body: {}
      })
      .then(response => {
          response.throwForStatus();
          const results = z.JSON.parse(response.content);

          return results;
      });
  });
};

module.exports = {

  key: 'resume_entry',
  noun: 'Time entry',

  display: {
    label: 'Resume time entry',
    description: 'Resume your last time entry',
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
    perform: resumeEntry
  }
};
