const Discord = require("discord.js");
let config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let versInf = "- Small patch to fix issue relating to commands prefix \n- Levels now accurately follow mee6 calculation with ranks.json having all the level data up to 100 \n- Levels are delayed based on a minute timer \n- Add or remove XP from a user with new commands \n- Reset or set the rank of a user with new commands \n- Create a role through chat with the default permission being a discord standard for normal users";
  let versInf2 = "- Levels showing improper XP amount until next rank \n- XP not adding at correct rates";
  message.delete();
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
    .setTitle("v1.1.1 (07/21/2019)")
    .setDescription("Rikard Bot serves as a personal Discord bot that provides custom commands relative to the creators needs.")
    .setImage("https://i.imgur.com/4BF1DoJ.png")
    .setColor(config.red)
    .setURL("https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.1.1")
    .setThumbnail("https://i.imgur.com/4BF1DoJ.png")
    .addField("Framework Enhancements", versInf)
    .addField("Bug Fixes", versInf2)
    .addField("Created On", bot.user.createdAt)
    .setFooter("https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.1.1");

  return message.channel.send(botembed);
}
module.exports.help = {
  name: 'botinfo'
}
