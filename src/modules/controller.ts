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

  try {
    await sendToTelegram(title, parsedDescription, photos);
    console.log("Post send to Telegram successfully");
  } catch (err: any) {
    return res.status(err.status || 403).send({
      success: false,
      message: "ERROR in sending to Telegram: " + err.message,
    });
  }

  res.status(200).json({ message: "Posts sent to social media successfully!" });
};

export default processRequest;
