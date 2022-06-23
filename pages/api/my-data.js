import nc from 'next-connect';

import { getMe } from '../../controllers/user';
import { isAuthenticatedUser } from '../../middleware/auth';
import onError from '../../middleware/errorHandler';

const handler = nc({ onError });

handler.use(isAuthenticatedUser).get(getMe);

export default handler;
