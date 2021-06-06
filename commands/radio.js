const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
var ytpl = require('ytpl');
const db = require('quick.db');
const superagent = require('superagent');
module.exports = {
    name: "radio",
    aliases: [
      "rádio", 
      "rd"
    ],
    execute(client, msg, args) {
        if(!msg.guild.me.hasPermission("CONNECT")) return msg.reply("Hmmm, não consigo entrar no canal...\nCaso for um engano, contate com criador usando f!support.");
    if(!msg.guild.me.hasPermission("SPEAK")) return msg.reply("Hmmm, não consigo reproduzir o som no canal...\nCaso for um engano, contate com criador usando f!support.");
    let voice = msg.member.voice.channel;
    if(!voice) return msg.reply("Não te encontrei em nenhum canal de voz.\nCaso for um engano, contate com criador usando f!support.");
    if(voice.userLimit) {
    if(voice.members.size-1> voice.userLimit) return msg.reply("Eu acho que o canal em que você está conectado, nesse momento está cheio.\nCaso for um engano, contate com criador usando f!support");
    }
    console.log(voice.members)
    voice.members.forEach(member => {
      if(client.user.id === member.user.id) return;
      /*
      if(member.user.bot) {
        setTimeout(() => {
        msg.reply("Parece que já tem algum bot tocando música.\nCaso for um engano, contate com criador usando f!support.");
        voice.leave();
        },2000);
      }*/
    });
    //voice.setSelfDeaf(true);
    if(args[0] === "1") {
      voice.join().then(connection => {
        connection.voice.setSelfDeaf(true);
        let lofi = connection.play(ytdl("https://youtu.be/5qap5aO4i9A", {
quality: 'highestaudio',
    highWaterMark: 1 << 25
        }));
        lofi.on("error", (err) => {
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Leave.mp3");
        })
        lofi.on("start", () => {
        msg.reply("Tocando estação: Lo-Fi!");
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
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Leave.mp3");
        });
        tglr.on("start", () => {
        msg.reply("Tocando estação: TGLR!");
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
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Leave.mp3");
        });
        ncs.on("start", () => {
        msg.reply("Tocando estação: NCS!");
        });
      });
    } else if(args[0] === "4") {
      voice.join().then(connection => {
        connection.voice.setSelfDeaf(true);
 let dispatcher = connection.play(ytpl("https://youtu.be/1tG0hDLX7sI"));
 dispatcher.on("error", (err) => {
   console.error(err)
   message.reply("Esta estação está indisponível no momento.")
   connection.play("../Leave.mp3")
 });
 dispatcher.on("finish", play);
msg.reply("Tocando estação: Relaxing Radio");
      });
      } else if(args[0] === "5") {
        
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          let s = connection.play(ytdl("https://youtu.be/CyPqFllXb9s", {
quality: 'highestaudio',
    highWaterMark: 1 << 25
          }));
          s.on("error", (err) => {
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Leave.mp3");
          })
          s.on("start", () => {
          msg.reply("Tocando estação: Radio 90's Mix!")
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
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Leave.mp3");
          })
          rock.on("start", () => {
          msg.reply("Tocando estação: Rock Radio!");
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
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Leave.mp3");
          })
          indie.on("start", () => {
          msg.reply("Tocando estação: Indie pop")
          });
        });
      } else if(args[0] === "ee") {
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
        
          connection.play("../Join.mp3");
          })
          funk.on("start", () => {
          msg.reply("Tocando estação: Funk Rádio (pt-br)")
          });
        });
          });
        });
      } else if(args[0] === "8") {
        voice.join().then(connection => { 
        connection.voice.setSelfDeaf(true);
        let jovem = connection.play(ytdl("https://youtu.be/gnyW6uaUgk4", {
         quality: 'highestaudio',
         highWaterMark: 1 << 25
        }));
         connection.setVolume(1.5)
         jovem.on("error", (err) => {
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Radio.mp3");
          })
          jovem.on("start", () => {
          msg.reply("Tocando estação: Hits Radio")
          });
         
        });
      } else if(args[0] === "9") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          const broadcast = client.voice.createBroadcast();
