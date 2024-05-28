import type { T } from 'ts';

export default (async (err, req, res, _next) => {
    try {
        // TODO better logging
        console.error(err);

        req.statusCode = 521;
        req.statusMessage = 'UNHANDLED SERVER ERROR';

        res.json({
            data: null,
            meta: {
                code: 'U004',
                error: true,
                message:
                    'Ein unerwarteter Fehler ist aufgetreten. Bitte umgehend einen Administrator kontaktieren!',
                method: req.method.toUpperCase(),
                path: req.originalUrl,
            },
        }).end();
    } catch (err) {
        // TODO Error while handling an unhandled error
        throw err;
    }
}) as T.ErrorRequestHandler;
