import type { NextFunction, Request, Response } from 'express';

import type { T } from 'ts';

type RequestHandler<
    ReqBody extends T.RequestBody = T.RequestBody,
    ReqParams extends T.RequestParams = T.RequestParams,
    ReqQuery extends T.RequestQuery = T.RequestQuery,
> = (
    req: Request<ReqParams, T.ResponseBody, ReqBody, ReqQuery>,
    res: Response<T.ResponseBody>,
    next: NextFunction,
) => Promise<void>;

export default RequestHandler;
