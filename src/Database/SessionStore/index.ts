import { Store } from 'express-session';

import type { I, T } from 'ts';

import { noop } from '../../Util';

export default class SessionStore extends Store {
    private maxAge: number;
    private pool: I.Pool;

    constructor({ maxAge, pool }: { maxAge: number; pool: I.Pool }) {
        super();

        this.maxAge = maxAge;
        this.pool = pool;
    }

    /**
     * Required
     */
    public override async destroy(
        sid: string,
        cb: (err?: unknown) => void = noop,
    ) {
        try {
            await this.pool.fetch('DELETE FROM tapp_session WHERE sid = $1;', [
                sid,
            ]);

            cb(null);
        } catch (error) {
            cb(error);
        }
    }

    /**
     * Required
     */
    public override async get(
        sid: T.TAPP.Session['sid'],
        cb: (err?: unknown, session?: T.TAPP.Session['data']) => void = noop,
    ) {
        try {
            const result = await this.pool.fetch<{
                data: T.TAPP.Session['data'];
            }>('SELECT data FROM tapp_session WHERE sid = $1;', [sid]);

            cb(null, result.rows[0]?.data);
        } catch (error) {
            cb(error);
        }
    }

    /**
     * Required
     */
    public override async set(
        sid: T.TAPP.Session['sid'],
        session: T.TAPP.Session['data'],
        cb: (err?: unknown) => void = noop,
    ) {
        try {
            await this.pool.fetch(
                'INSERT INTO tapp_session (data, expires, sid) SELECT $2, $3, $1 ON CONFLICT (sid) DO UPDATE SET data = $2, expires = $3 RETURNING sid;',
                [sid, session, this.newMaxAge()],
            );

            cb(null);
        } catch (error) {
            cb(error);
        }
    }

    /**
     * Recommended
     */
    public override async touch(
        sid: T.TAPP.Session['sid'],
        session: T.TAPP.Session['data'],
        cb: (err?: unknown) => void = noop,
    ) {
        try {
            await this.pool.fetch(
                'UPDATE tapp_session SET data = $1, expires = $2,  WHERE sid = $3;',
                [session, this.newMaxAge(), sid],
            );

            cb(null);
        } catch (error) {
            cb(error);
        }
    }

    private newMaxAge(): T.TAPP.Session['expires'] {
        return new Date(Date.now() + this.maxAge);
    }
}
