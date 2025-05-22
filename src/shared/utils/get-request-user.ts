import { Request } from 'express';
import { JwtPayload } from '../guards/auth.guard';

export function getRequestUser(req: Request) {
  const { sub } = req['user'] as JwtPayload;
  return sub;
}
