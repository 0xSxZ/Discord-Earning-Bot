exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {
    return message.reply({
        embeds: [
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Balance')
                .addField('Your balance : ', `${await ecoClient.get("balance")} :coin:`)
                .setFooter({ text: '1.00 :coin: = 1.00€' })
        ]
    });
}

exports.name = "balance";