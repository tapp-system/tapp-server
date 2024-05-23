import type { I, T } from 'ts';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: 'development' | 'staging' | 'production';
            OPENID_CLIENT_ID?: string;
            OPENID_CLIENT_SECRET?: string;
            POSTGRES_DATABASE?: string;
            POSTGRES_HOST?: string;
            POSTGRES_PASSWORD?: string;
            POSTGRES_PORT?: string;
            POSTGRES_USER?: string;
        }
    }

    namespace Express {
        interface Application {
            setup: T.SetupFunction;
        }

        interface Request {
            IDMCache: I.IDMCache;
            pool: I.Pool;
            user: {
                apiKey: string | null;
                ip: T.IP.IP;
                mac: T.MACAddress | null;
            };

            validate: T.ValidateFunction;
        }

        interface Response {
            error: T.ErrorFunction;
            respond: T.RespondFunction;
        }
    }
}

export {};
