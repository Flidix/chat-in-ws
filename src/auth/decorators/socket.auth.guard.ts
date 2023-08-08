import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: Socket = context.switchToWs().getClient();
    try {
      const token = socket.handshake.headers.authorization;
      if (!token) {
        throw new UnauthorizedException({ message: 'користувач не авторизований' });
      }
      const user = this.jwtService.verify(token);
      if (!token || !user) {
        throw new UnauthorizedException({ message: 'користувач не авторизований' });
      }
      socket.handshake.auth = user;
      return true;
  } catch (e) {
    throw new UnauthorizedException('користувач не авторизований');
  }
  }
}
