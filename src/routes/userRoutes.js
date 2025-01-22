import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";
import { checkRole } from "../middlewares/checkRole";

const router = new Router();

router.get("/", loginRequired, checkRole([2, 3]), userController.index);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.put("/:id?", userController.update);
router.delete("/:id?", userController.delete);

export default router;
