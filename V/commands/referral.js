
exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {

    // Checking if the syntax is correct
    if (args.length < 1) {
        return message.reply("[!] Command syntax : +referral <user_id>");
    }

    // Checking if the user already used the command
    if (await referrals.getData("/")[message.author.id.toString()] != undefined) {
        return message.reply({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: "You already used this command." })] })
    }

    // Checking if the user is less than 5 days old
    if (Date.now() - message.author.createdAt / 1000 / 60 / 60 / 24 < 5) {
        return message.channel.send({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: `Your account needs to be older than five days to use this command.\n\nAccount age : ${Date.now() - message.author.createdAt / 1000 / 60 / 60 / 24} days` })] })
    }



    referrals.push("/" + message.author.id, args[1]) // Prevent the user from re-using the command
    await ecoClient.add(pe.REF_REWARD, "balance") // Adding money to the referral

    var ecoClient = new eco.guildUser(args[1], pe.SERVER_ID); // Getting the referrer balance info
    await ecoClient.add(pe.REF_REWARD, "balance") // Adding money to the referrer

    return message.reply("[+] You & your referrer won " + pe.REF_REWARD + " :coin:'s")
}

exports.name = "referral";