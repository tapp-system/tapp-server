import type { T } from 'ts';

export default (async (req, res, next) => {
    try {
        if (req.session && !req.session.uid) return next();
        else {
            res.respond(403, null, {
                code: 'C008',
                message:
                    'Dieser Endpunkt ist nur für Benutzer erlaubt, die nicht eingeloggt sind.',
            });
        }
    } catch (err) {
        return next(err);
    }
}) as T.RequestHandler;
