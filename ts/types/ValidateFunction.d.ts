import type { Request } from 'express';
import type { ObjectSchema } from 'joi';

import type { T } from 'ts';

type ValidateFunction = (
    this: Request<
        T.RequestParams,
        T.ResponseBody,
        T.RequestBody,
        T.RequestQuery
    >,
    schema: ObjectSchema,
) => Promise<boolean>;

export default ValidateFunction;
