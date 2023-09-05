exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {

    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Help Menu')
        .addFields(
            {
                name: '+earn',
                value: "Returns an ad-link that remunerates you (Main way to earn)"
            },
            {
                name: '+join',
                value: "Join discord servers to earn"
            },
            {
                name: '+cashout <amount> <paypal email>',
                value: "asks for a cashout (only paypal)"
            },
            {
                name: '+balance',
                value: "Shows your balance"
            },
            {
                name: '+advertise <investement> <invite> <server id>',
                value: "Advertise your discord server (related to the +join command)"
            },
            {
                name: '+roulette <bet> <red/black/green>',
                value: "Bet on a random color (Green = x10, Red/Black = x2)"
            },
            {
                name: '+random <bet> <1/2/3>',
                value: "Choose a random number between 1 & 3, if your number is the same as the computer you win the double of your bet"
            },
            {
                name: '+referral <discord user id>',
                value: "Gives " + pe.REF_REWARD + " :coin:'s to you & your referrer (usable 1 time)"
            },
            {
                name: '+help',
                value: "Shows the help menu"
            }
        )
        .setFooter({ text: '1.00 :coin: = 1.00€' });

        
    return message.reply({
        embeds: [Embed]
    });
}

exports.name = "help";