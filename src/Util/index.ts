import getUserRole from './getUserRole';
import handler from './handler';
import noop from './noop';
import OpenIDClient from './OpenIDClient';

import {
    openIdClientOptions,
    openIdIssuerOptions,
    openIdScopes,
} from '../Config';

const openIDClient = new OpenIDClient(
    openIdIssuerOptions,
    openIdClientOptions,
    openIdScopes,
);

export { getUserRole, handler, noop, openIDClient };
