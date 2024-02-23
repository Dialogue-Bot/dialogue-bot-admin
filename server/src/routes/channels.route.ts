import { ENDPOINTS } from '@/constants';
import { ChannelController } from '@/controllers/channels.controller';
import { channelDTO } from '@/dtos/channels.dto';
import { validate } from '@/middlewares/validation.middleware';
import type { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
export class ChannelRoute implements Routes {
    public router: Router = Router();
    public controller = new ChannelController();

    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(
            ENDPOINTS.CHANNEL,
            validate(channelDTO, 'body'),
            this.controller.createChannel
        );
    }
}