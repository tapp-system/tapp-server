import type { T } from 'ts';

export default <
    ReqBody extends T.RequestBody = T.RequestBody,
    ReqParams extends T.RequestParams = T.RequestParams,
    ReqQuery extends T.RequestQuery = T.RequestQuery,
>(
    handler: T.RequestHandler<ReqBody, ReqParams, ReqQuery>,
): T.RequestHandler<ReqBody, ReqParams, ReqQuery> => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
