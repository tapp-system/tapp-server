import Joi from 'joi';

import type { T } from 'ts';

export default (async function (objectSchema) {
    let bool = true;
    try {
        const { error } = objectSchema
            .options({
                allowUnknown: true,
            })
            .validate({
                body: this.body,
                params: this.params,
                query: this.query,
            });

        if (error) throw error;
    } catch (err) {
        if (!(err instanceof Joi.ValidationError)) {
            throw err;
        }

        let path = err.details[0]?.path[0];
        let code: `C00${2 | 3 | 4}` =
            path === 'body' ? 'C002' : path === 'params' ? 'C003' : 'C004';

        this.res?.respond(400, null, {
            code,
            message: err.details[0]?.message as T.Sentence<'.' | '!'>,
            error: true,
        });

        bool = false;
    } finally {
        return bool;
    }
} as T.ValidateFunction);
