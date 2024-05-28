import { nanoid } from 'nanoid';

import type { OptionsJson, OptionsUrlencoded } from 'body-parser';
import type { CorsOptions } from 'cors';
import type { RouterOptions } from 'express';
import type { SessionOptions } from 'express-session';
import type { ClientMetadata, IssuerMetadata } from 'openid-client';
import type { PoolConfig } from 'pg';
import type { ServerOptions } from 'socket.io';

export const cookieMaxAge = 1000 * 60 * 60 * 24 * 7;

export const corsOptions: Readonly<CorsOptions> = {
    // allowedHeaders
    credentials: true,
    // exposedHeaders
    maxAge: cookieMaxAge,
    methods: [
        'CHECKOUT',
        'COPY',
        'DELETE',
        'GET',
        'HEAD',
        'LOCK',
        'MERGE',
        'MKACTIVITY',
        'MKCOL',
        'MOVE',
        'M-SEARCH',
        'NOTIFY',
        'OPTIONS',
        'PATCH',
        'POST',
        'PURGE',
        'PUT',
        'REPORT',
        'SEARCH',
        'SUBSCRIBE',
        'TRACE',
        'UNLOCK',
        'UNSUBSCRIBE',
    ],
    optionsSuccessStatus: 204,
    origin: ['http://localhost', 'https://tapp.hems.de'],
    preflightContinue: false,
};

export const environment = process.env['NODE_ENV'] ?? 'development';

export const fetchNum = 15;

export const IDMCacheOptions = {
    apiKey: process.env['IDM_API_KEY'] ?? '',
    urlBase: process.env['IDM_URL_BASE'] ?? '',
};

export const jsonOptions: Readonly<OptionsJson> = {
    inflate: true,
    limit: '50kb',
    // reviver(key, value) {},
    strict: true,
    // type(req) {},
    // verify(req, res, buf, encoding) {},
};

export const openIdBase = 'https://bszn-da.de';

export const openIdClientOptions: Readonly<ClientMetadata> = {
    // authorization_encrypted_response_alg
    // authorization_encrypted_response_enc
    // authorization_signed_response_alg
    client_id: process.env['OPENID_CLIENT_ID'] ?? '',
    client_secret: process.env['OPENID_CLIENT_SECRET'] ?? '',
    // default_max_age
    // id_token_encrypted_response_alg
    // id_token_encrypted_response_enc
    // id_token_signed_response_alg
    // introspection_endpoint_auth_method
    // introspection_endpoint_auth_signing_alg
    // post_logout_redirect_uris
    redirect_uris: [
        environment === 'development'
            ? 'http://localhost/auth/redirect'
            : 'https://tapp.bszn-da.de/auth/redirect',
    ],
    // request_object_encryption_alg
    // request_object_encryption_enc
    // request_object_signing_alg
    // require_auth_time
    response_types: ['code'],
    // revocation_endpoint_auth_method
    // revocation_endpoint_auth_signing_alg
    // tls_client_certificate_bound_access_tokens
    // token_endpoint_auth_method
    // token_endpoint_auth_signing_alg
    // userinfo_encrypted_response_alg
    // userinfo_encrypted_response_enc,
    // userinfo_signed_response_alg
};

export const openIdIssuerOptions: Readonly<IssuerMetadata> = {
    authorization_endpoint: openIdBase + '/iserv/oauth/v2/auth',
    // end_session_endpoint
    issuer: openIdBase,
    // introspection_endpoint_auth_methods_supported
    // introspection_endpoint_auth_signing_alg_values_supported
    jwks_uri: openIdBase + '/iserv/public/jwk',
    // mtls_endpoint_aliases
    // registration_endpoint
    // request_object_signing_alg_values_supported
    // revocation_endpoint
    // revocation_endpoint_auth_methods_supported
    // revocation_endpoint_auth_signing_alg_values_supported
    token_endpoint: openIdBase + '/iserv/oauth/v2/token',
    // token_endpoint_auth_methods_supported
    // token_endpoint_auth_signing_alg_values_supported
    userinfo_endpoint: openIdBase + '/iserv/public/oauth/userinfo',
};

export const openIdScopes = 'openid profile uuid email groups roles';

export const poolConfig: Readonly<PoolConfig> = {
    allowExitOnIdle: false,
    application_name: 'TAPP',
    // connectionString // NOT NEEDED -> All parameters are entered manually
    connectionTimeoutMillis: 20000,
    database: process.env['POSTGRES_DATABASE'],
    host: process.env['POSTGRES_HOST'],
    idle_in_transaction_session_timeout: 60000,
    idleTimeoutMillis: 10000,
    // keepAlive
    // keepAliveInitialDelayMillis
    // log
    max: 20,
    // maxUses
    min: 4,
    // options
    password: process.env['POSTGRES_PASSWORD'],
    port: isNaN(+(process.env['POSTGRES_PORT'] ?? ''))
        ? 9999
        : +(process.env['POSTGRES_PORT'] ?? 9999),
    // Promise
    // query_timeout
    ssl:
        environment !== 'development'
            ? {
                  rejectUnauthorized: false,
              }
            : undefined,
    // statement_timeout
    // stream
    // types
    user: process.env['POSTGRES_USER'],
};

export const routerOptions: Readonly<RouterOptions> = {
    caseSensitive: false,
    mergeParams: false,
    strict: false,
};

export const sessionOptions: Readonly<SessionOptions> = {
    cookie: {
        // domain
        // encode
        httpOnly: true,
        maxAge: cookieMaxAge,
        // partitioned
        path: '/',
        // priority: 'high',
        sameSite: false,
        secure: environment !== 'development',
        // signed
    },
    genid: (_req) => {
        return nanoid(16);
    },
    name: 'tapp.session',
    // proxy
    resave: false,
    // rolling
    secret: process.env['SESSION_SECRET'] ?? 'MY LITTLE SECRET', // Will always be SESSION_SECRET, but for type-safety there is a default
    saveUninitialized: false,
    // NOT NEEDED store Set in session middleware
    unset: 'destroy',
};

export const urlencodedOptions: Readonly<OptionsUrlencoded> = {
    extended: true,
    inflate: true,
    limit: '100kb',
    parameterLimit: 100,
    // type
    // verify
};

export const websocketOptions: Readonly<Partial<ServerOptions>> = {
    // adapter
    addTrailingSlash: false,
    // allowEIO3
    // allowRequest
    // allowUpgrades
    // cleanupEmptyChildNamespaces
    // connectionStateRecovery
    connectTimeout: 1000 * 20,
    // cookie
    cors: corsOptions,
    // destroyUpgrade
    // destroyUpgradeTimeout
    httpCompression: true,
    // initialPacket
    maxHttpBufferSize: 10 ** 5,
    // parser:
    path: '/ws',
    perMessageDeflate: false,
    pingInterval: 1000 * 20,
    pingTimeout: 1000 * 30,
    serveClient: false,
    transports: ['polling', 'websocket'],
    // upgradeTimeout
    // wsEngine
};
