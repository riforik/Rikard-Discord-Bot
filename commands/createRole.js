const Discord = require("discord.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");

  // https://discordapi.com/permissions.html#8
  if (args[0] == "help") {
    let helpEmbed = new Discord.RichEmbed()
      .setDescription("Create role usage")
      .setAuthor("Permissions Calculator", "https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg", "https://discordapi.com/permissions.html#0")
      .setColor(config.blue)
      .addField("Create Role", helpFile.createRole.command, true)
      .setFooter(`https://discordapi.com/permissions.html#0`);

    message.channel.send(helpEmbed).then(msg => msg.delete(10000));
    return;
  }

  // is calculation input positive
  function isPosNum(num) {
    return !isNaN(num) && num > 0;
  }


  let roleName = args[0];
  let roleClr = args[1];
  let rolePerms = parseInt(args[2]);


  if (!roleName) return message.reply("You didn't specify a name!").then(msg => msg.delete(3000));
  if (!roleName) return message.reply("You didn't specify a colour!").then(msg => msg.delete(3000));
  if (!rolePerms) {
    message.reply("You didn't specify the permissions! Default has been given").then(msg => msg.delete(3000));
    rolePerms = 104074304;
  };
  if (!isPosNum(rolePerms)) return message.reply("Permissions must be a number, no string").then(msg => msg.delete(3000));

  let newRole = message.guild.roles.find(`name`, `${args[0]}`);
  //start of create role
  if (!newRole) {
    try {
      newRole = await message.guild.createRole({
        name: roleName,
        color: `#${roleClr}`,
        permissions: [rolePerms]
      })
    } catch (e) {
      console.log(e.stack);
    }
  }
  //end of create role
  message.reply(`@${newRole.name} has been created`).then(msg => msg.delete(5000));

}

module.exports.help = {
  name: "createRole"
}
