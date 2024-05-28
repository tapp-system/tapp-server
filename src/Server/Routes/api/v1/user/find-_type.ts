import Joi from 'joi';

import type { T } from 'ts';

export default {
    handler: async (req, res) => {
        const valid = req.validate(
            Joi.object({
                params: {
                    type: Joi.string()
                        .required()
                        .allow(...['student', 'teacher']),
                },
                query: {
                    name: Joi.string().required(),
                },
            }),
        );
        if (!valid) return;

        let users;
        switch (req.params.type) {
            case 'student':
                users = req.IDMCache.findStudent(req.query.name);
                break;
            case 'teacher':
                users = req.IDMCache.findTeacher(req.query.name);
                break;
            default:
                break;
        }

        res.respond(200, users ?? null, {
            code: 'S007',
            message: ('Alle Benutzer beginnend mit: ' +
                req.query.name +
                ' erhalten.') as T.Sentence<'.'>,
        });
    },
    methods: new Set(['get']),
} as T.Route<
    false,
    {},
    {
        type: 'student' | 'teacher';
    },
    {
        name: string;
    }
>;
