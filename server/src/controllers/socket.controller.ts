import { LOCALE_KEY } from '@/constants'
import { LocaleService } from '@/i18n/ctx'
import { SocketService } from '@/services/socket.service'
import { Socket } from 'socket.io'
import Container from 'typedi'

export class SocketController {
    public socketService = Container.get(SocketService)
    public localeService = Container.get<LocaleService>(LOCALE_KEY)

    public handleSocketEvents(socket: Socket) {
        this.socketService.handleSocketEvents(socket);
    }

    public handleJoinRoom(socket: Socket) {
        this.socketService.handleJoinRoom(socket);
    }
}
