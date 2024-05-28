import Joi from 'joi';

import type { T } from 'ts';

export default {
    handler: async (req, res) => {
        const valid = req.validate(
            Joi.object({
                params: {
                    loginStatus: Joi.string()
                        .required()
                        .allow(...['loggedIn', 'notLoggedIn']),
                },
            }),
        );
        if (!valid) return;

        let status = req.params.loginStatus === 'loggedIn';
        let loggedIn = false;

        if (req.user.id) {
            const result = await req.pool.fetch<Pick<T.TAPP.User, 'uid'>>(
                'SELECT uid FROM tapp_user WHERE uid = $1;',
                [req.user.id],
            );

            loggedIn = result.rows.length === 1;
        }

        let loginStatus = status ? loggedIn : !loggedIn;

        res.respond(200, loginStatus, {
            code: 'S004',
            message: ('Prüfung, ob Sie: "' + status
                ? 'angemeldet'
                : 'abgemeldet' + '" sind.') as T.Sentence<'.'>,
        });
    },
    methods: new Set(['get']),
    middleware: [],
} as T.Route<
    false,
    {},
    {
        loginStatus: 'loggedIn' | 'notLoggedIn';
    }
>;
