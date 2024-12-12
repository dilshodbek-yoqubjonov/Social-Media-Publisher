import axios from "axios";
import env from "../../utils/dotenv";

const BOT_TOKEN = env.dotEnv("BOT_TOKEN");
const CHANNEL_CHAT_USERNAME = env.dotEnv("CHANNEL_CHAT_USERNAME");

export const sendToTelegram = async function (
  title: string,
  description: string,
  photos: any
) {
  // create sample mediaGroup
  const mediaGroup = photos.map((photoUrl: string, index: number) => ({
    type: "photo",
    media: photoUrl,
    ...(index === 0 && {
      // send caption only for 0 index image or the description does not appear in the post
      caption: `<b>${title}</b> \n\n<i>${description}</i>`,
      parse_mode: "HTML",
    }),
  }));

  // send multiple media to Telegram
  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
    chat_id: CHANNEL_CHAT_USERNAME,
    media: mediaGroup,
  });
};
