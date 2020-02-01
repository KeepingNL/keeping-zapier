// triggers on organisation with a certain tag
const triggerOrganisation = (z, bundle) => {
  return z.request({
    method: 'GET',
    url: 'https://api.keeping.nl/v1/organisations',
    headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
  }).then(response => z.JSON.parse(response.content).organisations);
};

module.exports = {
  key: 'organisation',
  noun: 'Organisation',

  display: {
    label: 'Get Organisation',
    description: 'Triggers on a new organisation.',
    hidden: false
  },

  operation: {
    inputFields: [],
    perform: triggerOrganisation,

    sample: {
      id: 12345,
      name: "Ella's Evenementenbureau",
      url: "https://ellas-evenementen.keeping.nl",
      current_plan: "plus_2019",
      features: 
      {
          timesheet: "times",
          projects: true,
          tasks: true,
          breaks: false
      },
      time_zone: "Europe/Amsterdam",
      currency: "EUR"
    },

    outputFields: [
      {key: 'id', label: 'Organisation ID'},
      {key: 'name', label: 'Organisation name'},
      {key: 'url', label: 'Organisation URL'},
      {key: 'current_plan', label: 'Subscription plan'},
      {key: 'time_zone', label: 'Time zone'},
      {key: 'currency', label: 'Currency'}
    ]
  }
};
