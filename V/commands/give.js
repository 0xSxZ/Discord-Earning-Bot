exports.run = async(client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {

    // Checking if the syntax is correct
    if(args.length < 2){
        return message.reply("[+] Command syntax :\n\n+give <amount> <user_id>");
    }
    
    //Adding money to the user entered
    ecoClient = new eco.guildUser(args[1], pe.SERVER_ID);
    ecoClient.add(parseInt(args[2]), "wallet")
    
    // Returuning the message
    return message.reply("[+] Gived : " + args[2] + " to " + args[1])
}

exports.name = "give";