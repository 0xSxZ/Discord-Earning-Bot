exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {

    var ads = await Adsdb.getData("/")
    var adsMsg = "----------\n---ADS---\n----------\n"

    if (["", undefined, {}].includes(ads))  return message.reply("[+] No ads available");

    for (var key in ads) {
        adsMsg = `${adsMsg}\n${ads[key]}`.split(";;;")[0]
    }

    adsMsg = adsMsg + "\n\nOnce a server joined, type : +joined <server_id>"
    message.author.send(adsMsg)

    return message.reply("[+] I have sent you the links in dm's")
}

exports.name = "join";