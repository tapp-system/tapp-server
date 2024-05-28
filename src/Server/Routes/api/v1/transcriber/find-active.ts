import type { T } from 'ts';

import { user } from '../../../../Middleware';

export default {
    handler: async (req, res) => {
        const result = await req.pool.fetch(
            "SELECT * FROM tapp_transcriber WHERE active ='true' AND streaming = 'false';",
        );

        res.respond(200, result.rows, {
            code: 'S013',
            message:
                'Alle aktiven Transcriber erhalten, welche noch nicht aufzeichnen.',
        });
    },
    methods: new Set(['get']),
    middleware: [user],
} as T.Route;
