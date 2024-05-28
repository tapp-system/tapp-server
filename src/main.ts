import { config } from 'dotenv';

import { IDMCache } from './Database';
import { App, Server } from './Server';

export default async () => {
    try {
        config();
        await IDMCache.init();
        await App.setup();
        Server.listen(80, () => console.log('Server now online!'));
    } catch (error) {
        console.error('FATAL Error');
        console.error(error);

        process.exit(1);
    }
};
