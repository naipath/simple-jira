package utils

import (
	"encoding/json"
	"github.com/rs/zerolog/log"
	"io/ioutil"
	"os"
	"runtime"
)

func WriteFile(v interface{}, filename string) {
	file, err := json.MarshalIndent(v, "", " ")
	if err != nil {
		log.Error().Err(err).Str("fileName", filename).Msg("Error occurred marshalling a file")
		return
	}
	err = ioutil.WriteFile(UserHomeDir()+"/"+filename, file, 0644)
	if err != nil {
		log.Error().Err(err).Str("fileName", filename).Msg("Error occurred writing a file")
	}
}

func UserHomeDir() string {
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
