// Module Imports and instances
const Discord = require("discord.js");
const tool = require('./tool.js');
const client = new Discord.Client();
const fs = require("fs");
const snekfetch = require("snekfetch");
const jimp = require("jimp");
const sql = require("sqlite");
sql.open("./src/db.sqlite");

class Captcha {
    /**
     * @param {string} captcha - The captcha (pass null and call generate method if it shall be random)
     * @param {object} author - The author object (Has to has an id property and should look like <@123456789>)
     * @param {buffer} image buffer - Initialize object with an already existing image buffer
     */
    constructor(captcha, author, buff) {
        this._captcha = captcha;
    }

    /**
     * @returns {string} Captcha value of class
     */
    generate() {
        let rand = Math.random().toString(36).substr(2, 6);
        this.captcha = rand;
        return this.captcha;
    }

    get captcha() {
        return this._captcha;
    }

    set captcha(value) {
        this._captcha = value;
    }
}

// Command Imports
const config = require("./src/config.json");
const callback_ = err => {
    if (err) console.log(err);
};


let queue = [],
    latestVersion;
snekfetch.get("https://raw.githubusercontent.com/y21/discordcaptcha/master/src/config.json")
    .then(r => {
        if (JSON.parse(r.body).version != config.version) {
            console.log("### A new version of discordcaptcha is available!  (Latest: " + JSON.parse(r.body).version + ")\n\n");
        }
        latestVersion = JSON.parse(r.body).version;
    }).catch(console.log);

client.on("ready", () => {
    try {
        console.log("Logged in!");
        client.user.setActivity(config.streamingGame, {
            url: config.streamingLink,
            type: "STREAMING"
        });
        if (client.guilds.size > 1) {
            console.log("On dirait que ce bot est sur plus d'une guilde. Il est recommandé de ne pas avoir ce bot sur plus d'un, car il pourrait faire des choses aléatoires.")
        }
        client.guilds.forEach(guild => {
            if (!guild.roles.get(config.userrole)) console.log(`${guild.name} n'a aucun User-Role ou SnowFlake qui a été donné dans le fichier de configuration est invalide.`);
        });
    } catch (e) {
        console.log("[DISCORDCAPTCHA-readyEvent] >> " + e);
    }
});


client.on("guildMemberUpdate", async (oldUser, newUser) => {
	const entry = await oldUser.guild.fetchAuditLogs({type: 'MANAGE_ROLES'}).then(audit => audit.entries.first())
	
    //try {
		
 /*   
	
	const addedRole = newUser.roles.find(r => !oldUser.roles.has(r.id));
	const addedRole2 = oldUser.roles.find(r => !newUser.roles.has(r.id));
	//const guild3 = newUser.guild.id;
    //const role3 = oldUser.guild.roles.find(role => role.name === "▷ X-MEMBRES");
	let role3 = oldUser.roles.find(r => r.name === "▷ X-MEMBRES");
	const user = oldUser.author;
	
	let status = '';
    if (addedRole) {
      status = `${oldUser} **Le rôle** __**▷ X-MEMBRES**__ **vous a était retiré !!**`;
    }
    else {
      status = '**Vous pouvez désormait choisir votre zone de developpement.**';	  
    }
	
	//member.addRole(config.userrole).catch(console.log);
	console.log(`${oldUser} :: ${entry.executor} vous a ${status} le rôle ${addedRole ? addedRole.name : addedRole2}`);

	oldUser.removeRole(role3).catch(console.error);
	client.channels.get('561617308842328065').send(`${status}`).then(oldUser => {
    oldUser.delete(20000).catch(() => {});
    });
/*	
	if(addedRole2.name == role3) {

		oldUser.member.removeRole(role3).catch(console.log);
	}
*/	//console.log(`${entry.executor} vous a ${status} le rôle ${addedRole ? addedRole.name : addedRole2.name} sur : ${oldUser.guild.name}`);
/*	
    } catch (e) {
        console.log(`ERROR !!`);
    }
*/	


});

client.on("warn", console.warn);
client.on("error", console.error);
client.on("disconnect", () => console.log("Bot disconnected from WebSocket!"));
client.on("reconnect", () => console.log("Reconnecting to WebSocket ..."));

client.on("message", (message) => {
	
	if (message.content.startsWith('<' + 'on')) {	
  //if(message.author.id !== "371286485602795520" ) return;
  
  const enligne = client.emojis.find(emoji => emoji.name === "enligne");

	message.channel.startTyping();
    message.channel.stopTyping();
	
setTimeout(() => {

    message.channel.send({embed: {
    color: 3553599,
    description: `${enligne} 9. **X-CAPTCHA**`

   }
  });

}, 9000);
  
 }
 
 
 if (!message.content.startsWith(config.prefix))
      return; 
	
	if(message.content.startsWith(`${config.prefix}restart`)){
	message.delete().catch(O_o=>{}); 
    message.channel.startTyping();
    message.channel.stopTyping();
    if(message.author.id !== '371286485602795520' ) return;
       message.delete().then(() => process.exit(1))
}




});

