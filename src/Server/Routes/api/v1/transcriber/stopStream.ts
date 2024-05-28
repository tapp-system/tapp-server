import type { T } from 'ts';

import { transcriber } from '../../../../Middleware';

export default {
    handler: async (req, res) => {
        const result = await req.pool.fetch<
            Pick<T.TAPP.Transcriber, 'streaming'>
        >('SELECT active FROM tapp_transcriber WHERE tid = $1;', [
            req.user.mac,
        ]);

        if (!result.rows[0]?.streaming) {
            res.respond(409, null, {
                code: 'C016',
                message: 'Der Transcriber ist nicht am aufzeichnen.',
            });

            return;
        }

        await req.pool.fetch(
            "UPDATE tapp_transcriber SET streaming = 'false' WHERE tid = $1;",
            [req.user.mac],
        );

        res.respond(200, null, {
            code: 'S012',
            message: 'Transcriber zeichnet jetzt nicht mehr auf.',
        });
    },
    methods: new Set(['get']),
    middleware: [transcriber],
} as T.Route;
