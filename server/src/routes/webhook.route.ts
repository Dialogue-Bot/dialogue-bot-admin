import { ENDPOINTS } from '@/constants';
import { WebhookController } from '@/controllers/webhook.controller';
import type { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
export class WebhookRoute implements Routes {
    public router: Router = Router();
    public controller = new WebhookController();

    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(
            ENDPOINTS.WEBHOOK.VERIFY,
            this.controller.verifyWebhook
        );

        this.router.post(
            ENDPOINTS.WEBHOOK.INCOMING_MSG,
            this.controller.handleIncomingMessage
        );
    }
}