import { RequestWithUser } from "@/interfaces/auth.interface";
import { SettingService } from "@/services/setting.service";
import { catchAsync } from "@/utils/catch-async";
import { StatusCodes } from "http-status-codes";
import Container from "typedi";

export class SettingController {
    private settingService = Container.get(SettingService);

    public getSetting = catchAsync(async (req: RequestWithUser, res) => {
        const setting = await this.settingService.findByUserId(req.user.id);

        res.status(StatusCodes.OK).json({
            data: setting,
        });
    });

    public updateEmailSetting = catchAsync(async (req: RequestWithUser, res) => {
        const setting = await this.settingService.updateEmailSetting(
            req.user.id,
            req.body
        );

        res.status(StatusCodes.OK).json({
            data: setting,

        });
    });
}