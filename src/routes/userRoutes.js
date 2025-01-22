import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";
import { checkRole } from "../middlewares/checkRole";

const router = new Router();

router.get("/me", loginRequired, userController.show);
router.get("/", loginRequired, checkRole([1, 3]), userController.index);
router.post("/", userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

export default router;
