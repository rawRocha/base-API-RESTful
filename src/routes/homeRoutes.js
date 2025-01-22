import { Router } from "express";
import homeController from "../controllers/HomeController";

const router = new Router();

router.get("/", homeController.Index);

export default router;

/*
index - get
store - post
delete - delete
show - get mostra 1
update - put
*/
