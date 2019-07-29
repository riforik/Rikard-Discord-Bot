const Discord = require("discord.js");
const mexp = require('math-expression-evaluator');
const errors = require("../utils/errors.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let xp = require("../utils/xp.json");
const ranks = require("../utils/ranksPart.json");
const fs = require("fs");

module.exports.run = async (bot, message, validateArgsArr, someData, pingTimer, upTimerArr, args) => {
  // message.delete();

  if (!message.member.hasPermission("SEND_MESSAGES")) return errors.noPerms(message, "SEND_MESSAGES");

  if (args[0] == "help") {
    message.reply(`${helpFile.math.name} ${helpFile.math.command}`);
    return;
  }
  if (args[0] == "bot") {
    message.reply(`${helpFile.math.name} ${helpFile.math.command}`);
    return;
  }

  let equation = args.join(" ");
  if (equation.includes("process.exit()")) {
    message.reply(`${helpFile.math.name} ${helpFile.math.command}`);
    return;
    return errors.noPerms(message, "MANAGE_GUILD");
  }
  console.log(equation);

  function doEquation(equation) {
    // let cutEquation = equation.replace(/['"]+/g, '');
    try {
      let solvedEquation = mexp.eval(equation);
      var lexed = mexp.lex(equation);
      var postfix = lexed.toPostfix();
      var result = postfix.postfixEval();

      let solvedEmbed = new Discord.RichEmbed()
        .setColor(config.limegreen)
        .addField(`**${result}**`, `${equation}`);

      message.channel.send(solvedEmbed);
    } catch (e) {
      console.log(result);
      message.reply("Check your equation, use correct symbols as operators i.e. multiplication = *");
    }
  }

  function doPercentage(partialValue, totalValue) {
    try {
      let percVal = (100 * partialValue) / totalValue;
      if (percVal === NaN) {
        message.reply(`The result is not a number`);
      } else {
        let solvedEmbedP = new Discord.RichEmbed()
          .setColor(config.limegreen)
          .addField(`**${percVal.toFixed(2)}%**`, `${partialValue} / ${totalValue} * 100`);

        message.channel.send(solvedEmbedP);
      }
    } catch (e) {
      message.reply("Check your values");
    }
  }

  if (args[0] === "p") {
    doPercentage(args[1], args[2]);
  } else {
    doEquation(equation);
  }

}

module.exports.help = {
  name: "math"
}
