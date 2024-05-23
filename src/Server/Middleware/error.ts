import type { T } from 'ts';

export default (async (err, _req, res, next) => {
    try {
        console.log('Error middleware triggered');
        console.error(err);
        if (err instanceof Error) {
            res.error(err, 'U003');
        } else throw err;
    } catch (error) {
        next(error);
    }
}) as T.ErrorRequestHandler;
