package jirahelper

import (
	"encoding/json"
	"github.com/andygrunwald/go-jira"
	"github.com/naipath/simple-jira-app/utils"
	"github.com/rs/zerolog/log"
	"io/ioutil"
	"os"
)

func (a *JiraHelper) AuthenticateReal(credentials LoginCredentials) {
	tp := jira.BasicAuthTransport{Username: credentials.EmailAddress, Password: credentials.Token}

	client, err := jira.NewClient(tp.Client(), credentials.Url)
	_, _, err = client.User.GetSelf()
	if err != nil {
		log.Error().Err(err).Msg("Could not authenticate")
	}
	a.jiraClient = client
	jiraCache := readJiraCache()
	a.jiraCache = jiraCache

	utils.WriteFile(credentials, credentialsFileName)
}

func (a *JiraHelper) IsAuthenticated() bool {
	return a.jiraClient != nil
}

func (a *JiraHelper) TryLoggingWithPreviousCredentials() {
	bytes, err := ioutil.ReadFile(utils.UserHomeDir() + "/" + credentialsFileName)
	if err != nil {
		log.Info().Err(err).Msg("Could not read file" + credentialsFileName)
	}
	var loginCredentials LoginCredentials
	err = json.Unmarshal(bytes, &loginCredentials)

	if err != nil {
		log.Warn().Err(err).Msg("Could not marshal file" + credentialsFileName)
	}
	a.AuthenticateReal(loginCredentials)
}

func (a *JiraHelper) LogOut() {
	a.jiraClient = nil
	err := os.Remove(utils.UserHomeDir() + "/" + credentialsFileName)
	if err != nil {
		log.Warn().Err(err).Msg("Could not remove " + credentialsFileName)
	}
	err = os.Remove(utils.UserHomeDir() + "/" + cacheFileName)
	if err != nil {
		log.Warn().Err(err).Msg("Could not remove " + cacheFileName)
	}
}
