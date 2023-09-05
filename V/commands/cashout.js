exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {

    // Checking if the syntax is correct, if the user entered less than the min. cashout & if he has enough money
    if (args.length < 2){
        return message.reply("[+] Command syntax :\n\n+cashout <amount> <paypal-email>");
    }
    if (parseInt(args[1]) < pe.MIN_CASHOUT){
        return message.reply("[+] The minimum cashout is : " + pe.MIN_CASHOUT + " :coin:'s");
    }
    if (parseInt(args[1]) > await ecoClient.get("balance")){
        return message.reply("[+] You don't have enough money");
    }

    // Removing the amount entered
    ecoClient.subtract(parseInt(args[1]), "balance")

    // Sending a message to the owner
    client.users.fetch(pe.ADMIN_ID, false).then((user) => {
        user.send(`The user : **${message.author.id}** has redeemed : ${args[1]} :coin:'s**\nPayPal Email : ${args[2]}`);
    });


    return message.reply({
        embeds: [
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Cashout')
                .addField('You successfuly asked for a cashout !', `Amount : **${args[1]}**`)
                .setFooter({ text: '100 :coin: = 0.01€' })
        ]
    });

}


exports.name = "cashout";