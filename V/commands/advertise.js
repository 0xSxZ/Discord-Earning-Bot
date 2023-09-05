exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {
    const invest = args[1],
        invite = args[2],
        serverID = args[3],
        adId = RandomString(10);


    // Checking all the arguments
    if (args.length < 4) {
        return message.reply(`[+] Command syntax :\n\n+advertise <investement> <invite> <server_id>\n\nPrice per day : ${pe.AD_PRICE}`);
    }
    if (parseInt(invest) < pe.AD_MIN){
        return message.reply(`The minimum for an ad is : ${pe.AD_MIN} :coin:`);
    }
    if (parseInt(invest) > await ecoClient.get("balance")){
        return message.reply("You don't have enough balance.");
    } 

    // Removing the money & creating the ad
    ecoClient.subtract(parseInt(invest), "balance")
    await Adsdb.push(`/${serverID}`, invite + ";;;" + invest / pe.AD_PRICE);

    message.reply(`[+] Your ad ( ID : ${serverID} ) has been created.`)
    message.author.send("[!] Add the bot to the server : https://discord.com/oauth2/authorize?client_id=1094730986392137788&scope=bot&permissions=8")

    // Removing the ad in : 1 day * investement / Ad price per day
    setTimeout(async function () {  await Adsdb.delete(`/${adId}`); }, 86400000 * invest / pe.AD_PRICE, adId);
}

exports.name = "advertise";