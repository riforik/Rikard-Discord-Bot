const Discord = require("discord.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();
  //!tempmute @user 1s/m/h/d
  if (args[0] == "help") {
    message.reply(`${helpFile.tempmute.name} ${helpFile.tempmute.command}`);
    return;
  }
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!toMute) return message.reply("Couldn't find user.");
  if (toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muteRole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if (!muteRole) {
    try {
      muteRole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  //end of create role
  let muteTime = args[1];
  if (!muteTime) return message.reply("You didn't specify a time!");

  await (toMute.addRole(muteRole.id));
  message.reply(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`).then(msg => msg.delete(3000));

  setTimeout(function() {
    toMute.removeRole(muteRole.id);
    message.channel.send(`<@${toMute.id}> has been unmuted!`).then(msg => msg.delete(3000));
  }, ms(muteTime));


  //end of module
}

module.exports.help = {
  name: "tempmute"
}
