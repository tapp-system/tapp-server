import type { SessionData } from 'express-session';
import type { UUID } from 'node:crypto';

import type { T } from 'ts';

type HalfYears = `Q${Extract<T.Digit, 1 | 2 | 3 | 4>}`;
type HalfYearsField =
    | [Extract<HalfYears, 'Q1'>, Exclude<HalfYears, 'Q1'>]
    | [Extract<HalfYears, 'Q2'>, Exclude<HalfYears, 'Q1' | 'Q2'>]
    | [Extract<HalfYears, 'Q3'>, Exclude<HalfYears, 'Q1' | 'Q2' | 'Q3'>];

type ProtocolType =
    | 'MÜNDLICHE PRÜFUNG'
    | 'MÜNDLICHE NACHPRÜFUNG'
    | 'BESONDERE LERNLEISTUNG'
    | 'PRÄSENTATIONSPRÜFUNG';

type Room = `${'A' | 'B' | 'C'}${'-' | ''}${Extract<
    T.Digit,
    0 | 1 | 2
>}.${Extract<T.Digit, 0 | 1 | 2>}${T.Digit}`;

type TranscriberNumber = `${Extract<T.Digit, 0 | 1 | 2>}${T.Digit}${T.Digit}`;

type UserRole = 'LEHRKRAFT' | 'SUPERVISOR' | 'ADMIN';

export type Entry = {
    eid: string;
    protocol: Protocol['pid'];
    text: string;
    begin: Date;
    end: Date;
    edited: boolean;
    editors: string[];
};

export type Protocol = {
    pid: string;
    recorder: User['uid'];
    examinant: UUID;
    chairman: UUID;
    examinee: UUID;
    subject: string;
    type: ProtocolType;
    begin: Date;
    end: Date;
    years: HalfYearsField;
    room: Room;
    transcriber: Transcriber['tid'];
};

export type Session = {
    sid: string;
    data: SessionData;
    expires: Date;
};

export type Transcriber = {
    tid: T.MACAddress;
    active: boolean;
    streaming: boolean;
    number: TranscriberNumber;
    api_key: string;
};

export type User = {
    uid: string;
    name: string;
    role: UserRole;
    iserv_id: UUID;
    email: T.EMail;
};
