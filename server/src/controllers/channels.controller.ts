import { LOCALE_KEY } from "@/constants";
import { PagingDTO } from "@/dtos/paging.dto";
import { LocaleService } from "@/i18n/ctx";
import { ChannelService } from "@/services/channels.service";
import { catchAsync } from "@/utils/catch-async";
import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import { StatusCodes } from "http-status-codes";
import Container from "typedi";

export class ChannelController {
    public channelService = Container.get(ChannelService);
    public localeService = Container.get<LocaleService>(LOCALE_KEY);

    public createChannel = catchAsync(async (req, res) => {
        await this.channelService.create(req.body);
        res.status(StatusCodes.OK).json({
            message: this.localeService.i18n().CHANNEL.CREATE_SUCCESS(),
        });
    });

    public updateChannel = catchAsync(async (req, res) => {
        await this.channelService.updateById(req.params.id, req.body);
        res.status(StatusCodes.OK).json({
            message: this.localeService.i18n().CHANNEL.UPDATE_SUCCESS(),
        });
    })

    public deleteChannel = catchAsync(async (req, res) => {
        await this.channelService.deleteById(req.params.id);
        res.status(StatusCodes.OK).json({
            message: this.localeService.i18n().CHANNEL.DELETE_CHANNEL_SUCCESS(),
        });
    })

    public deleteMultipleChannel = catchAsync(async (req, res) => {
        await this.channelService.deleteByIds(req.body.id);
        res.status(StatusCodes.OK).json({
            message: this.localeService.i18n().CHANNEL.DELETE_MULTIPLE_CHANNELS_SUCCESS(),
        });
    })

    public getChannelsPaging = catchAsync(async (req, res) => {
        const paging = plainToClass(PagingDTO, req.query);
        await validateOrReject(paging);

        const result = await this.channelService.getChannelsPaging(paging);
        res.status(StatusCodes.OK).json({ result });
    })
}