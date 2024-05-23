import Express, { application } from 'express';

import setup from './setup';

application.setup = setup;

const App = Express();

export default App;
