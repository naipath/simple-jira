package jirahelper

import (
	"github.com/andygrunwald/go-jira"
	"github.com/rs/zerolog/log"
)

func (a *JiraHelper) RetrieveDashboardsForProject(projectKey string) []jira.Board {
	boards, _, err := a.jiraClient.Board.GetAllBoards(&jira.BoardListOptions{
		ProjectKeyOrID: projectKey,
	})
	if err != nil {
		log.Error().Err(err).Str("projectKey", projectKey).Msg("Error occurred when retrieving dashboards for a project")
		return nil
	}
	a.jiraCache.RetrieveDashboardsForProject[projectKey] = boards.Values
	return boards.Values
}

func (a *JiraHelper) RetrieveDashboardsForProjectCached(projectKey string) []jira.Board {
	return a.jiraCache.RetrieveDashboardsForProject[projectKey]
}

func (a *JiraHelper) RetrieveBoardDetails(boardId int) *jira.Board {
	board, _, err := a.jiraClient.Board.GetBoard(boardId)
	if err != nil {
		log.Error().Err(err).Int("boardId", boardId).Msg("Error occurred when retrieving details for a board")
		return nil
	}
	a.jiraCache.RetrieveBoardDetails[boardId] = board
	return board
}
func (a *JiraHelper) RetrieveBoardDetailsCached(boardId int) *jira.Board {
	return a.jiraCache.RetrieveBoardDetails[boardId]
}

func (a *JiraHelper) GetBoards() []jira.Board {
	if a.jiraClient == nil {
		return nil
	}
	boards, _, err := a.jiraClient.Board.GetAllBoards(nil)
	if err != nil {
		log.Error().Err(err).Msg("Error occurred when retrieving all boards")
		return nil
	}
	a.jiraCache.GetBoards = boards.Values
	return boards.Values
}

func (a *JiraHelper) GetBoardsCached() []jira.Board {
	return a.jiraCache.GetBoards
}
