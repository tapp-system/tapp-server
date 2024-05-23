import type { T } from 'ts';

declare module 'express-session' {
    interface SessionData {
        codeVerifier: string | undefined;
        uid: T.TAPP.User['uid'] | undefined;
        test: unknown;
    }
}
