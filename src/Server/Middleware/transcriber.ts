import type { T } from 'ts';

export default (async (req, res, next) => {
    try {
        if (!req.user.apiKey || !req.user.mac) {
            res.respond(400, null, {
                code: 'C009',
                message:
                    'Es wurde entweder kein "x-apikey"- oder "x-macadress"-Header mitgeliefert.',
            });

            return;
        }

        const result = await req.pool.fetch<Pick<T.TAPP.Transcriber, 'tid'>>(
            'SELECT tid FROM tapp_transcriber WHERE api_key = $1;',
            [req.user.apiKey],
        );

        if (result.rows.length === 0 || result.rows[0]?.tid !== req.user.mac) {
            res.respond(401, null, {
                code: 'C010',
                message: 'Invalider API-Key!',
            });

            return;
        }

        next();
    } catch (err) {
        next(err);
    }
}) as T.RequestHandler;
