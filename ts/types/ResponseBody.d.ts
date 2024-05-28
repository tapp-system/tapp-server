import type { T } from 'ts';

type ResponseBody = {
    data: T.ResponseData;
    meta: T.MetaData;
};

export default ResponseBody;
