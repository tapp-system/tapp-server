import type { Response } from 'express';

import type { T } from 'ts';

type ErrorFunction = <
    This extends Response<T.ResponseBody> = Response<T.ResponseBody>,
>(
    this: This,
    error: Error,
    code: T.MetaData['code'],
) => Promise<This>;

export default ErrorFunction;
