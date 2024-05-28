import type { T } from 'ts';

export default (async function (error, code) {
    try {
        this.respond(500, null, {
            code,
            message: 'An error occured!',
        });

        throw error;
    } catch (err) {
        throw err;
    } finally {
        return this;
    }
} as T.ErrorFunction);
