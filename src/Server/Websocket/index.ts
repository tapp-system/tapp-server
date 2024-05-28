import { Server } from 'socket.io';

import type { T } from 'ts';

import { websocketOptions } from '../../Config';
import { pool } from '../../Database';

const ws = new Server<
    {
        // TODO Listener events
    },
    {
        pRead: (args: { entries: Omit<T.TAPP.Entry, 'protocol'>[] }) => void;
    }
>(websocketOptions);

ws.on('connection', (socket) => {
    const pid = socket.handshake.query['pid'];

    const readInterval = setInterval(async () => {
        const result = await pool.fetch<Omit<T.TAPP.Entry, 'protocol'>>(
            'SELECT eid, text, begin, end, edited FROM tapp_entry WHERE protocol = $1',
            [pid],
        );

        socket.emit('pRead', { entries: result.rows });
    }, 100);

    // TODO Implement tapp_entry editing

    socket.on('disconnect', () => {
        clearInterval(readInterval);
    });
});

export default ws;
