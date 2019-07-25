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

[**r!help**](./help.js) return information about commands Rikard has

[**r!memberCount**](./memberCount.js) displays server user count r!memberCount

[**r!serverinfo**](./serverinfo.js) provide information about the server


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
[**r!rank**](./rank.js) shows your level, another users level or level stats. r!rank @[user] or [level]. Backup your servers ranks with r!rank b

[**r!resetRank**](./resetRank.js) resets a users XP, level and message count r!resetRank @[user]

[**r!restoreRank**](./restoreRank.js) restore a users XP, level and message count r!restore @[user] [file]

[**r!setRank**](./setRank.js) sets rank with 3 numers r!setRank @[user] [XP] [Lvl] [Message Count]

[**r!addXp**](./addXp.js) gives XP to a user r!addXp @[user] [XP]

[**r!takeXp**](./takeXp.js) subtracts XP from a user r!takeXp @[user] [XP]


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
