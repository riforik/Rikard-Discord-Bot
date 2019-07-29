const Discord = require("discord.js");
const ms = require("ms");
const humanizeDuration = require('humanize-duration');
const config = require('../botconfig.json');
// https://www.npmjs.com/package/humanize-duration

module.exports.run = async (bot, message, args, someData, pingTimer, upTimer) => {
    let dateNow = new Date();
    let pTime = process.uptime();

    if (!message.member.hasPermission("SEND_MESSAGES")) return;

    function prettyDate(date, startDate) {
        var milisecs = Math.floor((date.getTime() - startDate.getTime()));

        console.log(`Miliseconds: ${milisecs}`);
        return humanizeDuration(milisecs)

        console.log(`DateNow: ${dateNow}\Secs: ${secs}`);
    }
    let convertTime = prettyDate(dateNow, upTimer);

    message.delete().catch();
    let upTimeEmbed = new Discord.RichEmbed()
        .setAuthor("Rikard", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
        .setDescription("Uptime")
        .setTitle(message.author.username)
        .setColor(config.limegreen)
        .addField(`**${convertTime}**`, `Since ${ upTimer.toDateString()}`);

    message.channel.send(upTimeEmbed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "uptime"
}
