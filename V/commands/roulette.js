async function roulette(client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) {

    var bet = args[1]
    var multiplier = 0;

    //Probabilities (L = lost, W = win)
    const prob = ["l", "l", "w"];
    const gprob = ["l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "w"];

    // Getting a random number between the Probabilities
    var resultprob = prob[Math.floor(Math.random() * prob.length)] // If the PROB variable returns "W", you won x2
    var gresult = gprob[Math.floor(Math.random() * gprob.length)]  // If the G(reen)PROB variable returns "W", you won x10




    var ResultEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Roulette')
        .setDescription('The GIF is the result :eyes:')
        .addFields({ name: "100% Random", value: "Our software generate a 100% random number." })
        .setThumbnail('https://thumbs.gfycat.com/EnchantedIdolizedJunebug-size_restricted.gif');




    // Checking if the user entered red/black/green, if the bet is lower than the balance & if the bet is a number
    if (["red", "black", "green"].includes(args[2].toLowerCase())) {
        return message.reply({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: "You need to choose a color\n\n+roulette <bet> <red/black/green>" })] });
    }
    if (parseInt(bet) > await ecoClient.get("wallet")) {
        return message.reply({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: "You don't have enough money." })] });
    }
    if (!isInt(bet)) {
        return message.reply({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: "The 'bet' argument needs to be a number." })] });
    }



    //Checking if the user won
    if (gresult == "w") {
        multiplier = 10
    } else if (resultprob == "w") {
        multiplier = 2
    } else {
        multiplier = "negative"
    }

    // Adding the money
    if (multiplier != "negative") {
        await ecoClient.add(parseInt(bet) * multiplier, "wallet")
        return message.reply({ embeds: [ResultEmbed.setDescription(`[:white_check_mark:] **You won : ${parseInt(bet) * multiplier} :coin:'s**`)] })

    } else {
        await ecoClient.subtract(parseInt(bet), "wallet")
        return message.reply({ embeds: [ResultEmbed.setDescription(`[:x:] **You lost : ${parseInt(bet)} :coin:'s**`).addFields({ name: "Result", value: result })] })
    }
}

module.exports = { roulette }