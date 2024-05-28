import type { T } from 'ts';

import { transcriber } from '../../../../Middleware';

export default {
    handler: async (req, res) => {
        const result = await req.pool.fetch<Pick<T.TAPP.Transcriber, 'active'>>(
            'SELECT active FROM tapp_transcriber WHERE tid = $1;',
            [req.user.mac],
        );

        if (result.rows[0]?.active) {
            res.respond(409, null, {
                code: 'C011',
                message: 'Der Transcriber ist schon aktiv.',
            });

            return;
        }

        await req.pool.fetch(
            "UPDATE tapp_transcriber SET active = 'true' WHERE tid = $1;",
            [req.user.mac],
        );

        res.respond(200, null, {
            code: 'S009',
            message: 'Transcriber aktiv gesetzt.',
        });
    },
    methods: new Set(['get']),
    middleware: [transcriber],
} as T.Route;
