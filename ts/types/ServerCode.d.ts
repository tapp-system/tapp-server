import type { T } from 'ts';

type ServerCode = `${'C' | 'S' | 'U'}${
    | `00${Exclude<T.Digit, 0>}`
    | `${T.Digit}${Exclude<T.Digit, 0>}${T.Digit}`}`;

export default ServerCode;
