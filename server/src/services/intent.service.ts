import { LOCALE_KEY } from "@/constants";
import { db } from "@/database/db";
import { intents } from "@/database/schema";
import { TNewIntent } from "@/database/types";
import { HttpException } from "@/exceptions/http-exception";
import { LocaleService } from "@/i18n/ctx";
import { and, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Inject, Service } from "typedi";

@Service()
export class IntentService {
    constructor(
        @Inject(LOCALE_KEY) private readonly localeService: LocaleService
    ) {
    }

    public async saveTrain(fields: TNewIntent) {

        const existedName = await db.query.intents.findFirst({
            where: and(
                eq(intents.name, fields.name),
                eq(intents.deleted, false)
            )
        })

        if (existedName) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().INTENT.TRAIN_NAME_EXISTED()
            );
        }

    }
}