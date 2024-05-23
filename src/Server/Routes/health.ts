import type { T } from 'ts';

export default {
    handler: async (_req, res) => {
        res.respond(200, null, {
            code: 'S001',
            message: 'Der Server funktioniert wie erwartet.',
        });
    },
    methods: new Set(['get', 'post', 'put']),
    middleware: [],
} as T.Route;
