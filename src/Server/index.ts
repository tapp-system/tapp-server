import { createServer } from 'node:http';

import App from './App';
import ws from './Websocket';

const Server = createServer(App);

ws.attach(Server);

export { App, Server };
