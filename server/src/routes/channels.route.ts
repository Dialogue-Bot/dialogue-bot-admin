import { ENDPOINTS } from '@/constants';
import { ChannelController } from '@/controllers/channels.controller';
import { ChannelDTO, DeleteChannelDTO } from '@/dtos/channels.dto';
import { PagingDTO } from '@/dtos/paging.dto';
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
            ENDPOINTS.CHANNEL.INDEX,
            validate(ChannelDTO, 'body'),
            this.controller.createChannel
        );

        this.router.put(
            `${ENDPOINTS.CHANNEL.INDEX}/:id`,
            validate(ChannelDTO, 'body'),
            this.controller.updateChannel
        );

        this.router.delete(
            `${ENDPOINTS.CHANNEL.DELETE}/:id`,
            this.controller.deleteChannel
        );

        this.router.delete(
            ENDPOINTS.CHANNEL.DELETES,
            validate(DeleteChannelDTO, 'body'),
            this.controller.deleteMultipleChannel
        );

        this.router.get(
            ENDPOINTS.CHANNEL.INDEX,
            validate(PagingDTO, 'query'),
            this.controller.getChannelsPaging
        );
    }
}