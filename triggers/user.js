// triggers on user with a certain tag
const triggerUser = (z, bundle) => {
  const responsePromise = z.request({
    method: 'GET',
    url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/users/me`,
    headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
  });
  return responsePromise
    .then(response => {
      response.throwForStatus();
      const me = z.JSON.parse(response.content).user;

      if (me.role === 'administrator') {
        return z.request({
          method: 'GET',
          url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/users`,
          params: {page: bundle.meta.page + 1, per_page: 100},
          headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
        }).then(response => z.JSON.parse(response.content).users);
      } else {
        return [me];
      }
    });
};

module.exports = {
  key: 'user',
  noun: 'User',

  display: {
    label: 'Get My User',
    description: 'Triggers on a new user.',
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
    perform: triggerUser,

    sample: {
      id: 789456,
      first_name: "Ella",
      surname: "van Doorn",
      code: null,
      role: "administrator",
      state: "active"
    },

    outputFields: [
      {key: 'id', label: 'User ID'},
      {key: 'first_name', label: 'First name'},
      {key: 'surname', label: 'Surname'},
      {key: 'code', label: 'Code'},
      {key: 'role', label: 'Role'},
      {key: 'state', label: 'State'}
    ]
  }
};
