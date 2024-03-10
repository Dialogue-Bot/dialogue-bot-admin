import { ENDPOINTS } from '@/constants';
import { ConversationController } from '@/controllers/conversation.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

export class ConversationRoute implements Routes {
    router = Router();
    controller = new ConversationController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            `${ENDPOINTS.CONVERSATION.INDEX}/:conversationId/activities/:activity`,
            this.controller.handleIncomingMessage
        );
    }
}
