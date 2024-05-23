import { createServer } from 'node:http';

import App from './App';

const Server = createServer(App);

export { App, Server };
