const authentication = require('./authentication');
const ResumeEntryCreate = require('./creates/resume_entry.js');
const OrganisationTrigger = require('./triggers/organisation');
const UserTrigger = require('./triggers/user');

module.exports = {
  platformVersion: require('zapier-platform-core').version,
  version: require('./package.json').version,
  authentication: authentication,
  creates: { [ResumeEntryCreate.key]: ResumeEntryCreate },
  triggers: { 
  	[OrganisationTrigger.key]: OrganisationTrigger,
  	[UserTrigger.key]: UserTrigger,
  },
};
