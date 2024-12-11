"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const BOT_TOKEN = "7742868139:AAHMbRNAEHcx3Kq18GNDFfFamzImwWMp9OU"; // Telegram bot tokeningizni kiriting
const CHANNEL_CHAT_ID = "@auto_post_telegram"; // Kanal username yoki ID
app.use(express_1.default.json());
// POST so'rov orqali rasmlar va tavsifni qabul qilish
app.post("/send-post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { description, photos } = req.body;
    console.log("Received description:", description);
    console.log("Received photos:", photos);
    if (!description || !photos || !Array.isArray(photos)) {
        return res.status(400).json({ error: "Invalid request data" });
    }
    try {
        const mediaGroup = photos.map((photoUrl) => ({
            type: "photo",
            media: photoUrl,
        }));
        const response = yield axios_1.default.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
            chat_id: CHANNEL_CHAT_ID,
            media: mediaGroup,
        });
        console.log("Response from Telegram:", response.data);
        yield axios_1.default.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHANNEL_CHAT_ID,
            text: description,
        });
        res.status(200).json({ message: "Post sent successfully!" });
    }
    catch (error) {
        console.error("Error sending post:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        res.status(500).json({ error: "Failed to send post" });
    }
}));
// Serverni ishga tushirish
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
