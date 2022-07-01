package main

import (
	"context"
	"encoding/json"
	"github.com/andygrunwald/go-jira"
	"github.com/naipath/simple-jira-app/jirahelper"
	"github.com/rs/zerolog/log"
	"io/ioutil"
	"os"
	"runtime"
)

const credentialsFileName = ".simple-jira-credentials.json"
const favouritesFileName = ".simple-jira-favourites.json"
const cacheFileName = ".simple-jira-cache.json"

// App struct
type App struct {
	ctx        context.Context
	jiraClient *jira.Client
	jiraCache  *JiraCache
	favourites map[string]string
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

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) shutdown(ctx context.Context) {
	writeFile(a.favourites, favouritesFileName)
	writeFile(a.jiraCache, cacheFileName)
}

func (a *App) AuthenticateReal(credentials jirahelper.LoginCredentials) {
	tp := jira.BasicAuthTransport{Username: credentials.EmailAddress, Password: credentials.Token}

	client, err := jira.NewClient(tp.Client(), credentials.Url)
	_, _, err = client.User.GetSelf()
	if err != nil {
		log.Error().Err(err).Msg("Could not authenticate")
		return
	}
	a.jiraClient = client
	favourites := readFavourites()
	a.favourites = favourites
	jiraCache := readJiraCache()
	a.jiraCache = jiraCache

	writeFile(credentials, credentialsFileName)
}

func (a *App) IsAuthenticated() bool {
	return a.jiraClient != nil
}

