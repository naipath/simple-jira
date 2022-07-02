package main

import (
	"context"
	"encoding/json"
	"github.com/naipath/simple-jira-app/utils"
	"github.com/rs/zerolog/log"
	"io/ioutil"
)

const favouritesFileName = ".simple-jira-favourites.json"

type App struct {
	ctx        context.Context
	favourites map[string]string
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.favourites = readFavourites()
}

func (a *App) shutdown() {
	utils.WriteFile(a.favourites, favouritesFileName)
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

func readFavourites() map[string]string {
	bytes, err := ioutil.ReadFile(utils.UserHomeDir() + "/" + favouritesFileName)
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
