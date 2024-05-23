import type { T } from 'ts';

export default (async (req, res, next) => {
    if (req.session && !req.session.uid) return next();
    else {
        res.respond(403, null, {
            code: 'C008',
            error: true,
            message:
                'Dieser Endpunkt ist nur für Benutzer erlaubt, die nicht eingeloggt sind.',
        });
    }
}) as T.RequestHandler;
