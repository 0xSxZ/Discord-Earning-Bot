exports.run = async (client, message, args, ecoClient, EmbedBuilder, pe, ErrorEmbed, Adsdb, referrals, IsJoineddb, db, randomInteger, RandomFloat, RandomString) => {
    
    var request = require('request');
   
    const PasteeAPI = require("pastee-api") 
    let Pastee = new PasteeAPI(pe.PASTEEE_API_KEY);


    var url = `${pe.API_URL}createCode?password=${pe.ADMINPASSWORD}&id=${message.author.id}`
    var link;
    if(pe.USE_API == true){

        request(url, function (error, response, body) {
        
            var endpoint = pe.API_URL + "redeem?code=" + body + "&id=" + message.author.id + "&messageauthor=" + message.author.id
    
            Pastee.paste({
                "contents": endpoint,
                "name": "Code",
                "expire": 100
            }).then(res => {
    
                if (randomInteger(1, 5) == 3) {
                    link = linkvertise(res["link"], pe.YOUR_LINKVERTISE_ID)
                } else {
                    request(pe.SUPPLIERS[Math.floor(Math.random() * pe.SUPPLIERS.length)] + res["link"], function (error, response, body) {
                        if (body.includes("URL is invalid.") || body.includes("error")) {
                            return message.reply({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: "The api is not configurated" })] });
                        } else {
                            link = JSON.parse(body)["shortenedUrl"]
                        }
                    });
                }
    
                message.reply("[+] The link has been sent to your DM's")
                return message.author.send("[+] Follow this link to get your reward : " + link)
    
            }).catch(err => { });
        });
    }else{
        Pastee.paste({
            "contents": `+claim ${RandomString(20)}`,
            "name": "Code",
            "expire": 100
        }).then(res => {

            if (randomInteger(1, 4) == 3) {
                link = linkvertise(res["link"], pe.YOUR_LINKVERTISE_ID)
            } else {
                request(pe.SUPPLIERS[Math.floor(Math.random() * pe.SUPPLIERS.length)] + res["link"], function (error, response, body) {
                    if (body.includes("URL is invalid.") || body.includes("error")) {
                        return message.reply({ embeds: [ErrorEmbed.addFields({ name: "An error occured", value: "The api is not configurated" })] });
                    } else {
                        link = JSON.parse(body)["shortenedUrl"]
                    }
                });
            }

            message.reply("[+] The link has been sent to your DM's")
            return message.author.send("[+] Follow this link to get your reward : " + link)

        }).catch(err => { });
    }
}


exports.name = "earn";