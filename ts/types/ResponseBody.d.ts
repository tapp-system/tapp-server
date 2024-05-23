import type { T } from 'ts';

type ResponseBody = {
    data: boolean | number | string | null | T.JSON;
    meta: T.MetaData;
};

export default ResponseBody;
