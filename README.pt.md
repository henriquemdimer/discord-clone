🇺🇲[English](README.md)

![Website](https://img.shields.io/website?url=https%3A%2F%2F6ecad9b7-37e5-4458-99b8-6c526fc5c467-00-x4un4vi5k0yt.spock.replit.dev%3A8080%2F)

## Sobre o projeto
Neste projeto irei recriar a aplicação Discord tanto na parte Backend quanto Frontend, o objetivo principal deste projeto é testar minhas habilidades e ver quanto tempo levaria para desenvolver uma aplicação deste nível/nicho, pretendo fazer seu funcionamento/visual o mais próximo possível do Discord original

## Índices
- [Built With](#built-with)
- [Instalação](#instalação)
- [Roadmap](#roadmap)

## Built with
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Instalação
Certifique-se de ter Git, Docker e Docker Compose instalados e uma versão recente do Nodejs e NPM

1. Clone o repositório
```sh
git clone https://github.com/devdimer/discord-clone.git
```

2. Inicie os serviços do docker-compose
```sh
docker-compose up
```

Após isso o app deverá estar rodando e pronto para ser acessado, basta abrir o navegador e digitar a url http://localhost:3000

## Roadmap

- [ ] Client
    - [x] UI Básica
    - [x] UI de registro/login
    - [x] Tela de carregamento
    - [ ] Perfis
    - [ ] UI de amigos
    - [ ] Tela de configuração da conta/app
    - [ ] Configurações da guild (servidor)
- [ ] Server
    - [x] Criar/Editar/Deletar conta
    - [x] Criar/Editar/Deletar guilda (servidor)
    - [x] Criar/Editar/Deletar categorias e canais
    - [ ] Criar/Editar/Deletar mensagens
    - [ ] WebSockets
        - [x] Evento de mensagens em tempo real
        - [ ] Evento de guildas em tempo real
        - [x] Evento de canais em tempo real
        - [ ] Evento de cargos em tempo real
    - [ ] Criar/Editar/Deletar cargos
    - [ ] Ações de moderação (banimento, expulsão, mute)
    - [ ] Permissões de cargos e usuarios
    - [ ] Adicionar amigos
    - [ ] Mensagens privadas
