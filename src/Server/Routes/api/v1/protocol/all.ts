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
            'SELECT * FROM tapp_protocol ORDER BY pid OFFSET $1 ROWS FETCH FIRST $2 ROW ONLY;',
            [num, fetchNum],
        );

        res.respond(200, result.rows ?? [], {
            code: 'S014',
            message: 'Alle Protokolle erhalten.',
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
