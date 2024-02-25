import { ENDPOINTS } from "@/constants";
import { SettingController } from "@/controllers/setting.controller";
import { UpdateEmailSettingDto } from "@/dtos/setting.dto";
import { Routes } from "@/interfaces/routes.interface";
import { auth } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import { Router } from "express";

export class SettingRoute implements Routes {

    router = Router();
    controller = new SettingController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(ENDPOINTS.SETTING.INDEX,
            auth, this.controller.getSetting);

        this.router.put(ENDPOINTS.SETTING.MAIL,
            validate(UpdateEmailSettingDto),
            auth,
            this.controller.updateEmailSetting);
    }

}