const Discord = require("discord.js");
let config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let versInf = "- Improved help command functionality and appearance, now separated into command categories \n- Level cap expanded at ranksPart.json, having all the level data up to 999 \n- Rank command can now backup all server level data \n- Restore with backups from Rikard's saves to replace a users level, xp and msg count \n- Reset All command makes a backup and resets all ranks in the server \n- Restore All command creates a backup and restores ranks in the server \n- Rikard can now solve equations through chat and calculate percentages \n- Embeds in general now look better when Rikard responds \n- Rank command shows a progress bar along with percentage \n\n- Bot config includes values to change progress bar characters and length from 0-100 \n- Added command list";
  let versInf2 = "- None :(";
  message.delete();
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
    .setTitle("v1.2.0 (07/23/2019)")
    .setDescription("Rikard Bot serves as a personal Discord bot that provides custom commands relative to the creators needs.")
    .setImage("https://i.imgur.com/4BF1DoJ.png")
    .setColor(config.red)
    .setURL("https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.2.0")
    .setThumbnail("https://i.imgur.com/4BF1DoJ.png")
    .addField("Framework Enhancements", versInf)
    .addField("Bug Fixes", versInf2)
    .addField("Created On", bot.user.createdAt)
    .setFooter("https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.2.0");

  return message.channel.send(botembed);
}
module.exports.help = {
  name: 'botinfo'
}
