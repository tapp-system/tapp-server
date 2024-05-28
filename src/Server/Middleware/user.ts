import type { T } from 'ts';

export default (async (req, _res, next) => {
    try {
        // TODO IP
        const ip = '::1';
        const id = req.session.uid ?? null;

        const mac = (req.header('x-macaddress') as T.MACAddress) ?? null;
        const apiKey = (req.header('x-apikey') as string) ?? null;

        req.user = {
            apiKey,
            id,
            ip,
            mac,
        };

        next();
    } catch (error) {
        next(error);
    }
}) as T.RequestHandler;
