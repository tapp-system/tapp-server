import type { UUID } from 'node:crypto';
import type { IdTokenClaims } from 'openid-client';

export default interface IServTokenClaims extends IdTokenClaims {
    exp: number;
    iat: number;
    iss: 'https://bszn-da.de';
    aud: string;
    sub: string;
    nonce?: string;
    email: string;
    email_verified: boolean;
    groups: {
        [groupId: `${number}`]: {
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
    roles: {
        uuid: UUID | null;
        id: string;
        displayName: string;
    }[];
}
