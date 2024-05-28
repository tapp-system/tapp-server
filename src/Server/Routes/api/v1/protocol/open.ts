import Joi from 'joi';
import { nanoid } from 'nanoid';

import type { T } from 'ts';

export default {
    handler: async (req, res) => {
        const valid = req.validate(
            Joi.object({
                body: {
                    examinant: Joi.string().required().uuid({
                        separator: '-',
                        version: 'uuidv4',
                    }),
                    examinee: Joi.string().required().uuid({
                        separator: '-',
                        version: 'uuidv4',
                    }),
                    chairman: Joi.string().required().uuid({
                        separator: '-',
                        version: 'uuidv4',
                    }),
                    subject: Joi.string().required(),
                    type: Joi.string()
                        .required()
                        .allow(
                            'MÜNDLICHE PRÜFUNG',
                            'MÜNDLICHE NACHPRÜFUNG',
                            'BESONDERE LERNLEISTUNG',
                            'PRÄSENTATIONSPRÜFUNG',
                        ),
                    years: Joi.array()
                        .required()
                        .length(2)
                        .items(
                            Joi.string()
                                .required()
                                .regex(/^Q[1234]$/),
                        ),
                    transcriber: Joi.string()
                        .required()
                        .regex(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/),
                    room: Joi.string()
                        .required()
                        .min(5)
                        .max(6)
                        .regex(/^[ABC]\-?[012].[0-9]{2}$/),
                },
            }),
        );
        if (!valid) return;

        const {
            chairman,
            examinant,
            examinee,
            room,
            subject,
            transcriber,
            type,
            years,
        } = req.body;

        // TODO -> Proper param validation

        const result = await req.pool.fetch(
            'INSERT INTO tapp_protocol (pid, recorder, examinant, chairman, examinee, subject, type, begin, years, room, transcriber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING pid;',
            [
                nanoid(16),
                req.session.uid,
                examinant,
                chairman,
                examinee,
                subject,
                type,
                new Date(),
                years,
                room,
                transcriber,
            ],
        );

        res.respond(201, result.rows[0] ?? {}, {
            code: 'S016',
            message: 'Neues Protokoll erstellt.',
        });
    },
    methods: new Set(['post']),
} as T.Route<
    false,
    {
        chairman: T.TAPP.Protocol['chairman'];
        examinant: T.TAPP.Protocol['examinant'];
        examinee: T.TAPP.Protocol['examinee'];
        room: T.TAPP.Protocol['room'];
        subject: T.TAPP.Protocol['subject'];
        transcriber: T.TAPP.Protocol['transcriber'];
        type: T.TAPP.Protocol['type'];
        years: T.TAPP.Protocol['years'];
    }
>;
