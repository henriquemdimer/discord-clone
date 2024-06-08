import { NextFunction, Request, Response } from 'express';
import HttpResponses from '../utils/HttpResponses';
import AuthService from '../../app/services/auth.service';
import UserService from '../../app/services/user.service';

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return HttpResponses.Unauthorized(res);

  const authService = new AuthService();
  const id = authService.verifyToken(token);
  if (!id) return HttpResponses.Unauthorized(res);
  const userService = new UserService();
  if (!(await userService.find({ id }))) return HttpResponses.Unauthorized(res);

  res.locals.id = id;
  next();
}
