import nc from 'next-connect';

import { setCookies } from '../../controllers/cookies';

const handler = nc();

handler.get(setCookies);

export default handler;
