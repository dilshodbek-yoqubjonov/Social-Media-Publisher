import express from "express";
import { sendToTelegram } from "./telegram";

const app = express();

const processRequest = async (req: any, res: any) => {
  const { title, description, photos } = req.body;

  // check existing data
  if (!photos || !title || !Array.isArray(photos)) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  // optional description
  const parsedDescription = description ? description : "";

  sendToTelegram(title, parsedDescription, photos)
    .then(() => console.log("Post send to Telegram successfully"))
    .catch((err) =>
      console.log("Error on sending post to Telegram: ", err.message)
    );

  res.status(200).json({ message: "Posts sent to social media successfully!" });
};

export default processRequest;
