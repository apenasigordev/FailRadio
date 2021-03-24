const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
const app = require('express')();
const Topgg = require("@top-gg/sdk");
const meet = require("nicemeet.js")
const webhook = new Topgg.Webhook(process.env.webhook);

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
var bodyParser = require('body-parser')
 
//var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
//app.listen(80);
app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/audio", (req,res) => {
  ytdl(db.fetch("radio"),{filter: "audioonly"}).pipe(res);
});
const createNewChunk = () => {
    const pathToFile = __dirname + `/recordings/user.pcm`;
    
    return fs.createWriteStream(pathToFile);
};
app.listen(process.env.PORT);
var bot = require("./status.json");
console.log(process.env.PORT);
client.on("ready", () => {
  let activity = [
    {name: "Escute qualquer estação em seu servidor!", type: 0},
    {name: "Use f!help para ver meus comandos.", type: 3},
    {name: `${client.guilds.cache.size} Servidores`, type: 5}
    ];
    setInterval(() => {
    let activitie = activity[Math.floor(Math.random() * activity.length)];
  client.user.setActivity(activitie);
    }, 16000);
    client.user.setStatus('ONLINE');
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
client.on("message", function(msg) {

  if(msg.author.bot || msg.channel.nsfw || msg.channel.type === "dm") {
    return;
  }
  let message = msg;
  if(message.content === "<@680872684946849828>") {
    message.reply("Olá, use f!help para ver comandos.");
    message.channel.send("Caso você precisar de suporte 24h/7, use f!suporte ou entre em contato com Light Connect no Twitter: @lightconnectt");
  }
  let prefix="f!";
  if(!msg.content.startsWith(prefix)) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 if(command === "ping") {
   message.quote(`🤖 | Ping\nApi: ${client.ws.ping}`);
 }
  if(command === "radio") {
    if(!msg.guild.me.hasPermission("CONNECT")) return msg.quote("Hmmm, não consigo entrar no canal...");
    if(!msg.guild.me.hasPermission("SPEAK")) return msg.quote("Hmmm, não consigo reproduzir o som no canal...");
    let voice = msg.member.voice.channel;
    if(!voice) return msg.quote("Não te encontrei em nenhum canal de voz.");
    if(voice.members.size === voice.userLimit) return msg.quote("Eu acho que o canal em que você está conectado, nesse momento está cheio.");
    console.log(voice);
    //voice.setSelfDeaf(true);
    if(args[0] === "1") {
      voice.join().then(connection => {
        connection.voice.setSelfDeaf(true);
        let lofi = connection.play(ytdl("https://youtu.be/5qap5aO4i9A", {
quality: 'highestaudio',
    highWaterMark: 1 << 25
        }));
        lofi.on("error", (err) => {
          msg.quote("Esta estação está indisponível no momento.")
        
          connection.play("./Radio.mp3");
        })
        lofi.on("start", () => {
        msg.quote("Tocando estação: Lo-Fi!");
        });
      });
    } else if(args[0] === "2") {
      voice.join().then(connection => {
        connection.voice.setSelfDeaf(true);
        let tglr = connection.play(ytdl("https://youtu.be/36YnV9STBqc", {
quality: 'highestaudio',
    highWaterMark: 1 << 25
        }));
        tglr.on("error", (err) => {
          msg.quote("Esta estação está indisponível no momento.")
        
          connection.play("./Radio.mp3");
        });
        tglr.on("start", () => {
        msg.quote("Tocando estação: TGLR!");
        });
      });
    } else if(args[0] === "3") {
      voice.join().then(connection => {
        connection.voice.setSelfDeaf(true);
       let ncs = connection.play(ytdl("https://youtu.be/BSahs0fyv9g", {
quality: 'highestaudio',
    highWaterMark: 1 << 25
        }))
        ncs.on("error",(err) => {
          console.error(err)
          msg.quote("Esta estação está indisponível no momento.")
        
          connection.play("./Radio.mp3");
        });
        ncs.on("start", () => {
        msg.quote("Tocando estação: NCS!");
        });
      });
    } else if(args[0] === "4") {
      voice.join().then(connection => {
        connection.voice.setSelfDeaf(true);
 const play = () => {
 let array = [
   "https://youtu.be/rFtMbqagnA4",
"https://m.youtube.com/watch?v=xGHXu6bKavU",
"https://youtu.be/ur8ftRFb2Ac",
"https://youtu.be/-N4jf6rtyuw",
"https://youtu.be/_dk4JYnVqeI",
"https://youtu.be/5a6LrFPW5-k",
"https://youtu.be/i4YNzxV_jy4",
"https://youtu.be/PjPr6xwY4ss",
"https://youtu.be/HvY62TTte14",
"https://youtu.be/gAjR4_CbPpQ"
   ];
   let playlist = array[Math.floor(Math.random() * array.length)];
 let dispatcher = connection.play(ytdl("https://youtu.be/doNx5K1HcY4"));
 dispatcher.on("error", console.error);
 dispatcher.on("finish", play);
 };
      play();
msg.quote("Vamos se requebrar, a melhor playlist da FailRadio!");
      });
      } else if(args[0] === "5") {
        
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          let s = connection.play(ytdl("https://youtu.be/CyPqFllXb9s", {
quality: 'highestaudio',
    highWaterMark: 1 << 25
          }));
          s.on("error", (err) => {
          msg.quote("Esta estação está indisponível no momento.")
        
          connection.play("./Radio.mp3");
          })
          s.on("start", () => {
          msg.quote("Tocando estação: Radio 90's Mix!")
          });
        });
      } else if(args[0] === "6") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          let rock = connection.play(ytdl("https://youtu.be/nwYAt3-IPHY", {
quality: 'highestaudio',
    highWaterMark: 1 << 25
          }));
          rock.on("error", (err) => {
          msg.quote("Esta estação está indisponível no momento.")
        
          connection.play("./Radio.mp3");
          })
          rock.on("start", () => {
          msg.quote("Tocando estação: Rock Radio!");
          });
        });
      } else if(args[0] === "7") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          let indie = connection.play(ytdl('https://youtu.be/0if2q-jdn1U', {
quality: 'highestaudio',
    highWaterMark: 1 << 25
          }));
          indie.on("error", (err) => {
          msg.quote("Esta estação está indisponível no momento.")
        
          connection.play("./Radio.mp3");
          })
          indie.on("start", () => {
          msg.quote("Tocando estação: Indie pop")
          });
        });
      } else if(args[0] === "8") {
        msg.reply("⚠️ • Aviso\nEsta estação tem palavrões pesados, deseja continuar?").then(mesg => {
          mesg.react("✔️");
          mesg.react("❌");
let no = mesg.createReactionCollector((r,u)=>r.emoji.name==="❌"&&u.id === msg.author.id, {max: 1}).on("collect", () => {
  mesg.delete()
  voice.leave();
});
          let collector = mesg.createReactionCollector((r,u) => r.emoji.name==="✔️"&&u.id === msg.author.id, {max: 1}).on("collect", () => {
          msg.delete();
voice.join().then(connection => {
  connection.voice.setSelfDeaf(true);
          let funk = connection.play(ytdl('https://youtu.be/BV97z3jiaoE', {
quality: 'highestaudio',
    highWaterMark: 1 << 25
          }));
          funk.on("error", (err) => {
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("./Radio.mp3");
          })
          funk.on("start", () => {
          msg.reply("Tocando estação: Funk Rádio (pt-br)")
          });
        });
          });
        });
      } else {
    voice.join().then(connection => {
      const play = () => {
      let radio = connection.play("./Radio.mp3");
      radio.setVolume(1.5);
      radio.on("finish", play);
      };
      play();
   
    connection.voice.setSelfDeaf(true);
    });
    let station = "1 - Lo-fi\n2 - The Good Life Radio\n3 - NCS\n4 - FailRadio (pt-br)\n5 - Radio 90's Mix\n6 - Rock Rádio\n7 - Indie pop\n8 - Funk Rádio (pt-br)";
    msg.reply("Hmmm, parece que você não colocou qual estação quer, tente ai!\nuse f!radio (número da estação)\nEstações:\n " + station);
    }
  } else
  if(["ajuda", "help"].includes(command)) {
    msg.quote(`Olá ${message.author}, sou FailRadio, um simples bot de música para Discord.\nComandos:\nf!radio (Numero da estação)\nf!leave\nf!status\nf!support <pergunta/reporte>\nf!join\n\n<> - String\n() - Número`);
  }else
  if(command === "status") {
    let now = bot.now;
    let previous = bot.previous;
    msg.quote(new Discord.MessageEmbed()
    .setTitle("📉 • Bot Status")
    .setColor(0x0)
    .addField("📆 • Agora", now)
    .addField("👈 • Anteriormente",previous))
    
  }else
  if(command === "suporte" || command === "support"){
    if(args.slice(0)) {
    let channel = msg.channel,
    guild = msg.guild,
    user = msg.author;
    client.channels.cache.get("804707015426441226").send("Pergunta nova\n" + args.slice(0).join(' ')+ `\nUsuário ${user.tag} (${user.id})\nCanal #${channel.name} (${channel.id})\nGuild ::${guild.name} (${guild.id})`);
    msg.quote("Enviado para suporte!")
  } else return message.quote("Você não colocou sua pergunta");
  }else
  if(command === "supportsend") {
    if(msg.author.id === "407859300527243275") {
    const embed = new Discord.MessageEmbed()
    .setTitle("🤷‍♂️ • Resposta")
    .setDescription(args.slice(2).join(' '))
    .setFooter(`Enviado por ${message.author.tag} (${message.author.id})`)
    .setColor("RED");
    client.channels.cache.get(args[0]).send(`<@${args[1]}>`, embed);
    }
  } else
  if(command === "stations") {
    if(msg.author.id === "407859300527243275") {
      
      db.set("radio", args[0]);
    }
  } else
  if(command === "dm") {
    let user = client.users.cache.get(args[0])
    if(!user) return msg.reply("Usuário não encontrado.");
    user.send(args.slice(1).join(" "));
  } else
  if(command === "record") {
    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel || voiceChannel.type !== 'voice')
        return msg.reply('O canal nao existe.')

    console.log(`Sliding into ${voiceChannel.name} ...`);
    voiceChannel.join()
        .then(conn => {

            const dispatcher = conn.play("");
            dispatcher.on('finish', () => { console.log(`Joined ${voiceChannel.name}!\n\nREADY TO RECORD\n`); });

            const receiver = conn.receiver;
            conn.on('speaking', (user, speaking) => {
                if (speaking) {
                                          //require('./merge.js')
                    console.log(`${user.username} started speaking`);
                    const audioStream = receiver.createStream(user, { mode: 'mp3' });
                    audioStream.pipe(createNewChunk());
                    
                    audioStream.on('end', () => { console.log(`${user.username} stopped speaking`);
                    
                    setTimeout(() => {conn.play(`./recordings/user.pcm`)},1000);
                    });
                }
            });
        })
        .catch(err => { throw err; });
  } else
  if(command === "join") {
    let voice = message.member.voice.channel;
    voice.join();
  } else
  if(command === "leave") {
    let voice = msg.member.voice.channel;
    voice.leave();
  } else
  if(command === "guildadd") {
    client.emit("guildCreate",msg.guild)
  } else if(!command) {
    message.quote("Comando inexistente, use f!help para ver meus comandos.")
  }
  if(command) {
    client.channels.cache.get("808284868769087520").send(`
    ${msg.author.tag} (\`${msg.author.id}\`) 
    \n${msg.content}`)
  }
    /*message.reply("Comando não existe.");
    message.channel.send("Use f!support para contatar com criador, ou procure pela @lightconnectt no Twitter e contate com criador.");*/
    if(command === "eval") {
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
});
client.on("messageUpdate", (n, msg) => client.emit("message", msg))
client.login(process.env.token);