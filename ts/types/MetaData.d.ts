import type { Request } from 'express';

import type { T } from 'ts';

type MetaData = {
    code: T.ServerCode;
    error: boolean;
    method: Request['method'];
    path: Request['originalUrl'];
    message: T.Sentence<'.' | '!'>;
};

export default MetaData;
