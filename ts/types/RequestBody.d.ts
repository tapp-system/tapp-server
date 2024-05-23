import type { T } from 'ts';

type RequestBody = Record<string, T.JSON | null | undefined>;

export default RequestBody;
