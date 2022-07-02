package jirahelper

import (
	"context"
	"encoding/json"
	"github.com/andygrunwald/go-jira"
	"github.com/naipath/simple-jira-app/utils"
	"github.com/rs/zerolog/log"
	"io/ioutil"
)

const credentialsFileName = ".simple-jira-credentials.json"
const cacheFileName = ".simple-jira-cache.json"

type LoginCredentials struct {
	Url          string `json:"url"`
	EmailAddress string `json:"emailAddress"`
	Token        string `json:"token"`
}

type JiraCache struct {
	RetrieveProjects             *jira.ProjectList
	GetBoards                    []jira.Board
	RetrieveProject              map[string]*jira.Project
	RetrieveDashboardsForProject map[string][]jira.Board
	RetrieveBoardDetails         map[int]*jira.Board
	RetrieveSprintsForBoard      map[string][]jira.Sprint
	IssueDetails                 map[string]*jira.Issue
	RetrieveSprint               map[int][]jira.Issue
}

type JiraHelper struct {
	ctx        context.Context
	jiraClient *jira.Client
	jiraCache  *JiraCache
}

func NewJiraHelper() *JiraHelper {
	return &JiraHelper{}
}

func (a *JiraHelper) Startup(ctx context.Context) {
	a.ctx = ctx
	a.TryLoggingWithPreviousCredentials()
}

func (a *JiraHelper) ShutDown() {
	utils.WriteFile(a.jiraCache, cacheFileName)
}

func readJiraCache() *JiraCache {
	fallback := &JiraCache{
		RetrieveProjects:             nil,
		GetBoards:                    nil,
		RetrieveProject:              make(map[string]*jira.Project),
		RetrieveDashboardsForProject: make(map[string][]jira.Board),
		RetrieveBoardDetails:         make(map[int]*jira.Board),
		RetrieveSprintsForBoard:      make(map[string][]jira.Sprint),
		IssueDetails:                 make(map[string]*jira.Issue),
		RetrieveSprint:               make(map[int][]jira.Issue),
	}
	var jiraCache *JiraCache
	bytes, err := ioutil.ReadFile(utils.UserHomeDir() + "/" + cacheFileName)
	if err != nil {
		log.Info().Err(err).Msg("Could not read file " + cacheFileName)
		return fallback
	}
	err = json.Unmarshal(bytes, &jiraCache)
	if err != nil {
		log.Warn().Err(err).Msg("Could not marshal file" + cacheFileName)
		return fallback
	}
	return jiraCache
}
