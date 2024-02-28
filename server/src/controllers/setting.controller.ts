import { LOCALE_KEY } from "@/constants";
import { LocaleService } from "@/i18n/ctx";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { SettingService } from "@/services/setting.service";
import { catchAsync } from "@/utils/catch-async";
import { StatusCodes } from "http-status-codes";
import Container from "typedi";

export class SettingController {
    private settingService = Container.get(SettingService);
    private localeService: LocaleService = Container.get(LOCALE_KEY);

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
            message: this.localeService.i18n().SETTING.UPDATE_EMAIL_SUCCESS()
        });
    });
}