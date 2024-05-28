import Joi from 'joi';

import type { T } from 'ts';

import { loggedIn } from '../../Middleware';

export default {
    handler: async (req, res) => {
        const valid = req.validate(
            Joi.object({
                params: {
                    role: Joi.string()
                        .required()
                        .allow(...['admin', 'supervisor', 'teacher']),
                },
            }),
        );
        if (!valid) return;

        const result = await req.pool.fetch<Pick<T.TAPP.User, 'role'>>(
            'SELECT role FROM tapp_user WHERE uid = $1;',
            [req.user.id],
        );
        let role = result.rows[0]?.role;

        let isRole = false;
        switch (req.params.role) {
            case 'admin':
                isRole = role === 'ADMIN';
                break;
            case 'supervisor':
                isRole = role === 'ADMIN' || role === 'SUPERVISOR';
                break;
            case 'teacher':
                isRole =
                    role === 'ADMIN' ||
                    role === 'SUPERVISOR' ||
                    role === 'LEHRKRAFT';
                break;
            default:
                break;
        }

        res.respond(200, isRole, {
            code: 'S005',
            message: ('Prüfung, ob Sie der Rolle: "' +
                req.params.role +
                '" angehören.') as T.Sentence<'.'>,
        });
    },
    methods: new Set(['get']),
    middleware: [loggedIn],
} as T.Route<
    false,
    {},
    {
        role: 'admin' | 'supervisor' | 'teacher';
    }
>;
