import dotenv from "dotenv";
dotenv.config();

function dotEnv(data: any) {
  return process.env[data] || null;
}

export default { dotEnv };
