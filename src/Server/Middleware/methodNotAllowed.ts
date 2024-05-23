import type { T } from 'ts';

export default (async (req, res) => {
    res.respond(405, null, {
        code: 'C005',
        error: true,
        message: ('Für diesen Pfad ist die verwendete HTTP-Methode "' +
            req.method.toUpperCase() +
            '" nicht erlaubt!') as T.Sentence<'!'>,
    });
}) as T.RequestHandler;
