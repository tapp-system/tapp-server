import type { T } from 'ts';

type RequestBody = Record<
    string,
    string | number | string[] | number[] | null | undefined
>;

export default RequestBody;
