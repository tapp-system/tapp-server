import type { T } from 'ts';

import { transcriber } from '../../../../Middleware';

export default {
    handler: async (req, res) => {
        const result = await req.pool.fetch<
            Pick<T.TAPP.Transcriber, 'active' | 'streaming'>
        >('SELECT active, streaming FROM tapp_transcriber WHERE tid = $1;', [
            req.user.mac,
        ]);

        if (!result.rows[0]?.active) {
            res.respond(409, null, {
                code: 'C012',
                message: 'Der Transcriber ist schon inaktiv.',
            });

            return;
        }

        if (result.rows[0].streaming) {
            res.respond(409, null, {
                code: 'C013',
                message: 'Der Transcriber ist noch am aufzeichnen.',
            });

            return;
        }

        await req.pool.fetch(
            "UPDATE tapp_transcriber SET active = 'false' WHERE tid = $1;",
            [req.user.mac],
        );

        res.respond(200, null, {
            code: 'S010',
            message: 'Transcriber inaktiv gesetzt.',
        });
    },
    methods: new Set(['get']),
    middleware: [transcriber],
} as T.Route;
