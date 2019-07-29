<div align="center">
  <a href="https://discordapp.com/oauth2/authorize?client_id=546796439725015050&permissions=2080898167&scope=bot">
    <img src="https://i.imgur.com/Y1Z0WBT.png" alt="RikardDev logo" width="150" height="150">
  </a>
</div>
<h1 align="center">RikardDev's Discord Bot</h1>


**Rikard Bot** serves as a personal Discord bot that provides custom commands relative to the creators needs. [For support look here...](https://github.com/riforik/Rikard-Discord-Bot/blob/production/README.md#support)


[![Discord](https://img.shields.io/discord/600715508697792551.svg?color=%237289DA&logo=discord&logoColor=White&style=flat)](https://discord.gg/mZzsJfg)
[![Invite](https://img.shields.io/badge/Rikard-Invite%20to%20Server.svg?color=%237289DA&logo=discord&logoColor=White&style=flat)](https://discordapp.com/oauth2/authorize?client_id=546796439725015050&permissions=2080898167&scope=bot)
[![GitHub All Releases](https://img.shields.io/github/downloads/riforik/Rikard-Discord-Bot/total.svg)](https://github.com/riforik/Rikard-Discord-Bot/blob/master/)
[![GitHub](https://img.shields.io/github/license/riforik/Rikard-Discord-Bot.svg)](https://github.com/riforik/Rikard-Discord-Bot/blob/staging/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/riforik/Rikard-Discord-Bot.svg?style=social)](https://github.com/riforik/Rikard-Discord-Bot/stargazers)

[Add Rikard to your server!](https://discordapp.com/oauth2/authorize?client_id=546796439725015050&permissions=2080898167&scope=bot)

### [Full command list](./commands/CommandList.md)

> ## v1.3.0 (07/29/2019)
>
> #### Framework Enhancements:
>
> - **Knex.js added for sql security**
> - **Joi.js added for user input sanitation**
> - **Mexp.js** added to evaluate math rather than the unsecure eval in vanilla JS
> - **Custom schema's** for commands interacting heavily based on user input
> - **Inherited schema** from the index file **standardizing user input to string and escaping potentially harmful characters** with regex replace. *This alone is not a guarantee so a custom schema is build to continue verifying proper user input*
> - Uptime command added
> - Ping command added
> - Cloud commands list added
> - Server builder info commands added
> - Math command now uses **mexp** to ensure that equations are safely calculated and code does not slip past eval methods
> - ConnPool now an option for connecting to a database rather than normal conn
>
> #### Bug Fixes:
> - Role rewards now work
> - Rank percentage shows accurately from 0 to max
> - Multiple bug fixes from file cleanup and patch


## Getting Started
Follow these steps to get your own version of the bot up and running.

- [Intro](#rikarddevs-discord-bot)
- [Prerequisites](#prerequisites)
- [Installation](#installing)
- [Configuration file](#connecting-to-your-database)
- [Basic Usage](#starting-the-bot)

### Prerequisites

What will you need to install the bot

[Node.js](https://nodejs.org/en/)
[Rikard Discord Bot](https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.2.0)

### Installing
Move the Rikard Discord Bot folder to the directory you choose and open that location in a command line/terminal window...

```shell
> cd /Rikard-Discord-Bot/
```

A step by step series of examples that tell you how to get a development env running

After installing [node.js](https://nodejs.org/en/) enter the following into your terminal at the bot folder location

```shell
> npm i
```
this will automatically do install the dependencies and packages the bot needs to run because of the package.json

After installing find `/utils/conn.js` as well as `/utils/connPool.js` and add your live server credentials

Do the same for `/token.json`, import your [Discord developer](https://discordapp.com/developers/applications/) bot token


#### These packages come from:

* [MS](https://www.npmjs.com/package/ms) - Used to convert milliseconds
* [Discord.js](https://discord.js.org/#/) - Interacting with discord api
* [Super Agent](https://www.npmjs.com/package/superagent) - Interacting with web .json data
* [Knex](https://www.npmjs.com/package/knex) - Multi-dialect query builder for Node.js
* [Math-Expression-Evaluator](https://www.npmjs.com/package/superagent) - An extremely efficient evaluator for Math expression in Javascript
* [Joi](https://www.npmjs.com/package/@hapi/joi) - Object schema description language and validator for JavaScript objects
* [Humanize Duration](https://www.npmjs.com/package/humanize-duration) - Object schema description language and validator for JavaScript objects

*Others included bot not mentioned...*





## Connecting to your database
Your `conn.js` file should link to your hosted servers but you still have no database structure.

1. In `conn.js` and `connPool.js`, `database: 'your_database_here'` is where you want to enter your mySQL database name
2. Create tables in your database with [these values](https://github.com/riforik/Rikard-Discord-Bot/tree/production/utils/db.sql), just import the file into your database and the structure is set


#### !!beware of **sql injections**, the security patch sanitizes user input however trusting/using user input is done at your own discretion!!


## Starting the Bot
After installing the packages
open terminal and...

1. locate the bot folder and open a terminal window there
```shell
> cd /Rikard-Discord-Bot/
```

2. run this command to start the bot
```shell
> npm run start
```

Your terminal should look like this...
```shell
Last login: Mon Feb 18 13:58:53 on ttys000

Rikards-Macbook-Pro:~ Rikard$ cd /Users/Rikard/Documents/RikardDev/Rikard-Discord-Bot

Rikards-Macbook-Pro:Rikard-Discord-Bot Rikard$ npm run start

> Rikard-Discord-Bot@1.0.0 start /Users/Rikard/Documents/RikardDev/Rikard-Discord-Bot

> node index.js

actualized.js loaded!
addrole.js loaded!
avatar.js loaded!
ban.js loaded!
botinfo.js loaded!
cat.js loaded!
clear.js loaded!
doggo.js loaded!
help.js loaded!
kick.js loaded!
removerole.js loaded!
report.js loaded!
say.js loaded!
serverinfo.js loaded!
tempmute.js loaded!
Rikard is online on (x) servers!
```

## Running the tests - r!help

Keep an eye on your terminal and test out the commands in your Discord server. A list of commands can be found by using r!help

### Shutting down Rikard

In your terminal window you can press [Control + C] on Windows or Mac *(may prompt for Y/N confirmation)*

## Support

[Discord Support Server](https://discord.gg/mZzsJfg)

This is seriously the best way to contact me, no social media could come close to the efficiency; I will only post this. It is the fastest.

### Init

If you are missing or lost the package.json and accommodating files you may have to re-init

```shell
npm init
```

## Built With

* [Discord.js](https://discord.js.org/#/) - Built using discord.js as a dependency
* [Node.js](https://nodejs.org/en/) - Built using node and it's dependencies

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on using Rikard Discord and the code of conduct, also the process for submitting pull requests to me.


## Authors

* **RikardDev** - *Initial work* - [I.R. Media](https://isaiahrobinson.ca/)

See also the list of [contributors](https://github.com/riforik/Rikard-Discord-Bot/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Big thanks to [{TheSourceCode}](https://www.youtube.com/channel/UCNXt2MrZaqfIBknamqwzeXA) for tutorials relating this topic
* Inspiration
* etc
