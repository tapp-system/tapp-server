import type { T } from 'ts';

type Route<
    RI extends boolean = false,
    ReqBody extends T.RequestBody = T.RequestBody,
    ReqParams extends T.RequestParams = T.RequestParams,
    ReqQuery extends T.RequestQuery = T.RequestQuery,
> = {
    handler: T.RequestHandler<ReqBody, ReqParams, ReqQuery>;
    methods: Set<T.Http.Method>;
    middleware?: T.Middleware<ReqBody, ReqParams, ReqQuery> | [];
    routeMiddleware?: T.Conditional<
        RI,
        true,
        T.Middleware<ReqBody, ReqParams, ReqQuery>,
        null
    >;
};

export default Route;
