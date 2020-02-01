// triggers on project with a certain tag
const triggerProject = (z, bundle) => {
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

          return z.request({
            method: 'GET',
            url: `https://api.keeping.nl/v1/${bundle.inputData.organisation_id}/projects`,
            params: (me.role === 'administrator') ?
              {page: bundle.meta.page + 1, per_page: 100, 'state[]': ["active", "archived"]} : 
              {user_id: me.id, page: bundle.meta.page + 1, per_page: 100, state: ["active", "archived"]},
            headers: { Accept: 'application/json', Authorization: `Bearer ${bundle.authData.access_token}`},
          }).then(response => z.JSON.parse(response.content).projects);

        });
    });
};

module.exports = {
  key: 'project',
  noun: 'Project',

  display: {
    label: 'New Project',
    description: 'Triggers when a new project was created.',
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
    perform: triggerProject,

    sample: {
      id: 56790,
      client: {
        id: 123456,
        name: "Ms. Francis",
        code: null,
        state: "active"
      },
      name: "Branch Opening",
      code: "fr1",
      direct: "is_direct_through_task_assignments",
      task_assignments: [
          {
              task_id: 34567,
              direct: true
          }
      ],
      participations: [
        {
            "user_id": 789456
        }
      ],
      state: "active"
    },
    outputFields: [
      {key: 'id', label: 'Project ID'},
      {key: 'name', label: 'Project name'},
      {key: 'code', label: 'Code'}
    ]
  }
};
