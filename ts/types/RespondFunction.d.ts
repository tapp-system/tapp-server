import type { Response } from 'express';

import type { T } from 'ts';

type RespondFunction = <
    This extends Response<T.ResponseBody> = Response<T.ResponseBody>,
>(
    this: This,
    status: T.Http.Code[0],
    data: T.ResponseBody['data'],
    meta: {
        code: T.MetaData['code'];
        message: T.MetaData['message'];
    },
) => Promise<This>;

export default RespondFunction;
