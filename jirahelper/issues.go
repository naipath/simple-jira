package jirahelper

import (
	"github.com/andygrunwald/go-jira"
	"github.com/rs/zerolog/log"
)

func (a *JiraHelper) SearchIssues(query string) []jira.Issue {
	search, _, err := a.jiraClient.Issue.Search(query, nil)
	if err != nil {
		log.Error().Err(err).Str("query", query).Msg("Error occurred when searching for issues")
		return nil
	}
	return search
}

func (a *JiraHelper) IssueDetails(issueKey string) *jira.Issue {
	issue, _, err := a.jiraClient.Issue.Get(issueKey, nil)
	if err != nil {
		log.Error().Err(err).Str("issueKey", issueKey).Msg("Error occurred when retrieving issue details")
		return nil
	}
	a.jiraCache.IssueDetails[issueKey] = issue
	return issue
}

func (a *JiraHelper) IssueDetailsCached(issueKey string) *jira.Issue {
	return a.jiraCache.IssueDetails[issueKey]
}
