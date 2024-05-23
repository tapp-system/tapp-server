import type { T } from 'ts';

export default {
    handler: async (req, res) => {
        let data;
        if (req.originalUrl === '/404') {
            data = 'Test erfolgreich.';
        }

        res.respond(404, data ?? null, {
            code: 'C001',
            message: 'Dieser Pfad exisiert nicht.',
            error: true,
        });
    },
    methods: new Set<T.Http.Method>(['get', 'post']),
} as T.Route;