func (a *App) GetBoards() []jira.Board {
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

func (a *App) GetBoardsCached() []jira.Board {
	return a.jiraCache.GetBoards
}

func (a *App) TryLoggingWithPreviousCredentials() {
	bytes, err := ioutil.ReadFile(userHomeDir() + "/" + credentialsFileName)
	if err != nil {
		log.Info().Err(err).Msg("Could not read file" + credentialsFileName)
		return
	}
	var loginCredentials jirahelper.LoginCredentials
	err = json.Unmarshal(bytes, &loginCredentials)

	if err != nil {
		log.Warn().Err(err).Msg("Could not marshal file" + credentialsFileName)
		return
	}
	a.AuthenticateReal(loginCredentials)
}

func (a *App) LogOut() {
	a.jiraClient = nil
	err := os.Remove(userHomeDir() + "/" + credentialsFileName)
	if err != nil {
		log.Warn().Err(err).Msg("Could not remove " + credentialsFileName)
	}
	err = os.Remove(userHomeDir() + "/" + favouritesFileName)
	if err != nil {
		log.Warn().Err(err).Msg("Could not remove " + favouritesFileName)
	}
	err = os.Remove(userHomeDir() + "/" + cacheFileName)
	if err != nil {
		log.Warn().Err(err).Msg("Could not remove " + cacheFileName)
	}
}

func (a *App) SearchIssues(query string) []jira.Issue {
	search, _, err := a.jiraClient.Issue.Search(query, nil)
	if err != nil {
		log.Error().Err(err).Str("query", query).Msg("Error occurred when searching for issues")
		return nil
	}
	return search
}

func (a *App) IssueDetails(issueKey string) *jira.Issue {
	issue, _, err := a.jiraClient.Issue.Get(issueKey, nil)
	if err != nil {
		log.Error().Err(err).Str("issueKey", issueKey).Msg("Error occurred when retrieving issue details")
		return nil
	}
	a.jiraCache.IssueDetails[issueKey] = issue
	return issue
}
func (a *App) IssueDetailsCached(issueKey string) *jira.Issue {
	return a.jiraCache.IssueDetails[issueKey]
}

func (a *App) RetrieveProjects() *jira.ProjectList {
	list, _, err := a.jiraClient.Project.GetList()
	if err != nil {
		log.Error().Err(err).Msg("Error occurred when retrieving all projects")
		return nil
	}
	a.jiraCache.RetrieveProjects = list
	return list
}

func (a *App) RetrieveProjectsCached() *jira.ProjectList {
	return a.jiraCache.RetrieveProjects
}

func (a *App) RetrieveProject(projectKey string) *jira.Project {
	project, _, err := a.jiraClient.Project.Get(projectKey)
	if err != nil {
		log.Error().Err(err).Str("projectKey", projectKey).Msg("Error occurred when retrieving a project")
		return nil
	}
	a.jiraCache.RetrieveProject[projectKey] = project
	return project
}

func (a *App) RetrieveProjectCached(projectKey string) *jira.Project {
	return a.jiraCache.RetrieveProject[projectKey]
}

func (a *App) RetrieveDashboardsForProject(projectKey string) []jira.Board {
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
func (a *App) RetrieveDashboardsForProjectCached(projectKey string) []jira.Board {
	return a.jiraCache.RetrieveDashboardsForProject[projectKey]
}

func (a *App) RetrieveBoardDetails(boardId int) *jira.Board {
	board, _, err := a.jiraClient.Board.GetBoard(boardId)
	if err != nil {
		log.Error().Err(err).Int("boardId", boardId).Msg("Error occurred when retrieving details for a board")
		return nil
	}
	a.jiraCache.RetrieveBoardDetails[boardId] = board
	return board
}
func (a *App) RetrieveBoardDetailsCached(boardId int) *jira.Board {
	return a.jiraCache.RetrieveBoardDetails[boardId]
}

func (a *App) RetrieveSprintsForBoard(boardId string) []jira.Sprint {
	sprints, _, err := a.jiraClient.Board.GetAllSprints(boardId)
	if err != nil {
		log.Error().Err(err).Str("boardId", boardId).Msg("Error occurred when retrieving sprints for a board")
		return nil
	}
	a.jiraCache.RetrieveSprintsForBoard[boardId] = sprints
	return sprints
}
func (a *App) RetrieveSprintsForBoardCached(boardId string) []jira.Sprint {
	return a.jiraCache.RetrieveSprintsForBoard[boardId]
}

func (a *App) RetrieveSprint(sprintId int) []jira.Issue {
	sprint, _, err := a.jiraClient.Sprint.GetIssuesForSprint(sprintId)
	if err != nil {
		log.Error().Err(err).Int("sprintId", sprintId).Msg("Error occurred when retrieving a sprint")
		return nil
	}
	a.jiraCache.RetrieveSprint[sprintId] = sprint
	return sprint
}
func (a *App) RetrieveSprintCached(sprintId int) []jira.Issue {
	return a.jiraCache.RetrieveSprint[sprintId]
}

func (a *App) AddFavourite(url string, name string) {
	a.favourites[url] = name
}

func (a *App) RemoveFavourite(url string) {
	delete(a.favourites, url)
}

func (a *App) GetFavourites() map[string]string {
	return a.favourites
}

func userHomeDir() string {
	if runtime.GOOS == "windows" {
		home := os.Getenv("HOMEDRIVE") + os.Getenv("HOMEPATH")
		if home == "" {
			home = os.Getenv("USERPROFILE")
		}
		return home
	}
	if runtime.GOOS == "linux" {
		home := os.Getenv("XDG_CONFIG_HOME")
		if home != "" {
			return home
		}
	}
	return os.Getenv("HOME")
}

func writeFile(v interface{}, filename string) {
	file, err := json.MarshalIndent(v, "", " ")
	if err != nil {
		log.Error().Err(err).Str("fileName", filename).Msg("Error occurred marshalling a file")
		return
	}
	err = ioutil.WriteFile(userHomeDir()+"/"+filename, file, 0644)
	if err != nil {
		log.Error().Err(err).Str("fileName", filename).Msg("Error occurred writing a file")
	}
}

func readFavourites() map[string]string {
	bytes, err := ioutil.ReadFile(userHomeDir() + "/" + favouritesFileName)
	if err != nil {
		log.Info().Err(err).Msg("Could not read file " + favouritesFileName)
		return make(map[string]string)
	}
	var favourites map[string]string
	err = json.Unmarshal(bytes, &favourites)
	if err != nil {
		log.Warn().Err(err).Msg("Could not marshal file" + favouritesFileName)
		return make(map[string]string)
	}
	return favourites
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
	bytes, err := ioutil.ReadFile(userHomeDir() + "/" + cacheFileName)
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
