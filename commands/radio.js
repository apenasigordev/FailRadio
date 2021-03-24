const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
module.exports = {
    name: "radio",
    aliases: [
      "rádio", 
      "rd"
    ],
    execute(client, msg, args) {
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
  }
    }
}