const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();


  // If user asks for commands options
  if (args[0] == "help") {
    message.reply(`${helpFile.memberCount.name} ${helpFile.memberCount.command}`);
    return;
  }

  // get member using command
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]),
    memCount = message.guild.memberCount,
    memCountG = message.guild.members,
    botCount = 0,
    available = 0;

  let memCountB = Array.from(memCountG.values());



  console.log("------------------  D A T A  -------------------");
  console.log(`Server: ${message.guild.name}`);
  // console.log(`Members: ${memCount}`);
  console.log(`---------------------\nMembersG:`);
  // console.log(memCountG.map(usr => usr === true));
  // console.log(message.guild.members.map(usr => usr));
  // console.log(message.guild.members
  //   // .tap(user => console.log(user.username))
  //   .filter(user => user.bot));
  // console.log(memCountB);
  for (var i = 0; i < memCountB.length; i++) {
    if (memCountB[i].user.bot) {
      botCount++;
    }
    // console.log(memCountB[i].user.bot);
    // console.log(`<<-=-=-=-=-=-=-=-=-=-=-=->>`);
  }
  console.log(memCountB.length);
  // console.log(memCountB.filter(user => user.displayName));
  console.log(`User Array: ${memCountB}`);
  //filter(bot => bot.bot)
  // id: '132305376732250112',
  //     username: 'rsio',
  //     discriminator: '4128',
  //     avatar: '1b93cd6c6dfbfdf16c9b3647fd5cec6f',
  //     bot: false,
  //     lastMessageID: '600392862445600844',
  //     lastMessage: [Message] },
  // message.guild.members
  //   .tap(user => console.log(user.username))
  //   .filter(user => user.bot)
  //   .tap(user => console.log(user.username));
  // let qMap = new Map([message.guild.members, 4])
  // console.log(Number(memCount));
  // console.log(message.guild.members);
  // for (var i = 0; i < 4; i++) {
  //   console.log(i);
  //   // console.log(message.guild.members.map());
  //   console.log(qMap);
  // }
  console.log("------------------------------------------------\n\n");


  try {
    // await message.channel.send(`There are ${memCount} members in the server, ${botCount} of which are bot(s). ${available} are available`)
    await message.reply(`There are ${memCount} members in ${message.guild.name} (${botCount} bots).`)
  } catch (e) {
    console.log(e.stack);
    message.reply(`Sorry I couldn't do the maths`)
  }
}

module.exports.help = {
  name: "memberCount"
}
