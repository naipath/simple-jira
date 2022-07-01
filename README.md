# Simple jira

## About

The aims of this project are:

- Simplified jira interface
- Aggressive caching off calls to increase speed

## Live Development

To run in live development mode, run `wails dev` in the project directory. In another terminal, go into the `frontend`
directory and run `npm run dev`. The frontend dev server will run on http://localhost:34115. Connect to this in your
browser and connect to your application.

## Building

To build a redistributable, production mode package, use `wails build`.

## Features

- [x] Login
- [x] Logout
- [x] Saved login
- [x] Project overview
- [x] Project details
- [x] Board overview
- [x] Board details
- [x] Sprint overview
- [x] Issue search
- [x] Issue details (summary + comments)
- [x] Favourites
- [x] Caching of all calls
- [x] Jira call metrics
- [x] Basic back functionality
- [ ] Enhance back functionality
- [ ] Adding comments to Issue
- [ ] Improved rendering of summary + comments page
- [ ] Sorting on Sprint overview
