<div align="center">
  <a href="https://discordapp.com/oauth2/authorize?client_id=546796439725015050&permissions=2080898167&scope=bot">
    <img src="https://i.imgur.com/Y1Z0WBT.png" alt="RikardDev logo" width="150" height="150">
  </a>
</div>
<h1 align="center">RikardDev's Discord Bot</h1>


**Rikard Bot** serves as a personal Discord bot that provides custom commands relative to the creators needs. [For support look here...](https://github.com/riforik/Rikard-Discord-Bot/blob/production/README.md#support)


[![Discord](https://img.shields.io/discord/600715508697792551.svg?color=%237289DA&logo=discord&logoColor=White&style=flat)](https://discord.gg/DMsYtJc)
[![Invite](https://img.shields.io/badge/Rikard-Invite%20to%20Server.svg?color=%237289DA&logo=discord&logoColor=White&style=flat)](https://discordapp.com/oauth2/authorize?client_id=546796439725015050&permissions=2080898167&scope=bot)
[![GitHub All Releases](https://img.shields.io/github/downloads/riforik/Rikard-Discord-Bot/total.svg)](https://github.com/riforik/Rikard-Discord-Bot/blob/master/)
[![GitHub](https://img.shields.io/github/license/riforik/Rikard-Discord-Bot.svg)](https://github.com/riforik/Rikard-Discord-Bot/blob/staging/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/riforik/Rikard-Discord-Bot.svg?style=social)](https://github.com/riforik/Rikard-Discord-Bot/stargazers)

[Add Rikard to your server!](https://discordapp.com/oauth2/authorize?client_id=546796439725015050&permissions=2080898167&scope=bot)

### [Full command list](./commands/CommandList.md)

> ## v1.2.0 (07/23/2019)
>
> #### Framework Enhancements:
>
> - Improved help command functionality and appearance, now separated into command categories
> - Level cap expanded at [ranksPart.json](./utils/ranksPart.json), having all the level data up to **999**
> - **Rank command can now backup all server level data**
> - **Restore with backups** from Rikard's saves to replace a users level, xp and msg count
> - **Reset All** command makes a backup and resets all ranks in the server
> - **Restore All** command creates a backup and restores ranks in the server
> - **Rikard can now solve equations** through chat and calculate **percentages**
> - Embeds in general now look better when Rikard responds
> - Rank command shows a progress bar along with percentage
> - Bot config includes values to change progress bar characters and length from 0-100
> - Added command list
>
> #### Bug Fixes:
> - None :(




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

### Installing

A step by step series of examples that tell you how to get a development env running

After installing [node.js](https://nodejs.org/en/) enter the following into your terminal at the bot folder location

```shell
> npm i
```
this will automatically do...

```shell
> npm install discord.js -s

> npm install superagent -s

> npm install ms
```
because of the package.json

After installing find `/utils/conn.js` and add your live server credentials

Do the same for `/token.json`, import your [Discord developer](https://discordapp.com/developers/applications/) bot token


#### These packages come from:

* [MS](https://www.npmjs.com/package/ms) - Used to convert milliseconds
* [Discord.js](https://discord.js.org/#/) - Interacting with discord api
* [Super Agent](https://www.npmjs.com/package/superagent) - Interacting with web .json data


## Connecting to your database
Your `conn.js` file should link to your hosted servers but you still have no database structure.

1. In `conn.js`, `database: 'your_database_here'` is where you want to enter your mySQL database name
2. Create tables in your database with [these values](https://github.com/riforik/Rikard-Discord-Bot/tree/production/utils/db.sql), just import the file into your database the structure is set

The tables should not be able to be filled with data from reports or custom commands

#### !!beware of **sql injections**, my prepared statements aren't a guarantee so data leaking will occur at your own risk when setting up your own bot!!


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

[Discord Support Server](https://discord.gg/DMsYtJc)

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
