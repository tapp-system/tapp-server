import type { T } from 'ts';

export default (async (req, res, next) => {
    try {
        const result = await req.pool.fetch<Pick<T.TAPP.User, 'role'>>(
            'SELECT role FROM tapp_user WHERE uid = $1;',
            [req.session.uid],
        );

        let role = result.rows[0]?.role;
        if (role === 'ADMIN' || role === 'SUPERVISOR') return next();

        res.respond(403, null, {
            code: 'C017',
            message:
                'Dieser Endpunkt ist nur für Benutzer vorgesehen, die ein Supervisor oder Admin sind!',
        });
    } catch (err) {
        next(err);
    }
}) as T.RequestHandler;
