import type { T } from 'ts';

import { loggedIn } from '../../Middleware';

export default {
    handler: async (req, res) => {
        // NOT YET NEEDED -> const sid = req.sessionID;

        req.session.destroy((err) => {
            if (err) throw err;

            // NOT YET NEEDED -> req.ws.in(sid).disconnectSockets();

            res.respond(200, null, {
                code: 'S003',
                message: 'Sie haben sich erfolgreich abgemeldet.',
            });
        });
    },
    methods: new Set(['get']),
    middleware: [loggedIn],
} as T.Route;
