import { config } from 'dotenv';

import { App, Server } from './Server';

export default async () => {
    try {
        config();
        await App.setup();
        Server.listen(80, () => console.log('Server now online!'));
    } catch (error) {
        console.error('FATAL Error');
        console.error(error);

        process.exit(1);
    }
};
