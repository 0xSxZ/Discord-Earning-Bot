process.on('uncaughtException', function (exception) { console.log("[+] Found error at : " + exception) }); // Skipping all errors



/*

    Imports

*/

require("./modules/utilities")
require('dotenv').config();
const pe = process.env


const express = require('express');
const app = express();
const { Discord, Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });
const linkvertise = require("linkvertise")
const { JsonDB, Config } = require('node-json-db');
const eco = require('discord-simple-economy');


const databaseLib = require("./modules/database")
const config = require("./config.json");






/*

    Configurating modules

*/

client.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${file}`);
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, command);
}







/*

    Important Variables

*/
var db = CreateDb("codes");
var Adsdb = CreateDb("ads");
var IsJoineddb = CreateDb("IsJoineddb");
var referrals = CreateDb("referrals");








/*

    Starting the API

*/



if(pe.USE_API == true){
    app.get('/createCode', async (req, res) => {
        if (req.query.password != pe.ADMINPASSWORD) return res.send("Password Invalid / Error ");

        res.send(await databaseLib.createCode(RandomString(35), db, req.query.id))
    })



    app.get('/redeem', async (req, res) => {
        var resut;

        databaseLib.checkCode(db, req.query.code, req.query.id).then(async function (result) { reslt = result });
        if (resut == true) {
            var value = RandomFloat(0.001, 0.007)

            var ecoClient = new eco.guildUser(req.query.messageauthor, pe.SERVER_ID);
            await ecoClient.add(value, "balance");

            res.send("The code is valid, your account will be credited.")

            console.log(`[+] Redeem : <@${req.query.messageauthor}> | **${value}** coins`)

            client.channels.cache.find(channel => channel.id === pe.ALERTS_CHANNEL).send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('Redeem')
                        .setDescription(`User : <@${req.query.messageauthor}> redeemed : **${value}** :coin:'s`)
                        .setFooter({
                            text: '1.00 :coin: = 1.00€'
                        })
                ]
            })


        } else {
            res.send("Invalid code")
        }

    })

    
    app.listen(80, () => {
        console.log('[+] Api listening')
    })
}




/*
        
    Starting the bot
        
*/

(async () => { await eco.selectDriver("sqlite"); })();


client.on(Events.MessageCreate, async (message) => {

    if (message.author.bot) return;
    if (message.content.indexOf("+") !== 0) return;

    ErrorEmbed.data.fields = [];

    const args = message.content.trim().split(/ +/g);
    var ecoClient = new eco.guildUser(message.author.id, pe.SERVER_ID);

    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);

    if (!cmd) return;

    cmd.run(
        client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, 
        Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString
    );

})



client.once(Events.ClientReady, c => {
    console.log(`Ready! ${c.user.tag}`);
});


client.login(pe.TOKEN);