const stream = "https://19293.live.streamtheworld.com:443/JP_SP_FM_SC"

          let jovem = connection.play(stream);
          //connection.play(broadcast);
          jovem.on("error", (err) => {
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Radio.mp3");
          })
          jovem.on("start", () => {
          msg.reply("Tocando estação: Jovem Pan")
          });
        });
      } else if(args[0] === "10") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          const broadcast = client.voice.createBroadcast();
          const stream = "https://18733.live.streamtheworld.com/MIXFM_SAOPAULO.mp3";
          let mix = connection.play(stream);
         //connection.play(broadcast)
         
         mix.on("error", (err) => {
           msg.reply("Esta estação está indisponível no momento.");
      
         });
         mix.on("start", () => {
           msg.reply("Tocando estação: Mix FM");
         })
        });
      } else if(args[0] === "11") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          const broadcast = client.voice.createBroadcast();
const stream = "https://18123.live.streamtheworld.com:443/JP_SP_AM_SC"

          let jovem = connection.play(stream);
          //connection.play(broadcast);
          jovem.on("error", (err) => {
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Radio.mp3");
          })
          jovem.on("start", () => {
          msg.reply("Tocando estação: Jovem Pan News")
          });
        });
      } else if(args[0] === "12") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          const broadcast = client.voice.createBroadcast();
const stream = "https://live-tennisradio.sharp-stream.com/tennisradio.mp3"

          let tennis = connection.play(stream);
          //connection.play(broadcast);
          tennis.on("error", (err) => {
          msg.reply("Esta estação está indisponível no momento.")
        
          connection.play("../Radio.mp3");
          })
          tennis.on("start", () => {
          msg.reply("Tocando estação: Tennis Radio (United Kingdom)")
          });
        });
      } else if(args[0] === "13") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          const broadcast = client.voice.createBroadcast();
          const stream = "http://freeus1.listen2myradio.com:5395/stream";
          let fr = connection.play(stream);
         //connection.play(broadcast)
         
         fr.on("error", (err) => {
           msg.reply("Esta estação está indisponível no momento.");
      
         });
         fr.on("start", () => {
           msg.reply("Tocando estação: FailRadio");
         })
        });
      } else if(args[0] === "14") {
        voice.join().then(connection => {
          connection.voice.setSelfDeaf(true);
          const broadcast = client.voice.createBroadcast();
          const stream = "http://stream.zeno.fm/ra7zxa1duv8uv";
          let bounce = connection.play(stream);
         //connection.play(broadcast)
         
         bounce.on("error", (err) => {
           msg.reply("Esta estação está indisponível no momento.");
      
         });
         bounce.on("start", () => {
           msg.reply("Tocando estação: Bounce FM (GTA: SA)");
         })
        });
      }
     else {
    voice.join().then(connection => {
    //onst play = () => {
     /* let radio = connection.play("../Join.mp3");
      radio.setVolume(1.5);
      radio.on("finish", play);
      };*/
     // play();
   
    connection.voice.setSelfDeaf(true);
    });
    let station = "Radios\n1 - Lo-fi\n2 - The Good Life Radio\n3 - NCS\n4 - Relaxing Radio\n5 - Radio 90's Mix\n6 - Rock Rádio\n7 - Indie pop\n8 - Hits Radio \n> Brazilians Radio\n9 - Jovem Pan São Paulo (Brasil)\n10 - Mix FM São Paulo (Brasil)\n11 - Jovem Pan News São Paulo (Brasil)\n> Esports\n12 - Tennis Radio (United Kingdom)\n> FailStation\n13 - FailRadio\n14 - Bounce FM (GTA: SA inspiration)";
    msg.reply("Hmmm, parece que você não colocou qual estação quer, tente ai!\nuse f!radio (número da estação)\nEstações:\n " + station);
    }
  }
    }