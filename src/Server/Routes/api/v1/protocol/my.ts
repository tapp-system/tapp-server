import Joi from 'joi';

import type { T } from 'ts';

import { supervisor } from '../../../../Middleware';

import { fetchNum } from '../../../../../Config';

export default {
    handler: async (req, res) => {
        const valid = req.validate(
            Joi.object({
                query: {
                    offset: Joi.string()
                        .required()
                        .regex(/[0-9]+/),
                },
            }),
        );
        if (!valid) return;

        let num = +req.query.offset;

        const result = await req.pool.fetch<T.TAPP.Protocol>(
            'SELECT * FROM tapp_protocol WHERE recorder = $1 ORDER BY begin DESC OFFSET $2 ROWS FETCH FIRST $3 ROW ONLY;',
            [req.session.uid, num, fetchNum],
        );

        res.respond(200, result.rows ?? [], {
            code: 'S015',
            message: 'Alle eigenen Protokolle erhalten.',
        });
    },
    methods: new Set(['get']),
    middleware: [supervisor],
} as T.Route<
    false,
    {},
    {},
    {
        offset: string;
    }
>;
