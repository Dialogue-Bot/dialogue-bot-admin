import { LOCALE_KEY } from "@/constants";
import { LocaleService } from "@/i18n/ctx";
import { ConversationService } from "@/services/conversation.service";
import { catchAsync } from "@/utils/catch-async";
import { StatusCodes } from "http-status-codes";
import Container from "typedi";

export class ConversationController {
    public conversationService = Container.get(ConversationService);
    public localeService = Container.get<LocaleService>(LOCALE_KEY);

    public handleIncomingMessage = catchAsync(async (req, res) => {
        res.status(StatusCodes.OK).end();
        return await this.conversationService.handleIncomingMessage(req);
    });

}