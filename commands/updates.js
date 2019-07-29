const Discord = require("discord.js");
let config = require("../botconfig.json");
let versInf = "- Knex.js added for sql security \n- Joi.js added for user input sanitation \n- Mexp.js added to evaluate math rather than the unsecure eval in vanilla JS \n- Custom schema's for commands interacting heavily based on user input \n- Inherited schema from the index file standardizing user input to string and escaping potentially harmful characters with regex replace. This alone is not a guarantee so a custom schema is build to continue verifying proper user input \n- Uptime command added \n- Ping command added \n- ConnPool now an option for connecting to a database rather than normal conn";
let versInf2 = "- Role rewards now work\n- Rank percentage shows accurately from 0 to max \n- Multiple bug fixes from file cleanup and patch";

module.exports.run = async (bot, message, args) => {

  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");


  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
    .setTitle("Security Update")
    .setDescription("Security patch means adding knex.js for escaping sql injections and preparing for database connection/interaction. The second part of the security patch includes using joi.js to validate user input, using this lets us use custom schema's to ensure specific standards are met on user input.")
    .setImage("https://i.imgur.com/4BF1DoJ.png")
    .setColor(config.red)
    .setURL("https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.2.0")
    .setThumbnail("https://i.imgur.com/4BF1DoJ.png")
    .addField("Framework Enhancements", versInf)
    .addField("Bug Fixes", versInf2)
    .setFooter("v1.3.0 (07/29/2019)", bicon);

  return message.channel.send(botembed);
}
module.exports.help = {
  name: 'updates'
}
