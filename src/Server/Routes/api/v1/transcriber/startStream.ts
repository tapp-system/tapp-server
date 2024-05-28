import type { T } from 'ts';

import { transcriber } from '../../../../Middleware';

export default {
    handler: async (req, res) => {
        const result = await req.pool.fetch<
            Pick<T.TAPP.Transcriber, 'active' | 'streaming'>
        >('SELECT active FROM tapp_transcriber WHERE tid = $1;', [
            req.user.mac,
        ]);

        if (!result.rows[0]?.active) {
            res.respond(409, null, {
                code: 'C014',
                message: 'Der Transcriber ist noch nicht aktiv.',
            });
        }

        if (result.rows[0]?.streaming) {
            res.respond(409, null, {
                code: 'C015',
                message: 'Der Transcriber ist schon am aufzeichnen.',
            });

            return;
        }

        await req.pool.fetch(
            "UPDATE tapp_transcriber SET streaming = 'true' WHERE tid = $1;",
            [req.user.mac],
        );

        res.respond(200, null, {
            code: 'S011',
            message: 'Transcriber zeichnet jetzt auf.',
        });
    },
    methods: new Set(['get']),
    middleware: [transcriber],
} as T.Route;
