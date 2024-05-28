import type { T } from 'ts';

export default {
    handler: async (_req, res) => {
        res.respond(
            200,
            {
                v1: {
                    description:
                        'Version 1 der API umfasst beim aktuellen Stand den Umgang mit tapp-recordern, der Verwendung von Protokollen und der Authentifizierung über IServ',
                },
            },
            {
                code: 'S018',
                message: 'Informationen über API-Versionen erhalten.',
            },
        );
    },
    methods: new Set(['get']),
} as T.Route;
