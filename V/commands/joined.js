exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {
    var dta;

    if (args.length < 1) {
        return message.reply("[+] Command syntax : \n\n+joined <server_id>")
    }

    let guild = client.guilds.cache.get(args[1]),
        USER_ID = message.author.id;


    var isInDb = await Adsdb.getData(`/${args[1]}`)

    guild.members.fetch(USER_ID).then((data) => { dta = data;}); // If undefined, the user is not in the server
    if (!dta) return message.reply("[+] You didn't joined the server");

    var didJoined = await IsJoineddb.getData(`/${args[1]}:${message.author.id}`) // If undefined, the user didn't joined the server

    if (didJoined) {
        return message.reply({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: "You already joined this server" })] });
    }else {

        await IsJoineddb.push(`/${args[1]}:${message.author.id}`, "joined"); // Preventing user from rejoining

        ecoClient.add(parseInt(pe.JOIN_REWARD), "wallet") // Adding the referral bonus

        return message.reply(`[+] Success ! You won : ${pe.JOIN_REWARD} :coin:'s !`) 
    }
}

exports.name = "joined";