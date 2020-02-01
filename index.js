const authentication = require('./authentication');
const ResumeEntryCreate = require('./creates/resume_entry.js');
const OrganisationTrigger = require('./triggers/organisation');
const UserTrigger = require('./triggers/user');
const ProjectTrigger = require('./triggers/project');
const ClientTrigger = require('./triggers/client');
const TaskTrigger = require('./triggers/task');
const EntryTrigger = require('./triggers/entry');

module.exports = {
  platformVersion: require('zapier-platform-core').version,
  version: require('./package.json').version,
  authentication: authentication,
  creates: { [ResumeEntryCreate.key]: ResumeEntryCreate },
  triggers: { 
  	[OrganisationTrigger.key]: OrganisationTrigger,
  	[UserTrigger.key]: UserTrigger,
  	[ProjectTrigger.key]: ProjectTrigger,
  	[ClientTrigger.key]: ClientTrigger,
  	[TaskTrigger.key]: TaskTrigger,
  	[EntryTrigger.key]: EntryTrigger,
  },
};
