package jirahelper

import (
	"github.com/andygrunwald/go-jira"
	"github.com/rs/zerolog/log"
)

func (a *JiraHelper) RetrieveSprintsForBoard(boardId string) []jira.Sprint {
	sprints, _, err := a.jiraClient.Board.GetAllSprints(boardId)
	if err != nil {
		log.Error().Err(err).Str("boardId", boardId).Msg("Error occurred when retrieving sprints for a board")
		return nil
	}
	a.jiraCache.RetrieveSprintsForBoard[boardId] = sprints
	return sprints
}
func (a *JiraHelper) RetrieveSprintsForBoardCached(boardId string) []jira.Sprint {
	return a.jiraCache.RetrieveSprintsForBoard[boardId]
}

func (a *JiraHelper) RetrieveSprint(sprintId int) []jira.Issue {
	sprint, _, err := a.jiraClient.Sprint.GetIssuesForSprint(sprintId)
	if err != nil {
		log.Error().Err(err).Int("sprintId", sprintId).Msg("Error occurred when retrieving a sprint")
		return nil
	}
	a.jiraCache.RetrieveSprint[sprintId] = sprint
	return sprint
}
func (a *JiraHelper) RetrieveSprintCached(sprintId int) []jira.Issue {
	return a.jiraCache.RetrieveSprint[sprintId]
}
