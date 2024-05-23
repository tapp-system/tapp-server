import type { NextFunction, Request, Response } from 'express';

import type { T } from 'ts';

type ErrorRequestHandler<
    ReqBody extends T.RequestBody = T.RequestBody,
    ReqParams extends T.RequestParams = T.RequestParams,
    ReqQuery extends T.RequestQuery = T.RequestQuery,
> = (
    err: unknown,
    req: Request<ReqParams, T.ResponseBody, ReqBody, ReqQuery>,
    res: Response<T.ResponseBody>,
    next: NextFunction,
) => Promise<void>;

export default ErrorRequestHandler;
