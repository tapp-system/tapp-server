import type { T } from 'ts';

import { notLoggedIn } from '../../Middleware';

import { openIDClient } from '../../../Util';

export default {
    handler: async (req, res) => {
        const { codeVerifier, redirectUri } = openIDClient.redirector;
        req.session.codeVerifier = codeVerifier;
        req.session.cookie.maxAge = 1000 * 60 * 2;

        if (
            req.query.manual &&
            (req.query.manual === 'y' || req.query.manual === 't')
        ) {
            res.respond(200, redirectUri, {
                code: 'S001',
                message: 'IServ Anmelde-URI erhalten.',
            });

            return;
        }

        res.redirect(redirectUri);
    },
    methods: new Set(['get']),
    middleware: [notLoggedIn],
} as T.Route<
    false,
    {},
    {},
    {
        manual?: 'y' | 't' | 'n' | 'f';
    }
>;
