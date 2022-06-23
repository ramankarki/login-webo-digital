import catchAsync from '../middleware/catchAsync';
import axios from 'axios';
import AppError from '../utils/AppError';

export const getMe = catchAsync(async (req, res, next) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  const user = data.find((obj) => obj.email === req.user.email);

  if (!user) {
    return next(new AppError('Invalid Email or Password', 401));
  }

  res.json(user);
});
