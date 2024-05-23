import type { T } from 'ts';

export default (async (req, res, next) => {
    if (!req.session || !req.session.uid) {
        res.respond(401, null, {
            code: 'C006',
            error: true,
            message:
                'Dieser Endpunkt ist nur für Benutzer vorgesehen, die angemeldet sind!',
        });

        return;
    }

    const result = await req.pool.fetch(
        'SELECT role FROM tapp_user WHERE uid = $1;',
        [req.session.uid],
    );

    if (result.rows.length <= 0) {
        // TODO Error -> User has a valid session with a uid, but is not in the user db.

        res.respond(401, null, {
            code: 'C007',
            error: true,
            message:
                'Dieser Endpunkt ist nur für Benutzer vorgesehen, die angemeldet sind!',
        });

        return;
    }

    // NOT YET NEEDED -> Checking if user has one of the Enum roles since there is currently no way to get a role outside the defined ones.

    return next();
}) as T.RequestHandler;
