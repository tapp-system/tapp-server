import cors from 'cors';
import {
    json,
    // query,
    // raw,
    request,
    response,
    // static as static_,
    // text,
    urlencoded,
} from 'express';
import session from 'express-session';

import type { T } from 'ts';

import routes from './routes';

import { error, respond, validate } from '../Handlers';
import { error as errorM, user } from '../Middleware';

import {
    corsOptions,
    jsonOptions,
    sessionOptions,
    urlencodedOptions,
} from '../../Config';
import { pool, sessionStore } from '../../Database';

const setup: T.SetupFunction = async function () {
    request.pool = pool;
    request.validate = validate;

    response.error = error;
    response.respond = respond;

    this.use(session({ ...sessionOptions, store: sessionStore }));

    this.use(cors(corsOptions));
    this.use(json(jsonOptions));
    this.use(urlencoded(urlencodedOptions));

    this.use(await routes());

    this.use(user);
    this.use(errorM);
    // TODO Other error monitors like Sentry
};

export default setup;
