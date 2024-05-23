import { nanoid } from 'nanoid';

import type { T } from 'ts';

import { notLoggedIn } from '../../Middleware';

import { cookieMaxAge } from '../../../Config';
import { getUserRole, openIDClient } from '../../../Util';

export default {
    handler: async (req, res) => {
        const codeVerifier = req.session.codeVerifier ?? '';

        if (Object.entries(req.query).length === 0) {
            res.redirect('/auth/login');

            return;
        }

        let user = await openIDClient.get(req, codeVerifier);
        delete req.session.codeVerifier;

        let role = getUserRole(user.groups);

        const result = await req.pool.fetch<Pick<T.TAPP.User, 'uid'>>(
            'INSERT INTO tapp_user (uid, name, role, email, iserv_id) SELECT $1, $2, $3, $4, $5 ON CONFLICT (iserv_id) DO UPDATE SET name = $2, role = $3, email = $4 RETURNING uid;',
            [nanoid(16), user.name, role, user.email, user.uuid],
        );

        req.session.cookie.maxAge = cookieMaxAge;
        req.session.uid = result.rows[0]?.uid;

        res.respond(200, req.session.uid!, {
            code: 'S002',
            message: ('Sie sind erfolgreich mit der Rolle: "' +
                role +
                '" angemeldet.') as T.Sentence<'.'>,
        });
    },
    methods: new Set(['get']),
    middleware: [notLoggedIn],
} as T.Route;
