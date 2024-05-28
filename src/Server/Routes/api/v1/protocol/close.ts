import Joi from 'joi';

import type { T } from 'ts';

export default {
    handler: async (req, res) => {
        const valid = req.validate(
            Joi.object({
                body: {
                    id: Joi.string().required().length(16),
                },
            }),
        );
        if (!valid) return;

        const result = await req.pool.fetch<Pick<T.TAPP.Protocol, 'end'>>(
            'SELECT end FROM tapp_protocol WHERE pid = $1;',
            [req.body.id],
        );

        if (result.rows.length === 0) {
            res.respond(409, null, {
                code: 'C018',
                message: 'Das gesuchte Protokoll existiert nicht.',
            });

            return;
        }

        if (result.rows[0]?.end !== null) {
            res.respond(409, null, {
                code: 'C019',
                message: 'Das gesuchte Protokoll ist schon geschlossen.',
            });

            return;
        }

        await req.pool.fetch(
            'UPDATE tapp_protocol SET end = $1 WHERE pid = $2;',
            [new Date(), req.body.id],
        );

        res.respond(200, null, {
            code: 'S017',
            message: ('Das Protokoll mit der id: "' +
                req.body.id +
                '" wurde geschlossen.') as T.Sentence<'.'>,
        });
    },
    methods: new Set(['post']),
} as T.Route<
    false,
    {
        id: T.TAPP.Protocol['pid'];
    }
>;
