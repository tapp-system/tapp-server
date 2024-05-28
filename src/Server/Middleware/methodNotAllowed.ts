import type { T } from 'ts';

export default (async (req, res, next) => {
    try {
        res.respond(405, null, {
            code: 'C005',
            message: ('Für diesen Pfad ist die verwendete HTTP-Methode "' +
                req.method.toUpperCase() +
                '" nicht erlaubt!') as T.Sentence<'!'>,
        });
    } catch (err) {
        return next(err);
    }
}) as T.RequestHandler;
