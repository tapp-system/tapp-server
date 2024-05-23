export type V4Default = '127.0.0.1';

export type V4 = `${number}.${number}.${number}.${number}`;

export type V6 =
    `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`;

export type V6Default = '::1';

export type IP = V4 | V4Default | V6 | V6Default;
