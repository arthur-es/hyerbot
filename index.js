const { create, decryptMedia } = require("@open-wa/wa-automate");

async function start(client) {
  client.onMessage(async (msg) => {
    if (
      msg.body === "🤖" ||
      msg.body === "Oi" ||
      msg.body === "oi" ||
      msg.body === "Olá" ||
      msg.body === "ola"
    ) {
      console.log(`Oi recebido de ${msg.from}`);
      const { formattedName } = await client.getContact(msg.from);

      client.sendText(
        msg.from,
        `Olá, ${formattedName} 👋\n🗣 Siga meu criador no Instagram para receber atualizações: https://www.instagram.com/hyerdev\n\n🤖 Aqui alguns dos meus comandos:\n\nCriadores de figurinha:\n\n1. *!sticker*\nPara transformar uma imagem em figurinha basta envia-la com a legenda !sticker\n\n2. *!stickergif* _LINK DO GIPHY_\nPara transformar um gif em figurinha animada basta enviar #stickergif + link do gif no Giphy(https://giphy.com)\nExemplo: !stickergif https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif\n\nRepara que no final do link tem o *.gif*, pra pegar o link dessa forma, clica lá no site em GIF link.\n\n\nPara ajudar a manter o bot online doe!\nEnvie *#doar* para saber mais como nos ajudar.\n\nObrigado ✨`
      );
    } else if (msg.body.startsWith("!stickergif ")) {
      let url = msg.body.split(" ")[1];
      console.log(url);
      await client.sendGiphyAsSticker(msg.from, url);
      await client.sendFile(
        msg.from,
        "https://media1.vocaroo.com/mp3/1o8izKNm8qyx"
      );
    } else if (msg.body === "#doe" || msg.body === "#doar") {
      client.sendText(
        msg.from,
        `Qualquer valor é bem-vindo!\n\nDoações via PicPay:\npicpay.me/arthurlop.es`
      );
      await client.sendGiphyAsSticker(
        msg.from,
        "https://media.giphy.com/media/rrsEJXL7Ut8AM00zcB/giphy.gif"
      );
    } else if (msg.body === "!sticker" || msg.body === "!Sticker") {
      if (quotedMsg && quotedMsg.type == "image") {
        const mediaData = await decryptMedia(quotedMsg);
        const imageBase64 = `data:${msg.mimetype};base64,${mediaData.toString(
          "base64"
        )}`;
        await client.sendImageAsSticker(msg.from, imageBase64);
        await client.sendFile(
          msg.from,
          "https://media1.vocaroo.com/mp3/1o8izKNm8qyx"
        );
        client.sendText(
          msg.from,
          "*Dica:* segue no instagram para caso eu mude de número: @hyerbot\n\nhttps://www.instagram.com/hyerbot"
        );
      }
    } else if (msg.mimetype) {
      if (
        msg.caption === "#sticker" ||
        (msg.caption === "#Sticker" && msg.type === "image")
      ) {
        const mediaData = await decryptMedia(msg);
        3;

        const imageBase64 = `data:${msg.mimetype};base64,${mediaData.toString(
          "base64"
        )}`;
        await client.sendImageAsSticker(msg.from, imageBase64);
      }

      if (
        msg.caption === "!sticker" ||
        (msg.caption === "!Sticker" && msg.type === "image")
      ) {
        const mediaData = await decryptMedia(msg);
        3;

        const imageBase64 = `data:${msg.mimetype};base64,${mediaData.toString(
          "base64"
        )}`;
        await client.sendImageAsSticker(msg.from, imageBase64);
        await client.sendFile(
          msg.from,
          "https://media1.vocaroo.com/mp3/1o8izKNm8qyx"
        );
        client.sendText(
          msg.from,
          "*Dica:* segue no instagram para caso eu mude de número: @hyerbot\n\nhttps://www.instagram.com/hyerbot"
        );
      }
    }
  });
}

create().then((client) => start(client));