exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {
    
    //Generating a random number
    var result = randomInteger(1, 3)

    // Checking if the syntax is correct, if the bet is a number & if the user has enough money
    if (args.length < 2 || parseInt(args[2]) > 3) {
        return message.reply({ embeds: [ErrorEmbed.addField("An error occured", "Command syntax : +random <bet> <1/2/3>")] });
    }
    if (!isInt(args[1])){
        return message.reply({ embeds: [ErrorEmbed.addField("An error occured", "The 'bet' argument needs to be a number.")] });
    }
    if (parseInt(args[1]) > await ecoClient.get("wallet")){
        return message.reply({ embeds: [ErrorEmbed.addField("An error occured", "You don't have enough money.")] });
    }


    var ResultEmbed2 = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Random Number')
        .setDescription('The GIF is the result :eyes:')
        .addField("100% Random", "Our software generate an 100% random number which makes him provably fair.")
        .setThumbnail('https://thumbs.gfycat.com/EnchantedIdolizedJunebug-size_restricted.gif');



    // Checking if the user won
    if (parseInt(args[2]) == result) {
        await ecoClient.add(parseInt(args[1]) * 2, "wallet")
        return message.reply({ embeds: [ResultEmbed2.setDescription(`[:white_check_mark:] **Correct ! You won : ${parseInt(args[1]) * 2} :coin:'s**`)] })
    } else {
        await ecoClient.subtract(parseInt(args[1]), "wallet")
        return message.reply({ embeds: [ResultEmbed2.setDescription(`[:x:] **You lost : ${parseInt(args[1])} :coin:'s**`)] })
    }
}


exports.name = "random";