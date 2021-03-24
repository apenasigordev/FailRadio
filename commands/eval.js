const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
module.exports = {
  name: "eval",
  aliases: ["e"],
  execute(client,message,args) {
    if(message.author.id === "407859300527243275") {
        function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
      }
  }
};