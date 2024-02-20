import type { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import type { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';

export class UserController {
   // private userService = Container.get(UserService);
}
