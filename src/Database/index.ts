import CacheIDM from './IDMCache';
import Postgres from './Postgres';
import SessionStore from './SessionStore';

import { cookieMaxAge, IDMCacheOptions, poolConfig } from '../Config';

export const IDMCache = new CacheIDM(IDMCacheOptions);
export const pool = new Postgres(poolConfig);
export const sessionStore = new SessionStore({
    maxAge: cookieMaxAge,
    pool,
});
