import express from "express";
import env from "./utils/dotenv";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// Start the server
const PORT = env.dotEnv("PORT") || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
