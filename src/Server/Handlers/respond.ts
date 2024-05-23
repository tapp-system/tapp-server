import type { T } from 'ts';

const httpCodeMap: T.Http.CodeMap = {
    200: 'SUCCESS',
    201: 'CREATED',
    204: 'NO CONTENT',
    301: 'MOVED PERMANENTLY',
    303: 'SEE OTHER',
    400: 'BAD REQUEST',
    401: 'UNAUTHENTICATED',
    403: 'UNAUTHORIZED',
    404: 'NOT FOUND',
    405: 'METHOD NOT ALLOWED',
    409: 'CONFLICT',
    500: 'INTERNAL SERVER ERROR',
    520: 'UNEXPECTED SERVER ERROR',
    521: 'UNHANDLED SERVER ERROR',
};

export default (async function (status, data, meta) {
    try {
        if (this.headersSent) {
            return;
        }

        if (!meta.error) meta.error = false;

        this.statusCode = status;
        this.statusMessage = httpCodeMap[status];

        this.json({
            data,
            meta: {
                ...(meta as Pick<T.MetaData, 'code' | 'error' | 'message'>),
                method: this.req.method.toUpperCase(),
                path: this.req.originalUrl,
            },
        });
    } catch (error) {
        this.statusCode = 520;
        this.statusMessage = httpCodeMap[this.statusCode as 520];

        if (error instanceof Error) {
            // TODO Alert unexpected error in respond function

            this.json({
                data: null,
                meta: {
                    code: 'U001',
                    error: true,
                    message:
                        'Ein unerwarteter Fehler ist aufgetreten. Bitte umgehend einen Administrator kontaktieren!',
                    method: this.req.method.toUpperCase(),
                    path: this.req.originalUrl,
                },
            });

            return;
        }

        // TODO Alert error not instanceof Error

        this.json({
            data: null,
            meta: {
                code: 'U002',
                error: true,
                message:
                    'Ein unerwarteter Fehler ist aufgetreten. Bitte umgehend einen Administrator kontaktieren!',
                method: this.req.method.toUpperCase(),
                path: this.req.originalUrl,
            },
        });

        return;
    } finally {
        return this.end();
    }
} as T.RespondFunction);
