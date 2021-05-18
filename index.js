const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
const express = require('express'),
app = express();
const Topgg = require("@top-gg/sdk");
let meet = require("nicemeet.js");
const webhook = new Topgg.Webhook(process.env.webhook);
const moment = require('moment-timezone');
//var ytpl = require('ytpl');
let prefix = "f!";
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = db;

const { APIMessage, Message } = require('discord.js');
//const superagent = require('superagent');
/**
* @param {StringResolvable|APIMessage} [content='']
* @param {MessageOptions|MessageAdditions} [options={}]
* @param {string} [options?.messageID] - o ID da mensagem que será citada
* @param {boolean} [options?.mention] - caso deva mencionar o autor da mensagem
*/

Message.prototype.quote = async function (content, options) {
  const message_reference = {
    message_id: (
      !!content && !options
        ? typeof content === 'object' && content.messageID
        : options && options.messageID
    ) || this.id,
    message_channel: this.channel.id
  }

  const allowed_mentions = {
    parse: ['users', 'roles', 'everyone'],
    replied_user: typeof content === 'object' ? content && +content.mention : options && +options.mention
  }

  const { data: parsed, files } = await APIMessage
    .create(this, content, options)
    .resolveData()
    .resolveFiles()

  this.client.api.channels[this.channel.id].messages.post({
    data: { ...parsed, message_reference, allowed_mentions },
    files
  })
}

app.get("/", (req,res) => {
  res.sendStatus(200);
});
app.post("/dblwebhook", webhook.middleware(), (req, res) => {
  let votembed = new Discord.MessageEmbed()
  .addFields([{
    name: "🇧🇷 | Obrigado",
    value: `Obrigado por votar no FailRadio!`
  },
  {
    name: "🇺🇲 | Thank you!",
    value: `Thank you for voting for FailRadio!`
  }])
  .setColor("PURPLE");
  client.users.cache.get(req.vote.user).send(votembed);
});
app.listen(process.env.PORT)
fs.readdir(`./commands/`, (error, files) => {
    if (error)return console.log("Error while trying to get the commmands.");
     
    files.forEach(file => {
        const command = require(`./commands/${file}`);
        const commandName = file.split(".")[0];

        client.commands.set(commandName, command);

        if (command.aliases) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command);
            });
        };
    });
});
client.on("ready", () => {
  let activity = ""
  let h = moment().tz("america/sao_paulo").format("h");
  if(h >= 06) {
 activity = [
    {name: "Escute qualquer estação em seu servidor!", type: 0},
    {name: "Use f!help para ver meus comandos.", type: 3},
    {name: `${client.guilds.cache.size} Servidores`, type: 5}
    ];
  } else if(h >= 11) {
    activity = {name: "Almoçando...", type: 3};
  } else if(h >= 13) {
    activity = [
      {name: "Use f!help para ver meus comandos."},
      {name: `${client.users.cache.size} Usuários.`, type: 3},
      {name: `${client.guilds.cache.size} Servidores`, type: 5}
      ];
  } else {
    activity = [
      {name: "Escute qualquer estação em seu servidor!", type: 0},
      {name: "Use f!help para ver meus comandos.", type: 3},
      {name: `${client.guilds.cache.size} Servidores`, type: 5}
      ];
  }
  setInterval(() => {
    let activitie = activity[Math.floor(Math.random() * activity.length)];
  client.user.setActivity(activitie);
    }, 16000);
    client.user.setStatus('ONLINE');
    console.log("Ativo.");
    // Slash Commands
    
});
client.on("guildCreate", (guild) => {
  console.log(guild);
});
client.on("reconnecting", () => {
  client.user.setStatus("IDLE");
  console.log("Reconectando...");
})
client.on("error", (err) => {
client.user.setActivity("Erro encontrado, por favor, aguarde o bot reconectar...");
client.user.setStatus("DND");
console.log(err);
});
client.on("message", msg => {

    if (msg.content.startsWith(prefix) && !msg.author.bot && msg.guild) {
        const args = msg.content.slice(prefix.length).split(" ");
        const command = args.shift().toLowerCase();
        
        if (client.commands.find(f => f.name === command)) {
            client.commands.get(command).execute(client, msg, args)
        }
       /* if(client.commands.get(command)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) {
	  client.aliases.get(command).execute(client,msg,args);
	}*/
    }
});
client.login(process.env.token);