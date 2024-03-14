import { LOCALE_KEY } from "@/constants"
import { LocaleService } from "@/i18n/ctx"
import { RequestWithUser } from "@/interfaces/auth.interface"
import { IntentService } from "@/services/intent.service"
import { catchAsync } from "@/utils/catch-async"
import { StatusCodes } from "http-status-codes"
import Container from "typedi"

export class IntentController {
    public intentService = Container.get(IntentService)
    public localeService = Container.get<LocaleService>(LOCALE_KEY)

    public createIntent = catchAsync(async (req: RequestWithUser, res) => {
        req.body.userId = req.user?.id
        const data = await this.intentService.create(req.body)
        res.status(StatusCodes.OK).json({
            message: this.localeService.i18n().INTENT.CREATE_SUCCESS(),
            data,
        })
    })
}