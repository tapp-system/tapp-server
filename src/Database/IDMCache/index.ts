import type { I, T } from 'ts';

export default class IDMCache implements I.IDMCache {
    private groupCache: Record<string, string>;
    private studentCache: T.IDM.Cache;
    private teacherCache: T.IDM.Cache;

    private fetchOptions: RequestInit;
    private urlBase: string;

    constructor({ apiKey, urlBase }: { apiKey: string; urlBase: string }) {
        this.groupCache = {};
        this.studentCache = {};
        this.teacherCache = {};

        this.fetchOptions = {
            // NOT NEEDED body
            // NOT NEEDED cache
            credentials: 'include',
            headers: [
                ['X-IServ-Authentication', apiKey],
                ['accept', 'application/json'],
                // ['Content-Type', 'application/json'],
            ],
            // NOT NEEDED integrity
            // NOT NEEDED keepalive
            method: 'GET',
            mode: 'cors',
            // redirect: 'error',
            // NOT NEEDED referrer
            // NOT NEEDED referrerPolicy
            // NOT NEEDED signal
            // NOT NEEDED window
        };

        this.urlBase = urlBase;
    }

    public findStudent(student: string) {
        let result = [];

        for (let key of Object.keys(this.studentCache)) {
            if (key.toLowerCase().startsWith(student.toLowerCase())) {
                result.push(
                    this.studentCache[
                        key as keyof T.IDM.Cache
                    ] as T.IDM.UserData,
                );
            }
        }

        return result;
    }

    public findTeacher(teacher: string) {
        let result = [];

        for (let key of Object.keys(this.teacherCache)) {
            if (key.toLowerCase().startsWith(teacher.toLowerCase())) {
                result.push(
                    this.teacherCache[
                        key as keyof T.IDM.Cache
                    ] as T.IDM.UserData,
                );
            }
        }

        return result;
    }

    public async init() {
        await this.fetchGroups();
        await this.fetchUsers();
    }

    private async fetchGroups() {
        const result = await fetch(
            this.urlBase +
                '/groups?name[icontains]=hems&_attributes=uuid,group',
            this.fetchOptions,
        );

        const groups = (await result.json()) as {
            uuid: string;
            group: string;
        }[];

        for (let { group, uuid } of groups) {
            this.groupCache[uuid] = group;
        }
    }

    private async fetchUsers() {
        const result = await fetch(
            this.urlBase +
                '/users?_attributes=hexUuid%2Cfirstname%2Cgroups%2Clastname%2CauxInfo%2CemailAddress%2Cuser',
            this.fetchOptions,
        );

        const users = (await result.json()) as Pick<
            T.IDM.Data,
            | 'auxInfo'
            | 'emailAddress'
            | 'firstname'
            | 'groups'
            | 'hexUuid'
            | 'user'
            | 'lastname'
        >[];

        for (let {
            auxInfo,
            emailAddress,
            firstname,
            groups,
            hexUuid,
            lastname,
            user,
        } of users) {
            if (firstname === null || firstname === 'null') {
                firstname = '';
            }

            if (lastname === null || lastname === 'null') {
                lastname = '';
            }

            let userData: T.IDM.UserData = {
                class: auxInfo,
                email: emailAddress,
                firstname,
                lastname,
                user,
                uuid: hexUuid,
            };

            groups.forEach(({ uuid }) => {
                if (!this.groupCache[uuid]) return;

                if (this.groupCache[uuid] === 'lul-hems') {
                    this.teacherCache[
                        `${firstname}${
                            firstname === '' || lastname === '' ? '' : ' '
                        }${lastname}`
                    ] = userData;
                }

                if (this.groupCache[uuid] === 'sus-hems') {
                    this.studentCache[
                        `${firstname}${
                            firstname === '' || lastname === '' ? '' : ' '
                        }${lastname}`
                    ] = userData;
                }
            });
        }
    }
}
