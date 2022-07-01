package main

import (
	"embed"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	level, _ := zerolog.ParseLevel("info")
	zerolog.SetGlobalLevel(level)
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	app := NewApp()

	err := wails.Run(&options.App{
		LogLevel:   logger.INFO,
		Title:      "Simple Jira",
		Assets:     assets,
		OnStartup:  app.startup,
		OnShutdown: app.shutdown,
		Bind:       []interface{}{app},
		Mac: &mac.Options{
			About: &mac.AboutInfo{
				Title:   "Simple-jira",
				Message: "© 2022 Teije van Sloten",
				Icon:    icon,
			},
		},
	})

	if err != nil {
		log.Error().Err(err).Msg("Failed to start wails")
	}
}
