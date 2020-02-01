const authentication = require('./authentication');
const ResumeTimer = require('./creates/resume_timer.js');
const StopTimer = require('./creates/stop_timer.js');
const CreateClient = require('./creates/create_client.js');
const CreateProject = require('./creates/create_project.js');
const CreateTask = require('./creates/create_task.js');
const CreateEntry = require('./creates/create_entry.js');
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
  creates: { 
    [ResumeTimer.key]: ResumeTimer,
    [StopTimer.key]: StopTimer,
    [CreateClient.key]: CreateClient,
    [CreateProject.key]: CreateProject,
    [CreateTask.key]: CreateTask,
    [CreateEntry.key]: CreateEntry,
  },
  triggers: { 
  	[OrganisationTrigger.key]: OrganisationTrigger,
  	[UserTrigger.key]: UserTrigger,
  	[ProjectTrigger.key]: ProjectTrigger,
  	[ClientTrigger.key]: ClientTrigger,
  	[TaskTrigger.key]: TaskTrigger,
  	[EntryTrigger.key]: EntryTrigger,
  },
};
