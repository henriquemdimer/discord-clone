🇧🇷🇵🇹[Português](README.pt.md)

![Website](https://img.shields.io/website?url=https%3A%2F%2F6ecad9b7-37e5-4458-99b8-6c526fc5c467-00-x4un4vi5k0yt.spock.replit.dev%3A8080%2F)

## About the project
In this project, I will recreate the Discord application both in the Backend and Frontend, the main goal of this project is to test my skills and see how long it would take to develop an application of this level/niche, I intend to make its functionality/visual as close as possible to the original Discord.

## Table of Contents
- [Built With](#built-with)
- [Installation](#installation)
- [Roadmap](#roadmap)

## Built With
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Installation
Make sure you have Git, Docker, and Docker Compose installed, and a recent version of Nodejs and NPM

1. Clone the repository
```sh
git clone https://github.com/devdimer/discord-clone.git
```

2. Start the docker-compose services
```sh
docker-compose up
```

After that, the app should be up and ready to be accessed, just open the browser and type the url http://localhost:3000

## Roadmap

- [ ] Client
    - [x] Basic UI
    - [x] Registration/login UI
    - [x] Loading screen 
    - [ ] Profiles
    - [ ] Friends UI
    - [ ] Account/app settings screen
    - [ ] Guild (server) settings
- [ ] Server
    - [x] Create/Edit/Delete account
    - [x] Create/Edit/Delete guild (server)
    - [x] Create/Edit/Delete categories and channels
    - [ ] Create/Edit/Delete messages
    - [ ] WebSockets
        - [x] Real-time message event
        - [ ] Real-time guild event
        - [x] Real-time channel event
        - [ ] Real-time role event
    - [ ] Create/Edit/Delete roles
    - [ ] Moderation actions (ban, kick, mute)
    - [ ] Role and user permissions
    - [ ] Add friends
    - [ ] Private messages
