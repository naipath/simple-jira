package jirahelper

import (
	"github.com/andygrunwald/go-jira"
	"github.com/rs/zerolog/log"
)

func (a *JiraHelper) RetrieveProjects() *jira.ProjectList {
	list, _, err := a.jiraClient.Project.GetList()
	if err != nil {
		log.Error().Err(err).Msg("Error occurred when retrieving all projects")
		return nil
	}
	a.jiraCache.RetrieveProjects = list
	return list
}

func (a *JiraHelper) RetrieveProjectsCached() *jira.ProjectList {
	return a.jiraCache.RetrieveProjects
}

func (a *JiraHelper) RetrieveProject(projectKey string) *jira.Project {
	project, _, err := a.jiraClient.Project.Get(projectKey)
	if err != nil {
		log.Error().Err(err).Str("projectKey", projectKey).Msg("Error occurred when retrieving a project")
		return nil
	}
	a.jiraCache.RetrieveProject[projectKey] = project
	return project
}

func (a *JiraHelper) RetrieveProjectCached(projectKey string) *jira.Project {
	return a.jiraCache.RetrieveProject[projectKey]
}
