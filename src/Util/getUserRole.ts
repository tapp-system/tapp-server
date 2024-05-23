import type { T } from 'ts';

export default (groups: T.OpenIDClientTokenClaims['groups']) => {
    let role: T.TAPP.UserRole | null = null;

    for (let [, { act }] of Object.entries(groups)) {
        let name = act.toLowerCase();

        if (name === 'admin' || name === 'tapp-admin') return 'ADMIN';
        else if (name === 'tapp-supervisor') role = 'SUPERVISOR';
        else if (name === 'lul-hems' && !role) role = 'LEHRKRAFT';
    }

    return role;
};
