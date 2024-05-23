import Postgres from './Postgres';
import SessionStore from './SessionStore';

import { cookieMaxAge, poolConfig } from '../Config';

export const pool = new Postgres(poolConfig);
export const sessionStore = new SessionStore({
    maxAge: cookieMaxAge,
    pool,
});