client.on("message", async (message) => {
    try {
        let blocked = await sql.get('select * from blocked where id="' + message.author.id + '"');
        if (blocked) message.member.kick();
        if (message.channel.name === "┼-►✦-𝐂𝐀𝐏𝐓𝐂𝐇𝐀-✦◄-┼") {
            if (message.author.id != client.user.id) message.delete();
            else setTimeout(() => message.delete(), 60000);
            if (message.content === `${config.prefix}verif`) {
				let captchaInstance = new Captcha(null, message.author);
                let captcha = captchaInstance.generate();
                if (await sql.get('select * from queries where id="' + message.channel.id + '"') || message.member.roles.has(config.userrole)) return  message.author.send(new Discord.RichEmbed()
                        .setDescription("Envoyez le code ci-dessous pour être vérifié.\n\n"+`\`\`\`fix\n${config.prefix}verif ${captchaInstance.captcha}\`\`\``)).catch(e => {
      if (e.code === 50007) {

        message.channel.send(new Discord.RichEmbed()
        .setDescription("Envoyez le code ci-dessous pour être vérifié.\n\n"+`\`\`\`fix\n${config.prefix}verif ${captchaInstance.captcha}\`\`\``));
      }

    });

                if (config.captchaType == "image") {
                    let _image = await jimp.read("https://i.imgur.com/mkoc2Fh.png");
                    let _font = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
                    let _coordinates = [Math.random() * 400, Math.random() * 400]; // x & y coordinates for text on image
                    _image.resize(750, 750); // make bigger
                    _image.print(_font, _coordinates[0], _coordinates[1], captcha); // print captcha on image
                    message.author.send(new Discord.RichEmbed()
                        .setTitle("Verification")
                        .setDescription("Cette guilde est protégée par Discord-X-Captcha.")
                        .addField("Instructions", `Dans quelques secondes, un code vous sera envoyée. Envoyez s'il vous plaît ${config.prefix}verif <captcha> dans le salon ${message.channel.name} (${message.channel})`)
                        .setColor("RANDOM")
                        .setTimestamp()
                    ).catch(e => e.toString().includes("Cannot send messages to this user") ? message.reply("s'il vous plaît allumer vos MP") : null);
                    _image.getBuffer(jimp.MIME_PNG, (err, buff) => {
                        message.author.send(new Discord.Attachment(buff, "captcha.png"));
                    });
                } else if (config.captchaType == "text") {
                    message.channel.send(new Discord.RichEmbed()
                        .setDescription("Envoyez le code ci-dessous pour être vérifié.\n\n"+`\`\`\`fix\n${config.prefix}verif ${captchaInstance.captcha}\`\`\``)
                    );
                    //message.channel.send(`\`\`\`fix\n${config.prefix}verif ${captchaInstance.captcha}\`\`\``).catch(e => e.toString().includes("Cannot send messages to this user") ? message.reply("s'il vous plaît allumer vos MP") : null);

                }
                sql.run('insert into queries values ("' + message.author.id + '")');
                message.channel.awaitMessages(msg => msg.content === config.prefix + "verif " + captchaInstance.captcha && msg.author === message.author, {
                        max: 1,
                        errors: ["time"]
                    })
                    .then(() => {
                        message.author.send({
                            embed: {
                                color: 0x00ff00,
                                description: "Vérifié avec succès sur `" + message.guild.name + "`"
                            }
                        });
                        let logChannel = client.channels.get(config.chat) || client.channels.find("name", config.chat);
                        if (logChannel && logChannel.type === "text") logChannel.send(`${message.author.toString()} **Valider avec succés !!**`).then(msg => {
                        msg.delete(20000).catch(() => {});
                        });
                        if (config.logging) sql.run('insert into logs values ("' + message.author.id + '", "' + Date.now() + '")');
                        sql.run('delete from queries where id="' + message.author.id + '"');
                        queue.pop();
                        message.member.addRole(config.userrole).catch(console.log);
                        delete captchaInstance;
                    }).catch(console.log);
            }
        }
        require("./src/Commands.js")(message, config, Discord, fs, latestVersion); // Command Handler
    } catch (e) {
        console.log(e);
    }
});

client.on('guildMemberAdd', message => {

	
	const embed = new Discord.RichEmbed()
	  .setColor('#31a43d')
      .addField(`Bienvenue à vous ${message.user.username}`, `**Veuillez effectuer la commande** ${tool.wrap(`${config.prefix}verif`)} **afin de recevoir votre code** __**CAPTCHA**__ puis envoyez le ici afin **d'être validé.**`)
      
	client.channels.get('565154559505465345').send({embed});

           
});



					  
					  
process.on("unhandledRejection", console.log);

client.login(config.token);
