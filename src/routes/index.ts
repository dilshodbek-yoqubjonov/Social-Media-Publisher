import Router from "express";
import processRequest from "../modules/controller";

const router = Router();

router.post("/send-post", processRequest);

export default router;
