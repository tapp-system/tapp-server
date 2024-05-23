import type { UUID } from 'node:crypto';

import type { T } from 'ts';

type OpenIDClientTokenClaims = {
    exp: number;
    iat: number;
    iss: string;
    aud: string;
    sub: UUID;
    nonce: null;
    email: T.EMail;
    email_verified: boolean;
    groups: {
        [key: `${number}`]: {
            id: number;
            uuid: UUID;
            act: string;
            name: string;
        };
    };
    preferred_username: string;
    name: string;
    nickname: string;
    given_name: string;
    family_name: string;
    locale: 'de-DE' | string;
    uuid: UUID;
    roles: { uuid: UUID; id: Uppercase<string>; displayname: string }[];
};

export default OpenIDClientTokenClaims;
