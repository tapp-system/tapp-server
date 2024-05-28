import type { T } from 'ts';

export default {
    handler: async (req, res) => {
        const result = await req.pool.fetch<
            Pick<T.TAPP.User, 'uid' | 'role' | 'name'>
        >('SELECT uid, role, name FROM tapp_user WHERE uid = $1;', [
            req.user.id,
        ]);

        res.respond(200, result.rows[0] ?? null, {
            code: 'S008',
            message: 'Eigene Benutzerdaten erhalten.',
        });
    },
    methods: new Set(['get']),
} as T.Route;
