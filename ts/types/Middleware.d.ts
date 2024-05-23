import type { T } from 'ts';

type Middleware<
    ReqBody extends T.RequestBody,
    ReqParams extends T.RequestParams,
    ReqQuery extends T.RequestQuery,
> =
    | T.RequestHandler<ReqBody, ReqParams, ReqQuery>
    | T.RequestHandler<ReqBody, ReqParams, ReqQuery>[]
    | T.ErrorRequestHandler<ReqBody, ReqParams, ReqQuery>
    | T.ErrorRequestHandler<ReqBody, ReqParams, ReqQuery>[];

export default Middleware;
