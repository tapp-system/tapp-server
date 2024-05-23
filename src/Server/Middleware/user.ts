import type { T } from 'ts';

export default (async (req, _res, next) => {
    try {
        // TODO IP
        const ip = '::1';

        const mac = (req.header('x-macaddress') as T.MACAddress) ?? null;
        const apiKey = (req.header('x-api-key') as string) ?? null;

        req.user = {
            apiKey,
            mac,
            ip,
        };

        next();
    } catch (error) {
        next(error);
    }
}) as T.RequestHandler;
