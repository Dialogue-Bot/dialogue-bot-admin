import { ChannelService } from "@/services/channels.service";
import { catchAsync } from "@/utils/catch-async";
import { StatusCodes } from "http-status-codes";
import Container from "typedi";

export class ChannelController {
    public channelService = Container.get(ChannelService);

    public createChannel = catchAsync(async (req, res) => {
        const data = await this.channelService.create(req.body);
        res.status(StatusCodes.OK).json({
            message: 'Tạo channel thành công',
            data,
        });
    });

}