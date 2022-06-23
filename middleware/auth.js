import catchAsync from './catchAsync';
import AppError from '../utils/AppError';
import { getSession } from 'next-auth/react';

export const isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new AppError('Login first to access this resource', 401));
  }

  req.user = session.user;
  next();
});
