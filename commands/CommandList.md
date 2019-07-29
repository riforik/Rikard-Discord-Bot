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

### [Back to ReadMe](../README.md)

> ## v1.3.0 (07/29/2019)
>
> #### Framework Enhancements:
>
> - **Knex.js added for sql security**
> - **Joi.js added for user input sanitation**
> - **Mexp.js** added to evaluate math rather than the unsecure eval in vanilla JS
> - **Custom schema's** for commands interacting heavily based on user input
> - **Inherited schema** from the index file **standardizing user input to string and escaping potentially harmful characters** with regex replace. *This alone is not a guarantee so a custom schema is built to continue verifying proper user input*
> - Uptime command added
> - Ping command added
> - Cloud commands list added
> - Server builder info commands added (rules, cmdList, introduction, updates)
> - Math command now uses **mexp** to ensure that equations are safely calculated and code does not slip past eval methods
> - ConnPool now an option for connecting to a database rather than normal conn
>
> #### Bug Fixes:
> - Role rewards now work
> - Rank percentage shows accurately from 0 to max
> - Multiple bug fixes from file cleanup and patch


## Command List

### Moderation
[**r!addCommand**](./addCommand.js) adds command with content r!addCommand [command] [content]

[**r!addrole**](./addrole.js) gives a user a desired role r!addrole @[user] [role name]

[**r!ban**](./ban.js) bans a user from the server r!ban @[user] [reason]

[**r!botinfo**](./botinfo.js) provides info on Rikard

[**r!clear**](./clear.js) clears chat messages r!clear [number]

[**r!createRole**](./createRole.js) creates a role by specifying name, colour and perms. r!createRole [name] [hexidecimal number] [permission number]

[**r!kick**](./kick.js) kicks user from server r!kick @[user] [reason]

[**r!nickname**](./nickname.js) change nicknames by r!nickname [user] [desired nickname]

[**r!purge**](./purge.js) purge chat from a desired amount of messages

[**r!removerole**](./removerole.js) removes role from user r!removerole @[user] [role name]

[**r!report**](./report.js) reports a user r!report @[user] [reason]

[**r!tempmute**](./tempmute.js) temporarily restrict a user from typing r!tempmute @[user] [1s/m/h/d]


---
### General
[**r!actualized**](./actualized.js) provides information on actualized.org

[**r!avatar**](./avatar.js) shows you your avatar

[**r!customCmds**](./customCmds.js) show the custom server related commands stored in a database

[**r!help**](./help.js) return information about commands Rikard has

[**r!memberCount**](./memberCount.js) displays server user count r!memberCount

[**r!serverinfo**](./serverinfo.js) provide information about the server

[**r!ping**](./ping.js) recieve pong! (x)ms

[**r!uptime**](./serverinfo.js) the duration of time Rikard has been online for


---
### Music
[**r!play**](./play.js) play music r!play [youtube.url]

[**r!stop**](./stop.js) stop the current playing music.


---
### Fun
[**r!cat**](./cat.js) make day worse

[**r!doggo**](./doggo.js) brighten up day


---
### Math
[**r!math**](./math.js) solve an equation, or use r!math p [number] [number] for percentage


---
### Level System
[**r!addXp**](./addXp.js) gives XP to a user r!addXp @[user] [XP]

[**r!rank**](./rank.js) shows your level, another users level or level stats. r!rank @[user] or [level]. Backup your servers ranks with r!rank b

[**r!resetRank**](./resetRank.js) resets a users XP, level and message count r!resetRank @[user]

[**r!restoreRank**](./restoreRank.js) restore a users XP, level and message count r!restore @[user] [file]

[**r!setRank**](./setRank.js) sets rank with 3 numers r!setRank @[user] [XP] [Lvl] [Message Count]

[**r!takeXp**](./takeXp.js) subtracts XP from a user r!takeXp @[user] [XP]


---
### Management
[**r!cmdList**](./cmdList.js) shows the commands in a sectioned/structured manor

[**r!introduction**](./introduction.js) shows the welcome message to your server's info (Rikard Support Server by default)

[**r!rules**](./rules.js) display a set of rules that users must follow on your server

[**r!updates**](./updates.js) Recent updates from your server (Rikard Bot development as default)


---


## Authors

* **RikardDev** - *Initial work* - [I.R. Media](https://isaiahrobinson.ca/)

See also the list of [contributors](https://github.com/riforik/Rikard-Discord-Bot/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Big thanks to [{TheSourceCode}](https://www.youtube.com/channel/UCNXt2MrZaqfIBknamqwzeXA) for tutorials relating this topic
* Inspiration
* etc
