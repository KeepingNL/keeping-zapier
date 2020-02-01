// triggers on client with a certain tag
const triggerClient = (z, bundle) => {
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

      if (organisation.features.projects !== true) {
        return [];
      }

      return z.request({
          method: 'GET',
          url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/users/me`,
          headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
        }).then(response => {
          response.throwForStatus();
          const me = z.JSON.parse(response.content).user;

          if (me.role !== 'administrator') {
            return [];
          }

          return z.request({
            method: 'GET',
            url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/clients`,
            params: {page: bundle.meta.page + 1, per_page: 100, 'state[]': ["active", "inactive"]},
            headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
          }).then(response => z.JSON.parse(response.content).clients);
          
        });
    });
};

module.exports = {
  key: 'client',
  noun: 'Client',

  display: {
    label: 'New Client',
    description: 'Triggers when a new client was created.',
    hidden: false
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
    perform: triggerClient,

    sample: {
      id: 123456,
      name: "Ms. Francis",
      code: null,
      state: "active"
    },

    outputFields: [
      {key: 'id', label: 'Client ID'},
      {key: 'name', label: 'Client name'},
      {key: 'code', label: 'Code'}
    ]
  }
};
