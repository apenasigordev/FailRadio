var imageAPI = require('google-maps-image-api-url');
var iss = require('iss');
module.exports = {
  name: "iss",
  aliases: [],
  execute(client,message,args) {

    if(args[0] === "video") {
      message.quote("Último vídeo tirado pela equipe", {files: [{attachment: client.db.fetch("video_iss")}]});
    } else if(args[0] === "imagem") {
      message.quote("Última foto tirada pela equipe", {files: [{attachment: client.db.fetch("imagem_iss")}]});
    } else if(args[0] === "map") {
      var stream = iss.locationStream(25544, 1);
 
stream.on('data', function (buffer) {
    var rawJson = buffer.toString('utf8'),
        data    = JSON.parse(rawJson);
let img = imageAPI( {

	type: 'staticmap',
	center: `${data.longitude},${data.latitude}`,
	size: '320x240',
	format: 'JPEG',
	key: process.env.api
});
message.quote(img); //{files:[{attachment: img}]});
});
    }
    else {
      message.quote(`Selecione:\nf!iss (video/imagem)\nA Terra não é plana :)`);
    }
  }
};