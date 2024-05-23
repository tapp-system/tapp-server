import type { Express } from 'express';

type SetupFunction = (this: Express) => Promise<void>;

export default SetupFunction;
