import type { T } from 'ts';

import { loggedIn } from '../../../../Middleware';

export default {
    handler: async () => {},
    methods: new Set([]),
    routeMiddleware: [loggedIn],
} as T.Route<true>;
