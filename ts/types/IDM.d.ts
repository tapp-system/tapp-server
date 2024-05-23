import type { UUID } from 'node:crypto';

export type Data = {
    user: string;
    tenant: {
        uuid: string;
    };
    uuid: string;
    hexUuid: UUID;
    firstname: string | null;
    lastname: string | null;
    created: string;
    createdBy: {
        uuid: string;
    };
    deleted: null | unknown;
    deletedBy: null | unknown;
    locked: boolean;
    importId: string;
    auxInfo: string;
    passwordTemp: false | unknown;
    emailAddress: string;
    preferredLoginName: string;
    groups: { uuid: string }[];
    roles: { uuid: string }[];
    privileges: { uuid: string }[];
    relations: { uuid: string }[];
    loginIdentifiers: { uuid: string }[];
    externalIdentifiers: { uuid: string }[];
    twoFactorClients: { uuid: string }[];
    registrationCodes: [] | unknown[];
};

export type Cache = Record<
    `${Exclude<Data['firstname'], null | 'null'>}${'' | ' '}${Exclude<
        Data['lastname'],
        null | 'null'
    >}`,
    UserData
>;

export type UserData = {
    class: Data['auxInfo'];
    email: Data['emailAddress'];
    firstname: Data['firstname'];
    lastname: Data['lastname'];
    user: Data['user'];
    uuid: Data['hexUuid'];
};
